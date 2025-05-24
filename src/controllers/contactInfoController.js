import mongoose from 'mongoose';
import connectMongodb from '../config/mongodb.js';
import ContactInfo from '../models/contactInfo.js';

export const getAllContactInfo = async (req, res) => {
  try {
    await connectMongodb();
    const contactInfo = await ContactInfo.find();
    res.status(200).json(contactInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const createContactInfo = async (req, res) => {
  try {
    await connectMongodb();

    const {
      address,
      email,
      mobile,
      whatsApp,
      location,
      socialMedia = [],
    } = req.body;

    const newContactInfo = new ContactInfo({
      address,
      email,
      mobile,
      whatsApp,
      location,
      socialMedia,
    });

    const saved = await newContactInfo.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateContactInfo = async (req, res) => {
  try {
    await connectMongodb();
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid contact info id' });
    }

    const existingContact = await ContactInfo.findById(id);
    if (!existingContact) {
      return res.status(404).json({ error: 'Contact info not found' });
    }

    const { address, email, mobile, whatsApp, location, socialMedia } =
      req.body;

    if (address !== undefined) existingContact.address = address;
    if (email !== undefined) existingContact.email = email;
    if (mobile !== undefined) existingContact.mobile = mobile;
    if (whatsApp !== undefined) existingContact.whatsApp = whatsApp;
    if (location !== undefined) existingContact.location = location;

    if (Array.isArray(socialMedia)) {
      const updatedSocialMedia = [];

      for (const item of socialMedia) {
        if (item._id) {
          const existing = existingContact.socialMedia.id(item._id);
          if (existing) {
            existing.label = item.label || existing.label;
            existing.url = item.url || existing.url;
            existing.icon = item.icon || existing.icon;
            updatedSocialMedia.push(existing);
          }
        } else {
          updatedSocialMedia.push({
            label: item.label,
            url: item.url,
            icon: item.icon,
          });
        }
      }

      existingContact.socialMedia = updatedSocialMedia;
    }

    const saved = await existingContact.save();
    res.status(200).json(saved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteContactInfo = async (req, res) => {
  try {
    await connectMongodb();
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid contact info id' });
    }

    const deleted = await ContactInfo.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Contact info not found' });
    }

    res.json({ message: 'Contact info deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};