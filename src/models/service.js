import mongoose, { Schema } from 'mongoose';

const serviceSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Service ||
  mongoose.model('Service', serviceSchema);
