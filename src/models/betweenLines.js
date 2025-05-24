import mongoose from 'mongoose';

const betweenLinesSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    images: {
      img1: { type: String, required: true },
      img2: { type: String, required: true },
      img3: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export default mongoose.models.BetweenLines ||
  mongoose.model('BetweenLines', betweenLinesSchema);
