import mongoose from 'mongoose';
import connectMongodb from '../config/mongodb.js';
import BetweenLines from '../models/betweenLines.js';

export const createBetweenLines = async (req, res) => {
  try {
    await connectMongodb();

    const { description } = req.body;
    const files = req.files || {};

    const images = {
      img1: files.img1 ? files.img1[0].filename : null,
      img2: files.img2 ? files.img2[0].filename : null,
      img3: files.img3 ? files.img3[0].filename : null,
    };

    const newDoc = new BetweenLines({ description, images });
    await newDoc.save();

    res.status(201).json(newDoc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateBetweenLines = async (req, res) => {
  try {
    await connectMongodb();
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    const existing = await BetweenLines.findById(id);
    if (!existing) {
      return res.status(404).json({ error: 'Not found' });
    }

    const { description } = req.body;
    const files = req.files || {};

    const images = {
      img1: files.img1 ? files.img1[0].filename : existing.images.img1,
      img2: files.img2 ? files.img2[0].filename : existing.images.img2,
      img3: files.img3 ? files.img3[0].filename : existing.images.img3,
    };

    existing.description = description || existing.description;
    existing.images = images;

    const updated = await existing.save();
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
  

export const getBetweenLines = async (req, res) => {
  try {
    await connectMongodb();
    const result = await BetweenLines.find();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteBetweenLines = async (req, res) => {
  try {
    await connectMongodb();
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    const deleted = await BetweenLines.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
