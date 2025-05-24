import mongoose from 'mongoose';

const boardDirectorsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    jobTitle: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.BoardDirectors ||
  mongoose.model('BoardDirectors', boardDirectorsSchema);