import { Request, Response } from 'express';
import User from '../models/User';
import Application from '../models/Application';
import AuditLog from '../models/AuditLog';

// Get all loan applications
export const getAllApplications = async (req: Request, res: Response) => {
  try {
    const applications = await Application.find().populate('userId', 'email role');
    res.status(200).json({ applications });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// Delete an application
export const deleteApplication = async (req: Request, res: Response) => {
  try {
    const appId = req.params.id;
    await Application.findByIdAndDelete(appId);
    res.status(200).json({ message: 'Application deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting application', error: err });
  }
};

// Promote a user to verifier
export const promoteToVerifier = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndUpdate(userId, { role: 'verifier' }, { new: true });

    await AuditLog.create({
      action: 'Promote User',
      performedBy: req.user.id,
      targetId: user?._id,
      details: `User ${user?.email} promoted to verifier`,
    });

    res.status(200).json({ message: 'User promoted to verifier', user });
  } catch (err) {
    res.status(500).json({ message: 'Error promoting user', error: err });
  }
};

// Approve or Reject a verified application
export const approveOrRejectApplication = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Status must be either "approved" or "rejected"' });
  }

  try {
    const application = await Application.findById(id);
    if (!application) return res.status(404).json({ message: 'Application not found' });

    if (application.status !== 'verified') {
      return res.status(400).json({ message: 'Only verified applications can be approved or rejected by admin' });
    }

    application.status = status;
    await application.save();

    await application.save();

    await AuditLog.create({
      action: `Application ${status}`,
      performedBy: req.user.id,
      targetId: application._id,
      details: `Admin changed status to ${status}`,
    });

    res.status(200).json({ message: `Application ${status}`, application });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Add admin role to a user
export const addAdmin = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.role = 'admin';
    await user.save();

    res.status(200).json({ message: `${email} is now an admin`, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Remove admin role
export const removeAdmin = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.role = 'user';
    await user.save();

    res.status(200).json({ message: `${email} is no longer an admin`, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Dashboard Statistics
// Dashboard stats for admin
export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalApplications = await Application.countDocuments();
    const verifiedApplications = await Application.countDocuments({ status: 'verified' });
    const rejectedApplications = await Application.countDocuments({ status: 'rejected' });
    const pendingApplications = await Application.countDocuments({ status: 'pending' });

    const totalUsers = await User.countDocuments();
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    const totalVerifiers = await User.countDocuments({ role: 'verifier' });

    res.status(200).json({
      totalApplications,
      verifiedApplications,
      rejectedApplications,
      pendingApplications,
      totalUsers,
      totalAdmins,
      totalVerifiers,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch dashboard stats', error });
  }
};
