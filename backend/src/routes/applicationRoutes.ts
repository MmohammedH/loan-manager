import express from 'express';
import {
  submitApplication,
  verifyApplication
} from '../controllers/applicationController';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware';

const router = express.Router();

// Loan submission by user
router.post('/submit', authenticateToken, submitApplication);

// Loan verification or rejection by Verifier
router.patch('/verify/:id', authenticateToken, authorizeRoles('verifier'), verifyApplication);

export default router;
