import mongoose from 'mongoose';
const connectMongodb = () => {
    try {
        mongoose.connect(process.env.MONGODB_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

export default connectMongodb;