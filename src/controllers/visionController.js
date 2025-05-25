import mongoose from 'mongoose';
import connectMongodb from '../config/mongodb.js';
import vision from '../models/vision.js';

export const getVision = async (req, res) => {
  try {
    await connectMongodb();
    const items = await vision.find();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


export const createVision = async (req, res) => {
  try {
    await connectMongodb();

    const { description } = req.body;
    let image = null;

    if (req.file) {
      image = req.file.filename;
    }

    const newVision = new vision({ description, image });
    await newVision.save();
    res.status(201).json(newVision);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateVision = async (req, res) => {
  try {
    await connectMongodb();

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid Vision id' });
    }

    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updated = await vision.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ error: 'Vision not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
