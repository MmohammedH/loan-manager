// src/models/User.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  role: 'admin' | 'verifier';
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'verifier'], required: true },
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
