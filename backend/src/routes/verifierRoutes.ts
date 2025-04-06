import express from 'express';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware';
import { getPendingApplications, verifyOrRejectApplication } from '../controllers/verifierController';

const router = express.Router();

// Route to get all pending applications
router.get('/pending', authenticateToken, authorizeRoles('verifier'), getPendingApplications);

// Route to verify or reject an application
router.patch('/:id', authenticateToken, authorizeRoles('verifier'), verifyOrRejectApplication);

export default router;
