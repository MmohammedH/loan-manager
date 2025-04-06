import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes';
import applicationRoutes from './routes/applicationRoutes';
import verifierRoutes from './routes/verifierRoutes'; // ✅ Add this line

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/application', applicationRoutes);
app.use('/api/verifier', verifierRoutes); // ✅ Add this line

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || '')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
