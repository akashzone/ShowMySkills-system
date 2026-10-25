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
    console.log(`\n======================================================`);
    console.log(`Connecting to MongoDB: ${MONGODB_URI}`);
    await mongoose.connect(MONGODB_URI);
    const dbName = mongoose.connection.name;
    console.log(`✅ Connected successfully to Database: "${dbName}"`);
    console.log(`======================================================\n`);

    console.log('🧹 Clearing previous collections...');
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

    // ──────────────────────────────────────────────────────────
    // 1. Core Platform Administrators
    // ──────────────────────────────────────────────────────────
    console.log('👤 Creating administrators & staff...');
    const adminUser = await User.create({
      name: 'Jordan Hayes',
      email: 'admin@showmyskills.com',
      phone: '+91 98480 00001',
      password: defaultHashedPassword,
      role: 'admin',
      roleTag: 'Admin',
      headline: 'Core Platform Administrator & Ecosystem Governance',
      emailVerified: true,
      college: 'College of Engineering Trivandrum',
      location: 'Trivandrum, Kerala',
    });

    const moderatorUser = await User.create({
      name: 'Dr. Sarah Mathews',
      email: 'sarah.mathews@cet.ac.in',
      phone: '+91 98480 00002',
      password: defaultHashedPassword,
      role: 'admin',
      roleTag: 'Admin',
      headline: 'Dean of Placements & Academic Partner Liaison',
      emailVerified: true,
      college: 'College of Engineering Trivandrum',
      location: 'Trivandrum, Kerala',
    });

    // ──────────────────────────────────────────────────────────
    // 2. Company Recruiter Profiles
    // ──────────────────────────────────────────────────────────
    console.log('🏢 Creating verified enterprise companies...');
    const websharkCompany = await User.create({
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
        aboutCompany: 'WebShark is an engineering-first organization building high-scale SaaS products, distributed backend engines, and modern React design systems.',
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

    const technovaCompany = await User.create({
      name: 'TechNova Talent Partners',
      email: 'careers@technova.io',
      phone: '+91 80 8765 4321',
      password: defaultHashedPassword,
      role: 'company',
      headline: 'Global University Recruiting at TechNova Solutions',
      emailVerified: true,
      companyProfile: {
        companyName: 'TechNova Solutions',
        tagline: 'Building the next generation of cloud developer tooling',
        aboutCompany: 'TechNova builds developer-first cloud primitives and serverless workflow orchestrators used by 100k+ engineers worldwide.',
        establishedYear: 2020,
        industryType: 'Software Development',
        companySize: '201-500',
        website: 'https://technova.io',
        linkedin: 'https://linkedin.com/company/technova-io',
        isVerified: true,
      },
    });

    const razorpayCompany = await User.create({
      name: 'Razorpay Campus Relations',
      email: 'campus@razorpay.com',
      phone: '+91 80 6789 1234',
      password: defaultHashedPassword,
      role: 'company',
      headline: 'University Talent Acquisition at Razorpay',
      emailVerified: true,
      companyProfile: {
        companyName: 'Razorpay Software Pvt Ltd',
        tagline: 'The Converged Payments Platform for Modern Internet Businesses',
        aboutCompany: 'Razorpay powers payments, banking, and credit for over 10 million Indian businesses.',
        establishedYear: 2014,
        industryType: 'FinTech',
        companySize: '1000+',
        website: 'https://razorpay.com',
        isVerified: true,
      },
    });

    // ──────────────────────────────────────────────────────────
    // 3. College Placement Representatives
    // ──────────────────────────────────────────────────────────
    console.log('🎓 Creating college institution representative...');
    await User.create({
      name: 'CET Career Guidance & Placement Unit',
      email: 'placement@cet.ac.in',
      phone: '+91 471 259 8122',
      password: defaultHashedPassword,
      role: 'college',
      headline: 'Career Guidance & Placement Unit (CGPU) at CET Trivandrum',
      emailVerified: true,
      collegeProfile: {
        collegeName: 'College of Engineering Trivandrum',
        institutionCode: 'CET-KER-001',
        establishedYear: 1939,
        location: 'Trivandrum, Kerala, India',
        accreditation: 'NAAC A+ / NBA Accredited',
        officialWebsite: 'https://www.cet.ac.in',
        contactEmail: 'cgpu@cet.ac.in',
        activeStudentsCount: 4200,
        placementRatePercent: 94,
        isVerified: true,
      },
    });

    // ──────────────────────────────────────────────────────────
    // 4. Star Student Candidates & Portfolios
    // ──────────────────────────────────────────────────────────
    console.log('💻 Creating verified student candidates...');
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
          description: 'Flutter & Firebase app for campus events, peer notes, and study group coordination.',
          tags: ['Flutter', 'Firebase', 'Mobile'],
          verified: true,
        },
        {
          id: 'p2',
          title: 'ShowMySkills Web Client',
          description: 'High-performance student portfolio showcase system with swipeable job decks.',
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
        {
          id: 'p4',
          title: 'EcoTrack Transit UX',
          description: 'Human-centered design and interactive prototype for smart city public transit navigation.',
          tags: ['UX Research', 'Figma', 'Wireframing'],
          verified: true,
        },
      ],
      portfolioUrl: 'https://behance.net/sidharth-design',
      linkedinUrl: 'https://linkedin.com/in/sidharth-s',
    });

    const reshma = await User.create({
      name: 'Reshma Udhayan',
      email: 'reshma.u@cet.ac.in',
      phone: '+91 98460 11223',
      password: defaultHashedPassword,
      role: 'student',
      roleTag: 'Promoter',
      headline: 'FullStack Developer & Industrial Systems Innovator',
      college: 'College of Engineering Trivandrum',
      course: 'B.Tech',
      branch: 'Industrial Engineering',
      graduationYear: 2026,
      location: 'Trivandrum, Kerala',
      profileIcon: 'https://api.builder.io/api/v1/image/assets/TEMP/c3059191c12486377929540d913e78b03ba9bddc?width=180',
      reputationScore: 88,
      topPercentile: 'Top 10% in Full Stack',
      completionPercentage: 92,
      emailVerified: true,
      collegeIdVerified: true,
      bio: 'Full-stack developer with a strong mechanical and systems engineering background, engineering scalable web platforms and 3D modeling tools.',
      primarySkills: ['Node.js', 'React', 'PostgreSQL', 'SolidWorks', 'CAD / CAM / CAE'],
      skills: [
        { name: 'Node.js', level: 'advanced', endorsedCount: 31 },
        { name: 'React', level: 'advanced', endorsedCount: 28 },
        { name: 'PostgreSQL', level: 'advanced', endorsedCount: 22 },
      ],
    });

    const vaishnav = await User.create({
      name: 'Vaishnav RL',
      email: 'vaishnav.rl@cet.ac.in',
      phone: '+91 94960 99887',
      password: defaultHashedPassword,
      role: 'student',
      roleTag: 'Ambassador',
      headline: 'Campus Tech Ambassador, Brand Designer & Growth Lead',
      college: 'College of Engineering Trivandrum',
      course: 'B.Tech',
      branch: 'Industrial Engineering',
      graduationYear: 2026,
      location: 'Trivandrum, Kerala',
      profileIcon: 'https://api.builder.io/api/v1/image/assets/TEMP/46fce00ed55aca498d8347d953abdc65e3ba2655?width=180',
      reputationScore: 85,
      completionPercentage: 90,
      emailVerified: true,
      collegeIdVerified: true,
      bio: 'Visual and brand designer translating quantitative business insights and financial narratives into compelling graphics and tech community outreach.',
      primarySkills: ['Brand Identity', 'Motion Graphics', 'Financial Analysis', 'UI/UX'],
    });

    const abhay = await User.create({
      name: 'Abhay SA',
      email: 'abhay.sa@cet.ac.in',
      phone: '+91 95670 44332',
      password: defaultHashedPassword,
      role: 'student',
      roleTag: 'Contributor',
      headline: 'Open Source Contributor & Distributed Backend Enthusiast',
      college: 'College of Engineering Trivandrum',
      course: 'B.Tech',
      branch: 'Industrial Engineering',
      graduationYear: 2026,
      location: 'Trivandrum, Kerala',
      profileIcon: 'https://api.builder.io/api/v1/image/assets/TEMP/f7559f012fcf86117c87ef912259ea3d4b2467c5?width=180',
      reputationScore: 82,
      completionPercentage: 88,
      emailVerified: true,
      collegeIdVerified: true,
      bio: 'Full-stack engineer passionate about industrial automation, container orchestration, and developer tooling.',
      primarySkills: ['Next.js', 'Express', 'Docker', 'REST APIs', 'SolidWorks'],
    });

    const ananya = await User.create({
      name: 'Ananya Sharma',
      email: 'ananya.sharma@iitm.ac.in',
      phone: '+91 98450 77665',
      password: defaultHashedPassword,
      role: 'student',
      roleTag: 'Contributor',
      headline: 'Machine Learning Research Intern & Deep Learning Fellow',
      college: 'Indian Institute of Technology Madras',
      course: 'B.Tech',
      branch: 'Data Science & AI',
      graduationYear: 2026,
      location: 'Chennai, Tamil Nadu',
      profileIcon: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=180&auto=format&fit=crop&q=80',
      reputationScore: 94,
      topPercentile: 'Top 2% in AI / ML',
      completionPercentage: 96,
      emailVerified: true,
      collegeIdVerified: true,
      bio: 'AI researcher working on transformer interpretability and computer vision benchmarks.',
      primarySkills: ['Python', 'PyTorch', 'TensorFlow', 'Computer Vision'],
      skills: [
        { name: 'Python', level: 'expert', endorsedCount: 45 },
        { name: 'PyTorch', level: 'advanced', endorsedCount: 34 },
        { name: 'TensorFlow', level: 'advanced', endorsedCount: 29 },
      ],
    });

    const rohan = await User.create({
      name: 'Rohan Nair',
      email: 'rohan.nair@nitc.ac.in',
      phone: '+91 94470 12389',
      password: defaultHashedPassword,
      role: 'student',
      roleTag: 'Promoter',
      headline: 'Mobile Engineering Specialist | React Native & iOS',
      college: 'National Institute of Technology Calicut',
      course: 'B.Tech',
      branch: 'Computer Science and Engineering',
      graduationYear: 2026,
      location: 'Kozhikode, Kerala',
      profileIcon: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=180&auto=format&fit=crop&q=80',
      reputationScore: 89,
      completionPercentage: 91,
      emailVerified: true,
      collegeIdVerified: true,
      primarySkills: ['React Native', 'Swift', 'TypeScript', 'Redux', 'Mobile UX'],
    });

    const meera = await User.create({
      name: 'Meera Krishnan',
      email: 'meera.krishnan@bits-pilani.ac.in',
      phone: '+91 98460 77123',
      password: defaultHashedPassword,
      role: 'student',
      roleTag: 'Ambassador',
      headline: 'DevOps & Site Reliability Engineer | Kubernetes & Terraform',
      college: 'BITS Pilani',
      course: 'B.E.',
      branch: 'Computer Science',
      graduationYear: 2026,
      location: 'Pilani, Rajasthan',
      profileIcon: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=180&auto=format&fit=crop&q=80',
      reputationScore: 91,
      completionPercentage: 94,
      emailVerified: true,
      collegeIdVerified: true,
      primarySkills: ['Kubernetes', 'Docker', 'AWS', 'Terraform', 'CI/CD Pipelines'],
    });

    // ──────────────────────────────────────────────────────────
    // 5. Active Verified Internships (Discovery Feed)
    // ──────────────────────────────────────────────────────────
    console.log('💼 Seeding rich corporate internships...');
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
        'Lead user research and synthesize client problem statements into atomic Figma components',
        'Build high-fidelity responsive mobile prototypes adhering to strict accessibility guidelines',
        'Collaborate with React engineers to ensure design implementation fidelity across production screens',
      ],
      employmentType: 'Full time',
      jobType: 'Full time',
      isVerified: true,
      isFeatured: true,
      status: 'active',
      applicationUrl: 'https://webshark.io/careers/ui-ux',
      postedBy: websharkCompany._id,
      applicantsCount: 42,
      description: 'Design intuitive interfaces and create responsive mobile prototypes for high-scale enterprise SaaS clients.',
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
        'Build responsive Next.js App Router client and server components',
        'Optimize Core Web Vitals and client bundle size for millisecond render speeds',
        'Author reusable UI primitives and write comprehensive component test suites',
      ],
      employmentType: 'Full time',
      jobType: 'Full time',
      isVerified: true,
      isFeatured: true,
      status: 'active',
      applicationUrl: 'https://technova.io/careers/frontend',
      postedBy: technovaCompany._id,
      applicantsCount: 89,
      description: 'Collaborate with full stack engineers to develop modern interactive user experiences on Next.js 15.',
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
      responsibilities: [
        'Analyze large-scale tabular datasets and extract actionable financial insights',
        'Build and benchmark supervised machine learning classification pipelines',
        'Create interactive Tableau dashboards for executive business reporting',
      ],
      employmentType: 'Full time',
      jobType: 'Full time',
      isVerified: false,
      isFeatured: false,
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
      responsibilities: [
        'Design high-throughput RESTful endpoints and asynchronous worker pipelines',
        'Optimize relational database indexing and Redis cache invalidation strategies',
        'Implement robust NoSQL and SQL security protections and JWT session handling',
      ],
      employmentType: 'Full time',
      jobType: 'Full time',
      isVerified: true,
      isFeatured: false,
      status: 'active',
      applicationUrl: 'https://finedge.tech/careers/backend',
      applicantsCount: 53,
      description: 'Design robust microservices, optimize database queries, and secure distributed endpoints.',
    });

    const int5 = await Internship.create({
      company: 'Razorpay',
      companyLogoText: 'RAZORPAY',
      companyLogoSubText: 'PAYMENTS',
      role: 'SDE Intern - Payments Core',
      location: 'Bengaluru, India',
      mode: 'hybrid',
      stipendMin: 45000,
      stipendMax: 50000,
      stipendText: '₹45,000 - ₹50,000 / mo',
      duration: '6 Months',
      skills: ['Go', 'Node.js', 'Kafka', 'PostgreSQL', 'Distributed Systems'],
      responsibilities: [
        'Build low-latency payment processing pipelines handling 10,000+ TPS',
        'Integrate bank gateway webhook listeners with idempotent retry guarantees',
      ],
      employmentType: 'Full time',
      jobType: 'Full time',
      isVerified: true,
      isFeatured: true,
      status: 'active',
      applicationUrl: 'https://razorpay.com/jobs/sde-intern',
      postedBy: razorpayCompany._id,
      applicantsCount: 142,
      description: 'Work on India most resilient payment gateway infrastructure powering millions of checkouts daily.',
    });

    const int6 = await Internship.create({
      company: 'CRED',
      companyLogoText: 'CRED',
      companyLogoSubText: 'DESIGN & TECH',
      role: 'Frontend Engineer Intern (Design Systems)',
      location: 'Bengaluru, India',
      mode: 'onsite',
      stipendMin: 50000,
      stipendMax: 60000,
      stipendText: '₹50,000 - ₹60,000 / mo',
      duration: '6 Months',
      skills: ['React', 'Framer Motion', 'Tailwind CSS', 'WebGL', 'TypeScript'],
      responsibilities: [
        'Craft fluid 60fps micro-animations and physics-based interactions for the member web dashboard',
        'Maintain the internal CRED design system tokens and headless UI components',
      ],
      employmentType: 'Full time',
      jobType: 'Full time',
      isVerified: true,
      isFeatured: true,
      status: 'active',
      applicationUrl: 'https://cred.club/careers',
      applicantsCount: 188,
      description: 'Bring world-class aesthetic excellence and frictionless UI animations to member experiences.',
    });

    const int7 = await Internship.create({
      company: 'Swiggy',
      companyLogoText: 'SWIGGY',
      companyLogoSubText: 'CONSUMER TECH',
      role: 'Product Design Intern',
      location: 'Bengaluru, India',
      mode: 'hybrid',
      stipendMin: 35000,
      stipendMax: 40000,
      stipendText: '₹35,000 - ₹40,000 / mo',
      duration: '6 Months',
      skills: ['Figma', 'UI/UX Design', 'User Research', 'Design Systems', 'Prototyping'],
      responsibilities: [
        'Design checkout flows, cart interactions, and live tracking UI for quick-commerce',
        'Conduct field research with restaurant partners and consumer focus groups',
      ],
      employmentType: 'Full time',
      jobType: 'Full time',
      isVerified: true,
      isFeatured: false,
      status: 'active',
      applicationUrl: 'https://swiggy.com/careers',
      applicantsCount: 76,
      description: 'Solve real-world hyperlocal logistics and food delivery design challenges for millions of daily active users.',
    });

    const int8 = await Internship.create({
      company: 'Postman',
      companyLogoText: 'POSTMAN',
      companyLogoSubText: 'API PLATFORM',
      role: 'API Platform Engineering Intern',
      location: 'Bengaluru, India (Remote Eligible)',
      mode: 'remote',
      stipendMin: 50000,
      stipendMax: 55000,
      stipendText: '₹50,000 - ₹55,000 / mo',
      duration: '3 Months',
      skills: ['Node.js', 'TypeScript', 'REST APIs', 'OpenAPI', 'WebSockets'],
      responsibilities: [
        'Enhance API client testing tools and automated mock server runtime engines',
        'Contribute to open-source Postman collections and OpenAPI specification linters',
      ],
      employmentType: 'Full time',
      jobType: 'Full time',
      isVerified: true,
      isFeatured: true,
      status: 'active',
      applicationUrl: 'https://postman.com/careers',
      applicantsCount: 97,
      description: 'Empower over 30 million developers to build, test, and document world-class APIs seamlessly.',
    });

    const int9 = await Internship.create({
      company: 'Zerodha',
      companyLogoText: 'ZERODHA',
      companyLogoSubText: 'KITE ENGINE',
      role: 'Systems & Go Backend Intern',
      location: 'Bengaluru, India',
      mode: 'onsite',
      stipendMin: 40000,
      stipendMax: 45000,
      stipendText: '₹40,000 - ₹45,000 / mo',
      duration: '6 Months',
      skills: ['Go', 'PostgreSQL', 'Linux', 'Networking', 'WebSockets'],
      responsibilities: [
        'Develop ultra-fast order routing engines and real-time market ticker socket streams',
        'Optimize memory allocations and Linux kernel network socket buffers',
      ],
      employmentType: 'Full time',
      jobType: 'Full time',
      isVerified: true,
      isFeatured: false,
      status: 'active',
      applicationUrl: 'https://zerodha.com/careers',
      applicantsCount: 112,
      description: 'Work alongside India largest retail stockbroker on lean, pure open-source tech stacks without bloated frameworks.',
    });

    const int10 = await Internship.create({
      company: 'Zomato',
      companyLogoText: 'ZOMATO',
      companyLogoSubText: 'MOBILE CORE',
      role: 'Mobile Developer Intern (React Native)',
      location: 'Gurugram, India',
      mode: 'hybrid',
      stipendMin: 35000,
      stipendMax: 40000,
      stipendText: '₹35,000 - ₹40,000 / mo',
      duration: '6 Months',
      skills: ['React Native', 'JavaScript', 'TypeScript', 'Redux', 'Mobile UX'],
      responsibilities: [
        'Build high-performance native bridge modules and offline-first cart persistence',
        'Optimize app startup time and render lists with thousands of restaurant menu items',
      ],
      employmentType: 'Full time',
      jobType: 'Full time',
      isVerified: true,
      isFeatured: false,
      status: 'active',
      applicationUrl: 'https://zomato.com/careers',
      applicantsCount: 68,
      description: 'Ship fluid Android and iOS application features loved by foodies across 500+ Indian cities.',
    });

    // ──────────────────────────────────────────────────────────
    // 6. Launchpad Top Opportunities (Verified Top Tier)
    // ──────────────────────────────────────────────────────────
    console.log('🚀 Seeding top tier career launchpad opportunities...');
    await LaunchpadItem.create([
      {
        position: 'VCA Consulting & Analytics Intern',
        company: 'Visa Inc.',
        oneLiner: 'Formulate strategic payment analytics & data-driven advisory for global banking clients.',
        location: 'Bengaluru / Mumbai, India (Hybrid)',
        stipend: '₹75,000 - ₹90,000 / mo',
        duration: '6 Months · Batch 2025/2026',
        clicks: '1.8k clicks',
        clickCount: 1820,
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
        clickCount: 2450,
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
      {
        position: 'Software Engineering Intern',
        company: 'Google',
        oneLiner: 'Engineer high-scale distributed systems, search infrastructure, and production AI models.',
        location: 'Bengaluru / Hyderabad, India',
        stipend: '₹1,15,000 / mo',
        duration: 'Summer 2025 · 10-12 Weeks',
        clicks: '4.1k clicks',
        clickCount: 4120,
        logoType: 'google',
        applyUrl: 'https://careers.google.com/jobs/results/?q=Software%20Engineering%20Intern',
        skills: ['C++ / Java', 'Python', 'DSA'],
        allSkills: ['C++ / Java', 'Python', 'Algorithms', 'Distributed Systems', 'Machine Learning', 'Linux'],
        about: 'Google software engineering interns work on core products that impact billions of people daily.',
        perks: 'Free gourmet dining, relocation travel, housing assistance, and conversion opportunities for full-time SWE.',
        batchYear: '2025/2026',
        isVerified: true,
        featured: true,
      },
      {
        position: 'Software Engineer Intern (SDE)',
        company: 'Microsoft',
        oneLiner: 'Develop next-generation cloud services and enterprise tools on Azure & Windows Core.',
        location: 'Bengaluru / Hyderabad, India',
        stipend: '₹1,25,000 / mo',
        duration: 'Summer 2025 · 8-12 Weeks',
        clicks: '3.6k clicks',
        clickCount: 3600,
        logoType: 'microsoft',
        applyUrl: 'https://careers.microsoft.com/us/en/search-results?keywords=Software%20Engineering%20Intern',
        skills: ['C# / C++', 'Azure Cloud', 'Data Structures'],
        allSkills: ['C# / C++', 'Azure Cloud', 'Data Structures', 'Full Stack', 'Distributed Computing', 'APIs'],
        about: 'Microsoft Cloud and Enterprise engineering teams build planet-scale infrastructure.',
        perks: 'Corporate housing allowance, premium health coverage, and mentorship from senior architects.',
        batchYear: '2025/2026',
        isVerified: true,
        featured: true,
      },
      {
        position: 'Amazon Software Development Engineer Intern',
        company: 'Amazon',
        oneLiner: 'Tackle complex algorithmic challenges in AWS Cloud, Prime Video, and Global Retail Logistics.',
        location: 'Bengaluru / Hyderabad / Chennai, India',
        stipend: '₹1,10,000 / mo',
        duration: '6 Months · Spring/Summer 2026',
        clicks: '3.9k clicks',
        clickCount: 3910,
        logoType: 'amazon',
        applyUrl: 'https://amazon.jobs/en/jobs/early-careers-sde',
        skills: ['Java', 'Python', 'Algorithms'],
        allSkills: ['Java', 'Python', 'Algorithms', 'AWS', 'Object Oriented Design', 'NoSQL'],
        about: 'Amazon engineers invent on behalf of millions of global customers and businesses every day.',
        perks: 'PPO evaluation, commuter shuttle benefits, and access to internal tech conferences.',
        batchYear: '2025/2026',
        isVerified: true,
        featured: true,
      },
      {
        position: 'Uber Engineering Intern',
        company: 'Uber',
        oneLiner: 'Develop real-time driver dispatching, dynamic pricing algorithms, and microservices.',
        location: 'Bengaluru / Hyderabad, India',
        stipend: '₹1,35,000 / mo',
        duration: 'Summer 2025 · 12 Weeks',
        clicks: '2.8k clicks',
        clickCount: 2840,
        logoType: 'uber',
        applyUrl: 'https://uber.com/careers/university',
        skills: ['Go / Java', 'Distributed Systems', 'Kafka'],
        allSkills: ['Go / Java', 'Distributed Systems', 'Kafka', 'gRPC', 'High Availability', 'PostgreSQL'],
        about: 'Uber moves people and things in the physical world through cutting-edge engineering at scale.',
        perks: 'Uber credits, ergonomic hardware stipend, and high PPO conversion rate.',
        batchYear: '2025/2026',
        isVerified: true,
        featured: true,
      },
    ]);

    // ──────────────────────────────────────────────────────────
    // 7. ATS Candidate Applications Lifecycle
    // ──────────────────────────────────────────────────────────
    console.log('📑 Seeding ATS applications and status pipelines...');
    await Application.create([
      {
        internship: int1._id,
        student: joel._id,
        company: websharkCompany._id,
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
        notes: 'Demonstrated exceptional mastery in UI architecture and React component design.',
      },
      {
        internship: int1._id,
        student: sidharth._id,
        company: websharkCompany._id,
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
        notes: 'Portfolio includes enterprise design system and mobile prototypes. Scheduled technical interview round.',
        interviewDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      },
      {
        internship: int2._id,
        student: joel._id,
        company: technovaCompany._id,
        roleTitle: 'Frontend Developer Intern',
        companyName: 'TechNova Solutions',
        status: 'hired',
        candidateSnapshot: {
          name: joel.name,
          email: joel.email,
          phone: joel.phone,
          college: joel.college,
          department: joel.branch,
          score: joel.reputationScore,
          avatar: joel.profileIcon,
          skills: ['React', 'Next.js', 'TypeScript'],
        },
        notes: 'Passed all 3 evaluation rounds with top marks. Offer letter generated at ₹25,000/mo.',
      },
      {
        internship: int5._id,
        student: abhay._id,
        company: razorpayCompany._id,
        roleTitle: 'SDE Intern - Payments Core',
        companyName: 'Razorpay',
        status: 'reviewing',
        candidateSnapshot: {
          name: abhay.name,
          email: abhay.email,
          phone: abhay.phone,
          college: abhay.college,
          department: abhay.branch,
          score: abhay.reputationScore,
          avatar: abhay.profileIcon,
          skills: ['Next.js', 'Express', 'Docker'],
        },
        notes: 'Resume under preliminary code review by the Payments Core hiring team.',
      },
      {
        internship: int6._id,
        student: sidharth._id,
        company: websharkCompany._id,
        roleTitle: 'Frontend Engineer Intern (Design Systems)',
        companyName: 'CRED',
        status: 'applied',
        candidateSnapshot: {
          name: sidharth.name,
          email: sidharth.email,
          college: sidharth.college,
          score: sidharth.reputationScore,
          avatar: sidharth.profileIcon,
          skills: ['Figma', 'Design Systems', 'UI/UX'],
        },
        notes: 'Applied through the ShowMySkills campus portal.',
      },
    ]);

    // ──────────────────────────────────────────────────────────
    // 8. Verification Requests (Badges & Credentials)
    // ──────────────────────────────────────────────────────────
    console.log('🛡️ Seeding student credential verification requests...');
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
        reviewedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
      {
        user: sidharth._id,
        role: 'student',
        type: 'College ID Document',
        institution: 'College of Engineering Trivandrum',
        department: 'Industrial Engineering',
        docName: 'CET_ID_Card_Sidharth.pdf',
        docUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
        notes: 'Undergraduate student verification for campus placement portal.',
        status: 'approved',
        reviewedBy: adminUser._id,
        reviewedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
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
      {
        user: rohan._id,
        role: 'student',
        type: 'College ID Document',
        institution: 'NIT Calicut',
        department: 'Computer Science',
        docName: 'NITC_Student_ID.pdf',
        docUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
        notes: 'Awaiting administrative verification.',
        status: 'pending',
      },
    ]);

    // ──────────────────────────────────────────────────────────
    // 9. Real-Time Chat Channels & Messages
    // ──────────────────────────────────────────────────────────
    console.log('💬 Seeding chat conversations...');
    const conv1 = await Conversation.create({
      participants: [joel._id, websharkCompany._id],
      lastMessage: 'Hi Joel! We reviewed your frontend portfolio and would love to schedule a technical chat.',
      lastMessageAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      lastSender: websharkCompany._id,
    });

    await Message.create([
      {
        conversationId: conv1._id,
        sender: websharkCompany._id,
        receiver: joel._id,
        text: 'Hello Joel! Your project CampusHub looks fantastic.',
        status: 'read',
      },
      {
        conversationId: conv1._id,
        sender: joel._id,
        receiver: websharkCompany._id,
        text: 'Thank you! I focused heavily on fluid animations and responsive mobile architecture.',
        status: 'read',
      },
      {
        conversationId: conv1._id,
        sender: websharkCompany._id,
        receiver: joel._id,
        text: 'Hi Joel! We reviewed your frontend portfolio and would love to schedule a technical chat.',
        status: 'delivered',
      },
    ]);

    const conv2 = await Conversation.create({
      participants: [sidharth._id, websharkCompany._id],
      lastMessage: 'Your Figma design systems portfolio is exemplary. We have sent the interview invite link.',
      lastMessageAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      lastSender: websharkCompany._id,
    });

    await Message.create([
      {
        conversationId: conv2._id,
        sender: websharkCompany._id,
        receiver: sidharth._id,
        text: 'Your Figma design systems portfolio is exemplary. We have sent the interview invite link.',
        status: 'delivered',
      },
    ]);

    // ──────────────────────────────────────────────────────────
    // 10. Notifications
    // ──────────────────────────────────────────────────────────
    console.log('🔔 Seeding platform notifications...');
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
        title: 'Offer Letter Released 🎉',
        desc: 'TechNova Solutions has extended an internship offer for Frontend Developer Intern.',
        unread: true,
        type: 'application',
      },
      {
        user: joel._id,
        title: 'Skill Verified',
        desc: 'React & Next.js Architecture benchmark assessment passed with score 93%.',
        unread: false,
        type: 'verification',
      },
      {
        user: sidharth._id,
        title: 'Interview Scheduled',
        desc: 'Technical round scheduled with WebShark Web Services for UI/UX Design Intern.',
        unread: true,
        type: 'application',
      },
      {
        user: sidharth._id,
        title: 'ID Verification Approved',
        desc: 'Your College ID has been officially verified by the platform admin.',
        unread: false,
        type: 'verification',
      },
    ]);

    // ──────────────────────────────────────────────────────────
    // 11. Technical Skill Assessments & Submissions
    // ──────────────────────────────────────────────────────────
    console.log('🧠 Seeding skill benchmark tests...');
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

    const nodeAssessment = await SkillAssessment.create({
      title: 'Node.js & Express REST APIs',
      category: 'Backend',
      description: 'Design patterns, middleware security, rate limiting, and asynchronous stream handling in Node.js.',
      durationMinutes: 20,
      passingScore: 75,
      reputationPoints: 15,
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
      reputationPoints: 15,
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

    await SkillSubmission.create({
      student: joel._id,
      assessment: reactAssessment._id,
      skillName: reactAssessment.title,
      score: 93,
      passed: true,
      totalQuestions: 3,
      correctAnswers: 3,
    });

    await SkillSubmission.create({
      student: abhay._id,
      assessment: nodeAssessment._id,
      skillName: nodeAssessment.title,
      score: 85,
      passed: true,
      totalQuestions: 1,
      correctAnswers: 1,
    });

    // ──────────────────────────────────────────────────────────
    // 12. Bookmarks (Saved Internships & Talent)
    // ──────────────────────────────────────────────────────────
    console.log('📌 Seeding user bookmarks...');
    await Bookmark.create([
      {
        user: joel._id,
        itemType: 'internship',
        internship: int1._id,
      },
      {
        user: joel._id,
        itemType: 'internship',
        internship: int2._id,
      },
      {
        user: websharkCompany._id,
        itemType: 'candidate',
        candidate: joel._id,
      },
      {
        user: websharkCompany._id,
        itemType: 'candidate',
        candidate: sidharth._id,
      },
      {
        user: sidharth._id,
        itemType: 'internship',
        internship: int6._id,
      },
    ]);

    // ──────────────────────────────────────────────────────────
    // Summary Audit & Verification
    // ──────────────────────────────────────────────────────────
    const counts = {
      users: await User.countDocuments(),
      internships: await Internship.countDocuments(),
      applications: await Application.countDocuments(),
      launchpadItems: await LaunchpadItem.countDocuments(),
      verificationRequests: await VerificationRequest.countDocuments(),
      conversations: await Conversation.countDocuments(),
      messages: await Message.countDocuments(),
      notifications: await Notification.countDocuments(),
      skillAssessments: await SkillAssessment.countDocuments(),
      skillSubmissions: await SkillSubmission.countDocuments(),
      bookmarks: await Bookmark.countDocuments(),
    };

    console.log(`\n======================================================`);
    console.log(`🎉 DATABASE SEEDING COMPLETED IN DATABASE: "${dbName}"`);
    console.log(`======================================================`);
    console.table(counts);
    console.log(`👉 In MongoDB Compass: Click the Refresh icon (⟳) on the collection!`);
    console.log(`======================================================\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Database seeding error:', error);
    process.exit(1);
  }
};

if (process.argv[1]?.endsWith('seed.js')) {
  seedDatabase();
}
