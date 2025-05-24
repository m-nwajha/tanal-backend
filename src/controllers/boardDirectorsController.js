import mongoose from 'mongoose';
import connectMongodb from '../config/mongodb.js';
import BoardDirectors from '../models/boardDirectors.js';

export const getAllBoardDirectors = async (req, res) => {
  try {
    await connectMongodb();
    const boardDirectors = await BoardDirectors.find();
    res.json(boardDirectors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getBoardDirectorsById = async (req, res) => {
  try {
    await connectMongodb();

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid boardDirectors id' });
    }

    const boardDirectors = await BoardDirectors.findById(req.params.id);
    if (!boardDirectors) {
      return res.status(404).json({ error: 'BoardDirectors not found' });
    }
    res.json(boardDirectors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const createBoardDirectors = async (req, res) => {
  try {
    await connectMongodb();

    const { name, jobTitle } = req.body;
    let image = null;

    if (req.file) {
      image = req.file.filename;
    }

    const newBoardDirectors = new BoardDirectors({ name, jobTitle, image });
    await newBoardDirectors.save();
    res.status(201).json(newBoardDirectors);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateBoardDirectors = async (req, res) => {
  try {
    await connectMongodb();

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid BoardDirectors id' });
    }

    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updated = await BoardDirectors.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    if (!updated) {
      return res.status(404).json({ error: 'BoardDirectors not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteBoardDirectors = async (req, res) => {
  try {
    await connectMongodb();

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid BoardDirectors id' });
    }

    const deleted = await BoardDirectors.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'BoardDirectors not found' });
    }
    res.json({ message: 'BoardDirectors deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
