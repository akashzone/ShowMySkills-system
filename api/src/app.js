
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import path from 'node:path';

import { swaggerSpec } from './config/swagger.js';
import authRoutes from './routes/authRoutes.js';
import internshipRoutes from './routes/internshipRoutes.js';
import internshipActionRoutes from './routes/internshipActionRoutes.js';
import adminApplicationRoutes from './routes/adminApplicationRoutes.js';

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());

// Static file serving for uploads (profile icons, documents)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// API Router mounted under /api
const apiRouter = express.Router();

// Swagger Documentation: /api/docs
apiRouter.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Authentication Routes: /api/auth/*
apiRouter.use('/auth', authRoutes);

// Admin Application Routes
apiRouter.use('/admin-applications', adminApplicationRoutes);
apiRouter.use('/admin/applications', adminApplicationRoutes);

// Internship Discovery Feed: /api/internships/*
apiRouter.use('/internships', internshipRoutes);

// Internship Actions: /api/internship-actions/*
apiRouter.use('/internship-actions', internshipActionRoutes);

// Health Check: /api/health
apiRouter.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
  });
});

// Catch-all handler for unknown API endpoints
// IMPORTANT: Keep this after all registered API routes.
apiRouter.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'NotFound',
    message: `API endpoint '${req.originalUrl}' does not exist.`,
  });
});

// Mount all API routes under /api
app.use('/api', apiRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack || err.message);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

export default app;
