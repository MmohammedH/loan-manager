import mongoose, { Schema } from 'mongoose';

const applicationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: String,
  email: String,
  address: String,
  loanAmount: Number,
  status: {
    type: String,
    enum: ['pending', 'verified', 'rejected', 'approved'],
    default: 'pending',
  },
}, { timestamps: true });

export default mongoose.model('Application', applicationSchema);
