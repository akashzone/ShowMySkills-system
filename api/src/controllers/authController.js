import { userService } from '../services/userService.js';

export const authController = {
  login: async (req, res, next) => {
    try {
      const { email, password, role } = req.body;
      const user = await userService.authenticate(email, password, role);
      res.json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  },

  register: async (req, res, next) => {
    try {
      const newUser = await userService.createUser({
        ...req.body,
        collegeIdDocument: req.file ? req.file.path : null,
      });
      res.status(201).json({ success: true, data: newUser });
    } catch (error) {
      next(error);
    }
  },

  verifyEmail: async (req, res, next) => {
    try {
      const { email, otp } = req.body;
      const user = await userService.verifyEmailOtp(email, otp);
      res.json({
        success: true,
        message: 'Email verified successfully',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },

  forgotPassword: async (req, res, next) => {
    try {
      const { email } = req.body;
      const result = await userService.sendPasswordResetOtp(email);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  },

  verifyResetOtp: async (req, res, next) => {
    try {
      const { email, otp } = req.body;
      const result = await userService.verifyPasswordResetOtp(email, otp);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  },

  resetPassword: async (req, res, next) => {
    try {
      const { email, otp, newPassword } = req.body;
      const result = await userService.resetPassword(email, otp, newPassword);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  },

  getMe: async (req, res, next) => {
    try {
      const user = await userService.getUserById(req.user.id);
      res.json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  },
};
