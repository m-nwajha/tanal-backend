import mongoose from 'mongoose';
import connectMongodb from '../config/mongodb.js';
import Request from '../models/request.js';

export const getAllRequests = async (req, res) => {
  try {
    await connectMongodb();
    const requests = await Request.find();
    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getRequestById = async (req, res) => {
  try {
    await connectMongodb();

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid request ID' });
    }

    const request = await Request.findById(id);
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const createRequest = async (req, res) => {
  try {
    await connectMongodb();

    const { type, text } = req.body;
    const file = req.file ? req.file.filename : null;

    if (!type) {
      return res.status(400).json({ error: 'type is required' });
    }

    const newRequest = new Request({ type, text, file });
    await newRequest.save();

    res.status(201).json(newRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateRequest = async (req, res) => {
  try {
    await connectMongodb();

    const { id } = req.params;
    const { type, text } = req.body;
    const file = req.file ? req.file.filename : undefined;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid request ID' });
    }

    const updateData = {
      ...(type && { type }),
      ...(text && { text }),
      ...(file && { file }),
    };

    const updated = await Request.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteRequest = async (req, res) => {
  try {
    await connectMongodb();

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid request ID' });
    }

    const deleted = await Request.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.json({ message: 'Request deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
