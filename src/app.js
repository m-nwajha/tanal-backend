import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

import homeRoute from './routes/homeRoute.js';
import serviceRoutes from './routes/serviceRoutes.js';
import counterRoute from './routes/counterRoute.js';
import projectRoute from './routes/projectRoutes.js';
import reviewRoute from "./routes/reviewRoute.js";
import boardDirectorsRoute from './routes/boardDirectorsRoute.js';
import contactRoute from './routes/contactRoute.js';
import contactInfoRoute from './routes/contactInfoRoute.js';
import betweenLinesRoute from './routes/betweenLinesRoute.js';
import whyTanalRoute from './routes/whyTanalRoute.js';
import visionRoute from './routes/visionRoute.js';
import messageRoute from './routes/messageRoute.js';
import goalsRoute from './routes/goalsRoute.js';
import clientsRoute from './routes/clientsRoute.js';
import requestRoute from './routes/requestRoute.js';
import authRoute from './routes/authRoute.js';



const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-api-key'],
  })
);

const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use('/uploads', express.static(uploadsDir));

app.use(express.json());

app.use('/api', homeRoute);
app.use('/api', serviceRoutes);
app.use('/api', counterRoute);
app.use('/api', projectRoute);
app.use('/api', reviewRoute);
app.use('/api', boardDirectorsRoute);
app.use('/api', contactRoute);
app.use('/api', contactInfoRoute);
app.use('/api', betweenLinesRoute);
app.use('/api', whyTanalRoute);
app.use('/api', visionRoute);
app.use('/api', messageRoute);
app.use('/api', goalsRoute);
app.use('/api', clientsRoute);
app.use('/api', requestRoute);
app.use('/api', authRoute);



export default app;
