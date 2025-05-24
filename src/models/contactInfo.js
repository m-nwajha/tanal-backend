import mongoose from 'mongoose';

const socialMediaSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    url: { type: String, required: true },
    icon: { type: String, required: true },
  },
  { _id: true }
);

const contactInfoSchema = new mongoose.Schema(
  {
    address: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    whatsApp: { type: String, required: true },
    location: { type: String, required: true },
    socialMedia: [socialMediaSchema],
  },
  { timestamps: true }
);

export default mongoose.models.ContactInfo ||
  mongoose.model('ContactInfo', contactInfoSchema);
