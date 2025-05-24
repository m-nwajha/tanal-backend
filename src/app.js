import express from 'express';
import homeRoute from './routes/homeRoute.js';
import serviceRoutes from './routes/serviceRoutes.js'
import counterRoute from './routes/counterRoute.js';
import projectRoute from './routes/projectRoutes.js';
import reviewRoute from "./routes/reviewRoute.js"
import boardDirectorsRoute from './routes/boardDirectorsRoute.js';

const app = express();

app.use(express.json());
app.use('/api', homeRoute);
app.use('/api', serviceRoutes);
app.use('/api' , counterRoute);
app.use('/api', projectRoute);
app.use('/api', reviewRoute);
app.use('/api', boardDirectorsRoute);




export default app;
