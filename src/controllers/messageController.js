import mongoose from 'mongoose';
import connectMongodb from '../config/mongodb.js';
import message from '../models/message.js';

export const getMessage = async (req, res) => {
  try {
    await connectMongodb();
    const items = await message.find();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const createMessage = async (req, res) => {
  try {
    await connectMongodb();

    const { description } = req.body;
    let image = null;

    if (req.file) {
      image = req.file.filename;
    }

    const newMessage = new message({ description, image });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateMessage = async (req, res) => {
  try {
    await connectMongodb();

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid message id' });
    }

    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updated = await message.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ error: 'message not found' });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
