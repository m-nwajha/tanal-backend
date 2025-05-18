import connectMongodb from '../config/mongodb.js';
import Home from '../models/homeSchema.js';

export const getHomeData = async (req, res) => {
  try {
    await connectMongodb();

    const homeData = await Home.findOne();
    res.json(homeData);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};