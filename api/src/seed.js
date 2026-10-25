import dotenv from 'dotenv';
import path from 'node:path';
import fs from 'node:fs';

const envCandidates = [
  path.resolve(process.cwd(), '.env'),
  path.resolve(process.cwd(), '../.env'),
];
for (const envPath of envCandidates) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
  }
}

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import User from './models/User.js';
import Internship from './models/Internship.js';
import Application from './models/Application.js';
import LaunchpadItem from './models/LaunchpadItem.js';
import Conversation from './models/Conversation.js';
import Message from './models/Message.js';
import VerificationRequest from './models/VerificationRequest.js';
import Notification from './models/Notification.js';
import SkillAssessment from './models/SkillAssessment.js';
import SkillSubmission from './models/SkillSubmission.js';
import Bookmark from './models/Bookmark.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/showmyskills';

export const seedDatabase = async () => {
  try {
    console.log(`Connecting to MongoDB for seeding: ${MONGODB_URI}`);
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB. Starting database seed...');

    // Clear existing collections
    await Promise.all([
      User.deleteMany({}),
      Internship.deleteMany({}),
      Application.deleteMany({}),
      LaunchpadItem.deleteMany({}),
      Conversation.deleteMany({}),
      Message.deleteMany({}),
      VerificationRequest.deleteMany({}),
      Notification.deleteMany({}),
      SkillAssessment.deleteMany({}),
      SkillSubmission.deleteMany({}),
      Bookmark.deleteMany({}),
    ]);

    const defaultHashedPassword = await bcrypt.hash('Password@123', 10);

    // 1. Create Core Admin
    const adminUser = await User.create({
      name: 'Jordan Hayes',
      email: 'admin@showmyskills.com',
      phone: '+91 98480 00001',
      password: defaultHashedPassword,
      role: 'admin',
      roleTag: 'Admin',
      headline: 'Core Platform Administrator & Ecosystem Governance',
      emailVerified: true,
      college: 'CET Trivandrum',
    });

    // 2. Create Company Recruiter
    const companyUser = await User.create({
      name: 'WebShark Recruitment Team',
      email: 'recruitment@webshark.io',
      phone: '+91 80 4123 9870',
      password: defaultHashedPassword,
      role: 'company',
      headline: 'Early Careers Talent Acquisition at WebShark Web Services',
      emailVerified: true,
      companyProfile: {
        companyName: 'WebShark Web Services Pvt Ltd',
        tagline: 'Pioneering intelligent fintech & web architecture systems',
        aboutCompany: 'WebShark is an engineering-first organization building high-scale SaaS products and design systems.',
        establishedYear: 2021,
        industryType: 'Technology',
        companySize: '51-200',
        website: 'https://webshark.io',
        linkedin: 'https://linkedin.com/company/webshark',
        isVerified: true,
        awards: [
          { name: 'Top Emerging Tech Employer 2025', receivedYear: 2025, category: 'Workplace' },
          { name: 'ISO 27001 Certified Security Standards', receivedYear: 2024, category: 'Industry' },
        ],
      },
    });

    // 3. Create Star Student Candidates
    const joel = await User.create({
      name: 'Joel A. Jacob',
      email: 'joel.jacob@cet.ac.in',
      phone: '+91 98471 23456',
      password: defaultHashedPassword,
      role: 'student',
      roleTag: 'Maintainer',
      headline: 'Frontend Engineer | React 19 & Next.js Architecture',
      college: 'College of Engineering Trivandrum',
      course: 'B.Tech',
      branch: 'Computer Science (AI & Machine Learning)',
      graduationYear: 2026,
      location: 'Punalur, Kollam, Kerala, India',
      profileIcon: 'https://api.builder.io/api/v1/image/assets/TEMP/5a82e47de052e6b1e8a0daf000f4c7f2631701fe?width=180',
      reputationScore: 93,
      topPercentile: 'Top 5% in Frontend',
      completionPercentage: 95,
      emailVerified: true,
      collegeIdVerified: true,
      bio: 'Passionate frontend engineer focused on building intuitive, high-performance web and mobile applications with modern JavaScript frameworks.',
      primarySkills: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'App Development'],
      skills: [
        { name: 'React', level: 'expert', endorsedCount: 42 },
        { name: 'Next.js', level: 'expert', endorsedCount: 38 },
        { name: 'Tailwind CSS', level: 'expert', endorsedCount: 29 },
        { name: 'TypeScript', level: 'advanced', endorsedCount: 25 },
        { name: 'Communication', level: 'advanced', endorsedCount: 19 },
      ],
      projects: [
        {
          id: 'p1',
          title: 'CampusHub Mobile',
          description: 'Flutter & Firebase app for campus events and peer networking.',
          tags: ['Flutter', 'Firebase', 'Mobile'],
          verified: true,
        },
        {
          id: 'p2',
          title: 'ShowMySkills Web Client',
          description: 'High-performance student portfolio showcase system.',
          tags: ['React', 'Next.js', 'Tailwind CSS'],
          verified: true,
        },
      ],
      githubUrl: 'https://github.com/joel-jacob',
      linkedinUrl: 'https://linkedin.com/in/joel-jacob',
    });

    const sidharth = await User.create({
      name: 'S SIDHARTH',
      email: 'sidharth.s@cet.ac.in',
      phone: '+91 94470 65432',
      password: defaultHashedPassword,
      role: 'student',
      roleTag: 'Admin',
      headline: 'UI/UX Product Designer & Human-Centered Systems Engineer',
      college: 'College of Engineering Trivandrum',
      course: 'B.Tech',
      branch: 'Industrial Engineering',
      graduationYear: 2026,
      location: 'Trivandrum, Kerala',
      profileIcon: 'https://api.builder.io/api/v1/image/assets/TEMP/ab8e554398afb86403d2a7da0c420fe67c60f085?width=180',
      reputationScore: 96,
      topPercentile: 'Top 3% in Product Design',
      completionPercentage: 98,
      emailVerified: true,
      collegeIdVerified: true,
      bio: 'Product designer and engineer who blends human-centered design with computational engineering to build seamless digital experiences.',
      primarySkills: ['Figma', 'UI/UX Design', 'Design Systems', 'User Research'],
      skills: [
        { name: 'Figma', level: 'expert', endorsedCount: 54 },
        { name: 'Design Systems', level: 'expert', endorsedCount: 46 },
        { name: 'User Research', level: 'advanced', endorsedCount: 31 },
        { name: 'Prototyping', level: 'expert', endorsedCount: 39 },
      ],
      projects: [
        {
          id: 'p3',
          title: 'Fintech Analytics Dashboard System',
          description: 'Design system and atomic interface tokens for institutional banking portal.',
          tags: ['Figma', 'Design Systems', 'UI/UX'],
          verified: true,
        },
      ],
      portfolioUrl: 'https://behance.net/sidharth-design',
    });

    const reshma = await User.create({
      name: 'Reshma Udhayan',
      email: 'reshma.u@cet.ac.in',
      phone: '+91 98460 11223',
      password: defaultHashedPassword,
      role: 'student',
      roleTag: 'Promoter',
      headline: 'Operations & Community Builder | Industrial Engineering',
      college: 'College of Engineering Trivandrum',
      branch: 'Industrial Engineering',
      graduationYear: 2026,
      profileIcon: 'https://api.builder.io/api/v1/image/assets/TEMP/c3059191c12486377929540d913e78b03ba9bddc?width=180',
      reputationScore: 88,
      emailVerified: true,
      collegeIdVerified: true,
    });

    const vaishnav = await User.create({
      name: 'Vaishnav RL',
      email: 'vaishnav.rl@cet.ac.in',
      phone: '+91 94960 99887',
      password: defaultHashedPassword,
      role: 'student',
      roleTag: 'Ambassador',
      headline: 'Campus Tech Ambassador & Full Stack Explorer',
      college: 'College of Engineering Trivandrum',
      branch: 'Industrial Engineering',
      graduationYear: 2026,
      profileIcon: 'https://api.builder.io/api/v1/image/assets/TEMP/46fce00ed55aca498d8347d953abdc65e3ba2655?width=180',
      reputationScore: 84,
      emailVerified: true,
    });

    const abhay = await User.create({
      name: 'Abhay SA',
      email: 'abhay.sa@cet.ac.in',
      phone: '+91 95670 44332',
      password: defaultHashedPassword,
      role: 'student',
      roleTag: 'Contributor',
      headline: 'Open Source Contributor & Backend Enthusiast',
      college: 'College of Engineering Trivandrum',
      branch: 'Industrial Engineering',
      graduationYear: 2026,
      profileIcon: 'https://api.builder.io/api/v1/image/assets/TEMP/f7559f012fcf86117c87ef912259ea3d4b2467c5?width=180',
      reputationScore: 81,
      emailVerified: true,
    });

    const ananya = await User.create({
      name: 'Ananya Sharma',
      email: 'ananya.sharma@iitm.ac.in',
      phone: '+91 98450 77665',
      password: defaultHashedPassword,
      role: 'student',
      roleTag: 'Contributor',
      headline: 'Machine Learning Research Intern & Data Scientist',
      college: 'Indian Institute of Technology Madras',
      branch: 'Data Science & AI',
      graduationYear: 2026,
      profileIcon: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=180&auto=format&fit=crop&q=80',
      reputationScore: 92,
      emailVerified: true,
      collegeIdVerified: true,
      skills: [
        { name: 'Python', level: 'expert', endorsedCount: 45 },
        { name: 'PyTorch', level: 'advanced', endorsedCount: 32 },
        { name: 'TensorFlow', level: 'advanced', endorsedCount: 28 },
      ],
    });

    // 4. Create Active Internships
    const int1 = await Internship.create({
      company: 'WebShark Web Services',
      companyLogoText: 'WEBSHARK',
      companyLogoSubText: 'WEB SERVICES',
      role: 'UI/UX Design Intern',
      location: 'Bangalore, India',
      mode: 'hybrid',
      stipendMin: 15000,
      stipendMax: 20000,
      stipendText: '₹15,000 - ₹20,000 / mo',
      duration: '6 Months',
      skills: ['Figma', 'UI/UX', 'User Research', 'Wireframing', 'Prototyping'],
      responsibilities: [
        'Lead user research and synthesize client problem statements',
        'Build high-fidelity Figma components adhering to atomic design systems',
        'Collaborate with React engineers to ensure design implementation fidelity',
      ],
      employmentType: 'Full time',
      isVerified: true,
      isFeatured: true,
      status: 'active',
      applicationUrl: 'https://webshark.io/careers/ui-ux',
      postedBy: companyUser._id,
      applicantsCount: 42,
      description: 'Design intuitive interfaces and create responsive mobile prototypes for high-scale enterprise clients.',
    });

    const int2 = await Internship.create({
      company: 'TechNova Solutions',
      companyLogoText: 'TECHNOVA',
      companyLogoSubText: 'SOLUTIONS',
      role: 'Frontend Developer Intern',
      location: 'Remote',
      mode: 'remote',
      stipendMin: 20000,
      stipendMax: 25000,
      stipendText: '₹20,000 - ₹25,000 / mo',
      duration: '3 Months',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Git'],
      responsibilities: [
        'Build responsive Next.js App Router client components',
        'Optimize Web Vitals and client bundle performance',
      ],
      employmentType: 'Full time',
      isVerified: true,
      isFeatured: true,
      status: 'active',
      applicationUrl: 'https://technova.io/careers/frontend',
      applicantsCount: 89,
      description: 'Collaborate with full stack engineers to develop modern interactive user experiences.',
    });

    const int3 = await Internship.create({
      company: 'CloudPeak Analytics',
      companyLogoText: 'CLOUDPEAK',
      companyLogoSubText: 'ANALYTICS',
      role: 'Data Science Intern',
      location: 'Hyderabad, India',
      mode: 'onsite',
      stipendMin: 18000,
      stipendMax: 22000,
      stipendText: '₹18,000 - ₹22,000 / mo',
      duration: '4 Months',
      skills: ['Python', 'Pandas', 'TensorFlow', 'SQL', 'Tableau'],
      employmentType: 'Full time',
      isVerified: false,
      status: 'pending_review',
      applicationUrl: 'https://cloudpeak.com/internships/ds',
      applicantsCount: 16,
      description: 'Analyze large-scale tabular datasets, build classification models, and report statistical insights.',
    });

    const int4 = await Internship.create({
      company: 'FinEdge Technologies',
      companyLogoText: 'FINEDGE',
      companyLogoSubText: 'TECHNOLOGIES',
      role: 'Backend Engineering Intern',
      location: 'Mumbai, India',
      mode: 'hybrid',
      stipendMin: 25000,
      stipendMax: 30000,
      stipendText: '₹25,000 - ₹30,000 / mo',
      duration: '6 Months',
      skills: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker'],
      employmentType: 'Full time',
      isVerified: true,
      status: 'active',
      applicationUrl: 'https://finedge.tech/careers/backend',
      applicantsCount: 53,
      description: 'Design robust microservices, optimize database queries, and secure distributed endpoints.',
    });

    // 5. Create Launchpad Opportunities
    await LaunchpadItem.create([
      {
        position: 'VCA Consulting & Analytics Intern',
        company: 'Visa Inc.',
        oneLiner: 'Formulate strategic payment analytics & data-driven advisory for global banking clients.',
        location: 'Bengaluru / Mumbai, India (Hybrid)',
        stipend: '₹75,000 - ₹90,000 / mo',
        duration: '6 Months · Batch 2025/2026',
        clicks: '1.8k clicks',
        clickCount: 1800,
        logoType: 'visa',
        applyUrl: 'https://visa.wd5.myworkdayjobs.com/en-US/Visa_Early_Careers/job/VCA-Intern--IDS-_REF086121W',
        skills: ['Data Analytics', 'SQL', 'Python'],
        allSkills: ['Data Analytics', 'SQL', 'Python', 'Client Advisory', 'Financial Modeling', 'Tableau'],
        about: 'Visa Consulting & Analytics (VCA) is the strategic consulting arm of Visa. We leverage Visa rich dataset to solve business challenges.',
        perks: 'Pre-Placement Offer (PPO) opportunity, transit allowance, and comprehensive healthcare coverage.',
        batchYear: '2025/2026',
        isVerified: true,
        featured: true,
      },
      {
        position: 'Software Engineering Intern 2025',
        company: 'Atlassian',
        oneLiner: 'Build high-throughput microservices and collaborative UI primitives powering Jira & Confluence.',
        location: 'Bengaluru, India (Remote Eligible)',
        stipend: '₹1,30,000 / mo',
        duration: 'Summer 2025 · 10-12 Weeks',
        clicks: '2.4k clicks',
        clickCount: 2400,
        logoType: 'atlassian',
        applyUrl: 'https://www.atlassian.com/company/careers/details/26273',
        skills: ['Java / Kotlin', 'React', 'TypeScript'],
        allSkills: ['Java / Kotlin', 'React', 'TypeScript', 'Distributed Systems', 'AWS', 'Microservices'],
        about: 'Atlassian unleashes the potential of every team with products like Jira, Confluence, and Bitbucket.',
        perks: 'Top-tier stipend, home office stipend, wellness budget, and direct mentorship from Principal Engineers.',
        batchYear: '2025/2026',
        isVerified: true,
        featured: true,
      },
    ]);

    // 6. Create ATS Candidate Applications
    await Application.create([
      {
        internship: int1._id,
        student: joel._id,
        company: companyUser._id,
        roleTitle: 'UI/UX Design Intern',
        companyName: 'WebShark Web Services',
        status: 'shortlisted',
        candidateSnapshot: {
          name: joel.name,
          email: joel.email,
          phone: joel.phone,
          college: joel.college,
          department: joel.branch,
          score: joel.reputationScore,
          avatar: joel.profileIcon,
          skills: ['React', 'Next.js', 'Tailwind CSS', 'Figma'],
          portfolioUrl: joel.githubUrl,
        },
        notes: 'Demonstrated strong mastery in UI architecture and React component design.',
      },
      {
        internship: int1._id,
        student: sidharth._id,
        company: companyUser._id,
        roleTitle: 'UI/UX Design Intern',
        companyName: 'WebShark Web Services',
        status: 'interview_scheduled',
        candidateSnapshot: {
          name: sidharth.name,
          email: sidharth.email,
          phone: sidharth.phone,
          college: sidharth.college,
          department: sidharth.branch,
          score: sidharth.reputationScore,
          avatar: sidharth.profileIcon,
          skills: ['Figma', 'Design Systems', 'User Research'],
          portfolioUrl: sidharth.portfolioUrl,
        },
        notes: 'Portfolio includes enterprise design system and mobile prototypes.',
        interviewDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      },
    ]);

    // 7. Create Verification Requests
    await VerificationRequest.create([
      {
        user: joel._id,
        role: 'student',
        type: 'College ID Document',
        institution: 'College of Engineering Trivandrum',
        department: 'Computer Science (AI & ML)',
        docName: 'CET_College_ID_Card_2026.pdf',
        docUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
        notes: 'Batch 2026 undergraduate seeking official verified badge for campus placements.',
        status: 'approved',
        reviewedBy: adminUser._id,
        reviewedAt: new Date(),
      },
      {
        user: ananya._id,
        role: 'student',
        type: 'Skill Assessment Proof',
        institution: 'IIT Madras',
        department: 'Data Science & AI',
        docName: 'TensorFlow_Developer_Certificate.pdf',
        docUrl: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600&auto=format&fit=crop&q=80',
        notes: 'Submitted score 96% in Advanced Machine Learning assessment.',
        status: 'pending',
      },
    ]);

    // 8. Create Chat Conversations
    const conv = await Conversation.create({
      participants: [joel._id, companyUser._id],
      lastMessage: 'Hi Joel! We reviewed your frontend portfolio and would love to schedule a technical chat.',
      lastMessageAt: new Date(),
      lastSender: companyUser._id,
    });

    await Message.create([
      {
        conversationId: conv._id,
        sender: companyUser._id,
        receiver: joel._id,
        text: 'Hi Joel! We reviewed your frontend portfolio and would love to schedule a technical chat.',
        status: 'delivered',
      },
    ]);

    // 9. Create Notifications
    await Notification.create([
      {
        user: joel._id,
        title: 'Application Shortlisted',
        desc: 'WebShark Web Services shortlisted your application for UI/UX Design Intern.',
        unread: true,
        type: 'application',
      },
      {
        user: joel._id,
        title: 'Skill Verified',
        desc: 'React & Next.js Architecture skill assessment passed with score 93%.',
        unread: false,
        type: 'verification',
      },
    ]);

    // 10. Create Technical Skill Benchmark Assessments
    const reactAssessment = await SkillAssessment.create({
      title: 'React & Next.js Architecture',
      category: 'Frontend',
      description: 'Comprehensive evaluation of React 19 primitives, Server Components, and Next.js App Router performance patterns.',
      durationMinutes: 25,
      passingScore: 75,
      reputationPoints: 15,
      badgeName: 'React Certified Specialist',
      totalTaken: 342,
      averageScore: 84,
      questions: [
        {
          question: 'What is the key benefit of React Server Components (RSC)?',
          options: [
            'Zero client bundle impact for server dependencies',
            'Full DOM access on the backend',
            'Synchronous client-side renders',
            'Replaces all client-side state management completely',
          ],
          correctIndex: 0,
          explanation: 'RSC execute strictly on the server and transmit minimal JSON-stream representations, keeping heavy libraries out of the client JS bundle.',
          difficulty: 'intermediate',
        },
        {
          question: 'In Next.js App Router, which file defines the root UI wrapper shared across sub-routes?',
          options: ['template.jsx', 'layout.jsx', 'page.jsx', 'loading.jsx'],
          correctIndex: 1,
          explanation: 'layout.jsx preserves state and remains mounted across route segment transitions.',
          difficulty: 'beginner',
        },
        {
          question: 'Which React hook should be preferred to defer non-urgent state transitions and maintain UI responsiveness?',
          options: ['useMemo', 'useTransition', 'useImperativeHandle', 'useLayoutEffect'],
          correctIndex: 1,
          explanation: 'useTransition marks state updates as non-blocking transitions.',
          difficulty: 'advanced',
        },
      ],
    });

    await SkillAssessment.create({
      title: 'Node.js & Express REST APIs',
      category: 'Backend',
      description: 'Design patterns, middleware security, rate limiting, and asynchronous stream handling in Node.js.',
      durationMinutes: 20,
      passingScore: 75,
      badgeName: 'Backend Systems Engineer',
      totalTaken: 289,
      averageScore: 79,
      questions: [
        {
          question: 'Which middleware is essential to protect Express applications against common web vulnerabilities via security headers?',
          options: ['cors', 'helmet', 'morgan', 'cookie-parser'],
          correctIndex: 1,
          explanation: 'Helmet sets security-centric HTTP response headers like CSP, HSTS, and X-Content-Type-Options.',
          difficulty: 'beginner',
        },
      ],
    });

    await SkillAssessment.create({
      title: 'UI/UX & Design Systems',
      category: 'UI/UX Design',
      description: 'Figma component hierarchies, atomic tokens, usability accessibility (WCAG), and responsive ergonomics.',
      durationMinutes: 20,
      passingScore: 75,
      badgeName: 'Product Design Architect',
      totalTaken: 215,
      averageScore: 88,
      questions: [
        {
          question: 'What is the primary objective of atomic design methodology?',
          options: [
            'Modular, hierarchically composable UI design systems from atoms to pages',
            'Writing faster CSS animations',
            'Automating Figma file export',
            'Minifying SVG vectors',
          ],
          correctIndex: 0,
          explanation: 'Atomic design breaks interfaces down into atoms, molecules, organisms, templates, and pages.',
          difficulty: 'intermediate',
        },
      ],
    });

    // 11. Create Skill Submissions
    await SkillSubmission.create({
      student: joel._id,
      assessment: reactAssessment._id,
      skillName: reactAssessment.title,
      score: 93,
      passed: true,
      totalQuestions: 3,
      correctAnswers: 3,
    });

    // 12. Create Bookmarks
    await Bookmark.create([
      {
        user: joel._id,
        itemType: 'internship',
        internship: int1._id,
      },
      {
        user: companyUser._id,
        itemType: 'candidate',
        candidate: joel._id,
      },
      {
        user: sidharth._id,
        itemType: 'internship',
        internship: int2._id,
      },
    ]);

    console.log('✅ Database seeded successfully with full realistic data!');
    process.exit(0);
  } catch (error) {
    console.error('Database seeding error:', error);
    process.exit(1);
  }
};

if (process.argv[1]?.endsWith('seed.js')) {
  seedDatabase();
}
