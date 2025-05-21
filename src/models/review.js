import mongoose, { Schema } from 'mongoose';

const reviewSchema = new Schema(
  {
    name: { type: String, required: true },
    jobTitle: { type: String, required: true },
    image: { type: String, required: true },
    reviewText: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Review || mongoose.model('Review', reviewSchema);
