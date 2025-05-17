import express from 'express';
import homeRoute from './routes/homeRoute.js';
import apiRoutes from './routes/apiRoutes.js';

const app = express();

app.use('/api', homeRoute);
app.use('/api', apiRoutes);

export default app;
