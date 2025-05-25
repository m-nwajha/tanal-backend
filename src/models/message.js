import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Message ||
  mongoose.model('Message', messageSchema);
