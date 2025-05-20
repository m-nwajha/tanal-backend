import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Counter ||
  mongoose.model('Counter', counterSchema);