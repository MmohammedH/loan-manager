import { Request, Response } from 'express';
import Application from '../models/Application';

// Get all pending applications
export const getPendingApplications = async (req: Request, res: Response) => {
  try {
    const applications = await Application.find({ status: 'pending' }).populate('userId', 'email');
    res.status(200).json({ applications });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Verify or reject an application
export const verifyOrRejectApplication = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['verified', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Status must be either "verified" or "rejected"' });
  }

  try {
    const application = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.status(200).json({ message: `Application ${status}`, application });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
