import mongoose, { Schema } from 'mongoose';

const counterSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  label: { type: String, required: true },
  amount: { type: Number, required: true }
});

const homeSchema = new Schema(
  {
    home: {
      counters: [counterSchema]
    }
  },
  { timestamps: true }
);

export default mongoose.models.Home || mongoose.model('Home', homeSchema);
