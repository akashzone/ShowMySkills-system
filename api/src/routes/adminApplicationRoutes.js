import { Router } from 'express';
import multer from 'multer';
import fs from 'node:fs';
import path from 'node:path';
import { adminApplicationController } from '../controllers/adminApplicationController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const uploadDir = 'uploads/admin-photos';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `admin-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, and WebP image files are allowed for photos'));
    }
  },
});

// Middleware to ensure caller is an authorized core admin
const requireCoreAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied: Core admin privileges required',
    });
  }
  next();
};

const router = Router();

/**
 * @openapi
 * /api/admin-applications/send-applicant-otp:
 *   post:
 *     summary: Send OTP to applicant email for email verification
 *     tags:
 *       - Admin Application
 */
router.post(
  '/send-applicant-otp',
  adminApplicationController.sendApplicantOtp
);

/**
 * @openapi
 * /api/admin-applications/verify-applicant-otp:
 *   post:
 *     summary: Verify OTP sent to applicant email
 *     tags:
 *       - Admin Application
 */
router.post(
  '/verify-applicant-otp',
  adminApplicationController.verifyApplicantOtp
);

/**
 * @openapi
 * /api/admin-applications/send-official-otp:
 *   post:
 *     summary: Send authorization code to fixed official ShowMySkills email address
 *     tags:
 *       - Admin Application
 */
router.post(
  '/send-official-otp',
  adminApplicationController.sendOfficialOtp
);

/**
 * @openapi
 * /api/admin-applications/submit:
 *   post:
 *     summary: Submit an application for admin access
 *     tags:
 *       - Admin Application
 */
router.post(
  '/submit',
  upload.single('photo'),
  adminApplicationController.submitApplication
);

/**
 * @openapi
 * /api/admin-applications:
 *   get:
 *     summary: List admin applications (Authorized Core Admins only)
 *     tags:
 *       - Admin Application
 *     security:
 *       - bearerAuth: []
 */
router.get(
  '/',
  authMiddleware,
  requireCoreAdmin,
  adminApplicationController.listApplications
);

/**
 * @openapi
 * /api/admin-applications/{id}/approve:
 *   post:
 *     summary: Approve an admin application and grant admin access (Authorized Core Admins only)
 *     tags:
 *       - Admin Application
 *     security:
 *       - bearerAuth: []
 */
router.post(
  '/:id/approve',
  authMiddleware,
  requireCoreAdmin,
  adminApplicationController.approveApplication
);

/**
 * @openapi
 * /api/admin-applications/{id}/reject:
 *   post:
 *     summary: Reject an admin application (Authorized Core Admins only)
 *     tags:
 *       - Admin Application
 *     security:
 *       - bearerAuth: []
 */
router.post(
  '/:id/reject',
  authMiddleware,
  requireCoreAdmin,
  adminApplicationController.rejectApplication
);

export default router;
