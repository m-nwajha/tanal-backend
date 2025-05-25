import mongoose from 'mongoose';

const clientsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.clients ||
  mongoose.model('clients', clientsSchema);
