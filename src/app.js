import express from 'express';
import homeRoute from './routes/homeRoute.js';
import serviceRoutes from './routes/serviceRoutes.js'

const app = express();

app.use(express.json());
app.use('/api', homeRoute);
app.use('/api', serviceRoutes);


export default app;
