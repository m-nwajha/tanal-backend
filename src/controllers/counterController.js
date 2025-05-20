import mongoose from 'mongoose';
import connectMongodb from '../config/mongodb.js';
import Counter from '../models/counter.js'

export const getAllCounters = async (req, res) => {
  try {
    await connectMongodb();
    const counters = await Counter.find();
    res.json(counters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


export const getCounterById = async (req, res) => {
  try {
    await connectMongodb();

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid Counter id' });
    }

    const counter = await Counter.findById(id);
    if (!counter) {
      return res.status(404).json({ error: 'Counter not found' });
    }

    res.status(200).json(counter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


export const createCounter = async (req, res) => {
  try {
    await connectMongodb();

    const { title, icon, amount } = req.body;

    const newCounter = new Counter({ title, icon, amount });
    await newCounter.save();

    res.status(201).json(newCounter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


export const updateCounter = async (req, res) => {
  try {
    await connectMongodb();

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid counter id' });
    }

    const updateData = { ...req.body };

    const updated = await Counter.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ error: 'Counter not found' });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};



export const deleteCounter = async (req, res) => {
  try {
    await connectMongodb();

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid counter id' });
    }

    const deleted = await Counter.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Counter not found' });
    }

    res.json({ message: 'Counter deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

