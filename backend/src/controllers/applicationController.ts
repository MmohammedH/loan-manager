import { Request, Response } from 'express';
import Application from '../models/Application';

export const submitApplication = async (req: Request, res: Response) => {
  try {
    const { name, email, address, loanAmount } = req.body;
    const userId = req.user.id;

    const application = await Application.create({
      userId,
      name,
      email,
      address,
      loanAmount,
    });

    res.status(201).json({ message: 'Application submitted', application });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit application', error });
  }
};


export const verifyApplication = async (req: Request, res: Response) => {
  const applicationId = req.params.id;
  const { status } = req.body;

  if (!['verified', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status for verifier. Use "verified" or "rejected"' });
  }

  try {
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = status;
    await application.save();

    res.status(200).json({ message: `Application ${status}`, application });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

