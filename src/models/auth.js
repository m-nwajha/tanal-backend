import mongoose from 'mongoose';

const authSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Auth || mongoose.model('Auth', authSchema);
