import mongoose from 'mongoose';
import connectMongodb from '../config/mongodb.js';
import goals from '../models/goals.js';

export const getAllGoals = async (req, res) => {
  try {
    await connectMongodb();
    const items = await goals.find();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getGoalById = async (req, res) => {
  try {
    await connectMongodb();

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid goal id' });
    }

    const item = await goals.findById(id);
    if (!item) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const createGoal = async (req, res) => {
  try {
    await connectMongodb();

    const { title, description, icon } = req.body;

    const newItem = new goals({ title, description, icon });
    await newItem.save();

    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateGoal = async (req, res) => {
  try {
    await connectMongodb();

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid goal id' });
    }

    const updateData = { ...req.body };

    const updated = await goals.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteGoal = async (req, res) => {
  try {
    await connectMongodb();

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid goal id' });
    }

    const deleted = await goals.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    res.json({ message: 'Goal deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
