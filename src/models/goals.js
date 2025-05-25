import mongoose from 'mongoose';

const goalsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Goals || mongoose.model('Goals', goalsSchema);
