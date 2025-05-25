import mongoose from 'mongoose';

const whyTanalSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.WhyTanal ||
  mongoose.model('WhyTanal', whyTanalSchema);