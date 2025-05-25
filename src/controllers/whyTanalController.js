import mongoose from 'mongoose';
import connectMongodb from '../config/mongodb.js';
import whyTanal from '../models/whyTanal.js';

export const getAllWhyTanal = async (req, res) => {
  try {
    await connectMongodb();
    const items = await whyTanal.find();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getWhyTanalById = async (req, res) => {
  try {
    await connectMongodb();

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid whyTanal id' });
    }

    const item = await whyTanal.findById(id);
    if (!item) {
      return res.status(404).json({ error: 'whyTanal not found' });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const createWhyTanal = async (req, res) => {
  try {
    await connectMongodb();

    const {title, description, icon} = req.body;

    const newItem = new whyTanal({title, description, icon});
    await newItem.save();

    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateWhyTanal = async (req, res) => {
  try {
    await connectMongodb();

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid whyTanal id' });
    }

    const updateData = { ...req.body };

    const updated = await whyTanal.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    if (!updated) {
      return res.status(404).json({ error: 'whyTanal not found' });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteWhyTanal = async (req, res) => {
  try {
    await connectMongodb();

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid whyTanal id' });
    }

    const deleted = await whyTanal.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'whyTanal not found' });
    }

    res.json({ message: 'whyTanal deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
