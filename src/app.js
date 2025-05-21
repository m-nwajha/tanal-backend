import express from 'express';
import homeRoute from './routes/homeRoute.js';
import serviceRoutes from './routes/serviceRoutes.js'
import counterRoute from './routes/counterRoute.js';
import projectRoute from './routes/projectRoutes.js';


const app = express();

app.use(express.json());
app.use('/api', homeRoute);
app.use('/api', serviceRoutes);
app.use('/api' , counterRoute);
app.use('/api', projectRoute);


export default app;
