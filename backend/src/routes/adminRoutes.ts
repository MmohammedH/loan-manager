import express from 'express';
import {
  getAllApplications,
  deleteApplication,
  promoteToVerifier,
  approveOrRejectApplication,
  addAdmin,
  removeAdmin,
  getDashboardStats
} from '../controllers/adminController';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware';

const router = express.Router();

// Role-based access test routes
router.get('/admin-only', authenticateToken, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Welcome Admin! You can manage users.' });
});

router.get('/verifier-only', authenticateToken, authorizeRoles('verifier'), (req, res) => {
  res.json({ message: 'Welcome Verifier! You can verify applications.' });
});

// Admin functionalities
router.get('/applications', authenticateToken, authorizeRoles('admin'), getAllApplications);
router.delete('/applications/:id', authenticateToken, authorizeRoles('admin'), deleteApplication);
router.put('/promote/:id', authenticateToken, authorizeRoles('admin'), promoteToVerifier);

// ✅ New routes
router.patch('/applications/:id', authenticateToken, authorizeRoles('admin'), approveOrRejectApplication);
router.put('/add-admin/:id', authenticateToken, authorizeRoles('admin'), addAdmin);
router.put('/remove-admin/:id', authenticateToken, authorizeRoles('admin'), removeAdmin);
router.get('/dashboard-stats', authenticateToken, authorizeRoles('admin'), getDashboardStats);

export default router;
