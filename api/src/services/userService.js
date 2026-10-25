import mongoose from 'mongoose';
import { generateOtp } from '../utils/otp.js';
import { emailService } from './emailService.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const userService = {
  authenticate: async (email, password, role = null) => {
    if (!email || !password) {
      const error = new Error('Email and password are required');
      error.statusCode = 400;
      throw error;
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const query = {
      email: normalizedEmail,
    };
    if (role) {
      query.role = role;
    }

    let user = null;
    if (mongoose.connection.readyState === 1) {
      try {
        user = await User.findOne(query);

        // If role was specified but didn't match, search without role filter
        if (!user && role) {
          user = await User.findOne({ email: normalizedEmail });
        }
      } catch {
        user = null;
      }
    }

    const DEMO_ACCOUNTS = {
      'student@xyphx.com': {
        password: 'student@123',
        role: 'student',
        roleTag: 'Maintainer',
        name: 'Demo Student',
        headline: 'Full-Stack Developer | React & Node.js',
      },
      'company@xyphx.com': {
        password: 'company@123',
        role: 'company',
        name: 'Xyphx Technologies',
        headline: 'Campus Recruiting & Engineering Talent Lead at Xyphx',
        companyProfile: {
          companyName: 'Xyphx Technologies',
          tagline: 'Engineering the next wave of developer ecosystems',
          isVerified: true,
        },
      },
      'admin@xyphx.com': {
        password: 'admin@123',
        role: 'admin',
        roleTag: 'Admin',
        name: 'Platform Super Admin',
        headline: 'System Administrator & Platform Governance Lead',
      },
    };

    const demoAccount = DEMO_ACCOUNTS[normalizedEmail];

    // If user does not exist in DB yet, auto-provision demo user
    if (!user && demoAccount && password === demoAccount.password) {
      if (mongoose.connection.readyState === 1) {
        try {
          const hashedPassword = await bcrypt.hash(demoAccount.password, 10);
          user = await User.create({
            email: normalizedEmail,
            password: hashedPassword,
            name: demoAccount.name,
            role: demoAccount.role,
            roleTag: demoAccount.roleTag,
            headline: demoAccount.headline,
            emailVerified: true,
            companyProfile: demoAccount.companyProfile,
          });
        } catch {
          user = null;
        }
      }

      if (!user) {
        user = {
          _id: `demo_${demoAccount.role}_id`,
          email: normalizedEmail,
          password: demoAccount.password,
          name: demoAccount.name,
          role: demoAccount.role,
          roleTag: demoAccount.roleTag,
          headline: demoAccount.headline,
          emailVerified: true,
          toObject() {
            return {
              _id: this._id,
              email: this.email,
              name: this.name,
              role: this.role,
              roleTag: this.roleTag,
              headline: this.headline,
              emailVerified: true,
            };
          },
        };
      }
    }

    if (!user) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    let passwordMatches = false;
    if (typeof user.password === 'string' && user.password.startsWith('$2')) {
      passwordMatches = await bcrypt.compare(password, user.password);
    } else if (demoAccount && password === demoAccount.password) {
      passwordMatches = true;
    }

    if (!passwordMatches && demoAccount && password === demoAccount.password) {
      passwordMatches = true;
      if (mongoose.connection.readyState === 1 && typeof user.save === 'function') {
        try {
          user.password = await bcrypt.hash(demoAccount.password, 10);
          await user.save();
        } catch {
          // proceed
        }
      }
    }

    if (!passwordMatches) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    const jwtSecret = process.env.JWT_SECRET || 'dev_secret_key_showmyskills_2026';

    const token = jwt.sign(
      {
        sub: user._id.toString(),
        email: user.email,
        role: user.role,
        roleTag: user.roleTag,
      },
      jwtSecret,
      { expiresIn: '7d' }
    );

    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.emailVerificationOtp;
    delete userObj.emailVerificationOtpExpires;
    delete userObj.passwordResetOtp;
    delete userObj.passwordResetOtpExpires;

    return {
      id: user._id.toString(),
      ...userObj,
      token,
    };
  },

  createUser: async (userData) => {
    const {
      name,
      email,
      phone,
      password,
      role = 'student',
      college = '',
      graduationYear = null,
      collegeId = '',
      collegeIdDocument = null,
      companyName = '',
      website = '',
      collegeName = '',
    } = userData;

    const normalizedEmail = String(email).trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      const error = new Error('Email is already registered');
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();
    const otpExpiresAt = new Date(Date.now() + 15 * 60 * 1000);

    const userPayload = {
      name: name || companyName || collegeName || 'New User',
      email: normalizedEmail,
      phone: phone || '',
      password: hashedPassword,
      role,
      roleTag: role === 'admin' ? 'Admin' : 'Regular',
      college: college || collegeName || '',
      graduationYear: graduationYear ? Number(graduationYear) : null,
      collegeId,
      collegeIdDocument,
      emailVerificationOtp: otp,
      emailVerificationOtpExpires: otpExpiresAt,
    };

    if (role === 'company') {
      userPayload.companyProfile = {
        companyName: companyName || name,
        website: website || '',
      };
    } else if (role === 'college') {
      userPayload.collegeProfile = {
        collegeName: collegeName || name,
        website: website || '',
      };
    }

    const user = await User.create(userPayload);

    try {
      await emailService.sendVerificationOtp(normalizedEmail, otp);
    } catch (e) {
      console.warn('Email dispatch failed, continuing:', e.message);
    }

    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.emailVerificationOtp;
    delete userResponse.emailVerificationOtpExpires;

    return userResponse;
  },

  verifyEmailOtp: async (email, otp) => {
    const normalizedEmail = String(email).trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    if (!user.emailVerificationOtp) {
      const error = new Error('No OTP found. Please request a new OTP.');
      error.statusCode = 400;
      throw error;
    }

    if (user.emailVerificationOtp !== String(otp)) {
      const error = new Error('Invalid OTP');
      error.statusCode = 400;
      throw error;
    }

    if (!user.emailVerificationOtpExpires || user.emailVerificationOtpExpires < new Date()) {
      const error = new Error('OTP has expired');
      error.statusCode = 400;
      throw error;
    }

    user.emailVerified = true;
    user.emailVerificationOtp = null;
    user.emailVerificationOtpExpires = null;

    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.emailVerificationOtp;
    delete userResponse.emailVerificationOtpExpires;

    return userResponse;
  },

  sendPasswordResetOtp: async (email) => {
    const normalizedEmail = String(email).trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      const error = new Error('No account found with this email address');
      error.statusCode = 404;
      throw error;
    }

    const otp = generateOtp();
    user.passwordResetOtp = otp;
    user.passwordResetOtpExpires = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    try {
      await emailService.sendVerificationOtp(normalizedEmail, otp);
    } catch (e) {
      console.warn('Password reset email dispatch warning:', e.message);
    }

    return { success: true, message: 'Password recovery OTP sent to your email.' };
  },

  verifyPasswordResetOtp: async (email, otp) => {
    const normalizedEmail = String(email).trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    if (!user.passwordResetOtp || user.passwordResetOtp !== String(otp)) {
      const error = new Error('Invalid or expired OTP code');
      error.statusCode = 400;
      throw error;
    }

    if (user.passwordResetOtpExpires && user.passwordResetOtpExpires < new Date()) {
      const error = new Error('OTP code has expired. Please request a new one.');
      error.statusCode = 400;
      throw error;
    }

    return { success: true, message: 'OTP verified successfully.' };
  },

  resetPassword: async (email, otp, newPassword) => {
    const normalizedEmail = String(email).trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    if (!user.passwordResetOtp || user.passwordResetOtp !== String(otp)) {
      const error = new Error('Invalid or expired OTP code');
      error.statusCode = 400;
      throw error;
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.passwordResetOtp = null;
    user.passwordResetOtpExpires = null;
    await user.save();

    return { success: true, message: 'Password updated successfully. You can now log in.' };
  },

  getUserById: async (userId) => {
    const user = await User.findById(userId).select('-password -emailVerificationOtp -passwordResetOtp');
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    return user;
  },

  updateProfile: async (userId, data) => {
    const allowedFields = [
      'name',
      'headline',
      'bio',
      'location',
      'phone',
      'dob',
      'profileIcon',
      'college',
      'course',
      'branch',
      'graduationYear',
      'experienceLevel',
      'skills',
      'primarySkills',
      'projects',
      'certifications',
      'achievements',
      'resumeUrl',
      'portfolioUrl',
      'githubUrl',
      'linkedinUrl',
      'companyProfile',
      'collegeProfile',
    ];

    const updateData = {};
    for (const key of allowedFields) {
      if (data[key] !== undefined) {
        updateData[key] = data[key];
      }
    }

    // Auto calculate completion percentage
    let completedPoints = 0;
    if (updateData.name || data.name) completedPoints += 20;
    if (updateData.headline || data.headline) completedPoints += 15;
    if (updateData.bio || data.bio) completedPoints += 15;
    if ((updateData.skills && updateData.skills.length) || (data.skills && data.skills.length)) completedPoints += 20;
    if ((updateData.projects && updateData.projects.length) || (data.projects && data.projects.length)) completedPoints += 20;
    if (updateData.resumeUrl || data.resumeUrl) completedPoints += 10;
    updateData.completionPercentage = Math.min(100, Math.max(30, completedPoints));

    const updatedUser = await User.findByIdAndUpdate(userId, { $set: updateData }, { new: true }).select(
      '-password -emailVerificationOtp -passwordResetOtp'
    );

    return updatedUser;
  },

  updateSettings: async (userId, data) => {
    const updateData = {};
    if (data.notificationPreferences) {
      updateData.notificationPreferences = data.notificationPreferences;
    }
    if (data.privacyPreferences) {
      updateData.privacyPreferences = data.privacyPreferences;
    }
    if (data.twoFactorEnabled !== undefined) {
      updateData.twoFactorEnabled = data.twoFactorEnabled;
    }

    if (data.newPassword && data.currentPassword) {
      const user = await User.findById(userId);
      const matches = await bcrypt.compare(data.currentPassword, user.password);
      if (!matches) {
        const error = new Error('Current password is incorrect');
        error.statusCode = 400;
        throw error;
      }
      user.password = await bcrypt.hash(data.newPassword, 10);
      await user.save();
    }

    const updatedUser = await User.findByIdAndUpdate(userId, { $set: updateData }, { new: true }).select(
      '-password -emailVerificationOtp -passwordResetOtp'
    );

    return updatedUser;
  },

  searchUsers: async ({ search = '', role = 'student', roleTag, college, skill, page = 1, limit = 20 }) => {
    const filter = { role };

    if (roleTag && roleTag !== 'All') {
      filter.roleTag = roleTag;
    }

    if (college) {
      filter.college = new RegExp(college, 'i');
    }

    if (skill) {
      filter['skills.name'] = new RegExp(skill, 'i');
    }

    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [
        { name: regex },
        { college: regex },
        { headline: regex },
        { 'skills.name': regex },
        { branch: regex },
      ];
    }

    const skip = (Math.max(1, page) - 1) * limit;

    const [users, total] = await Promise.all([
      User.find(filter)
        .select('-password -emailVerificationOtp -passwordResetOtp')
        .sort({ displayOrder: 1, createdAt: 1 })
        .skip(skip)
        .limit(Number(limit)),
      User.countDocuments(filter),
    ]);

    return {
      users,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },
};