import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    text: { type: String },
    file: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Request ||
  mongoose.model('Request', requestSchema);
