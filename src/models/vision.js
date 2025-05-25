import mongoose from 'mongoose';

const visionSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Vision ||
  mongoose.model('Vision', visionSchema);