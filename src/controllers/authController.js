import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Auth from '../models/auth.js';
import connectMongodb from '../config/mongodb.js';


export const register = async (req, res) => {
  try {
    await connectMongodb();

    const { user, email, mobile, password } = req.body;

    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Auth({ user, email, mobile, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    newUser.token = token;
    await newUser.save();

    res.status(201).json({ ...newUser._doc, password: undefined });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const login = async (req, res) => {
  try {
    await connectMongodb();

    const { email, password } = req.body;
    const user = await Auth.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    user.token = token;
    await user.save();

    res.json({ ...user._doc, password: undefined });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// export const getProfile = async (req, res) => {
//   try {
//     await connectMongodb();
//     const user = await Auth.findById(req.user.id).select('-password');
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };
