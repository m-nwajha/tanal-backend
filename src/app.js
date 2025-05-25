import express from 'express';
import fs from 'fs';
import path from 'path';

import homeRoute from './routes/homeRoute.js';
import serviceRoutes from './routes/serviceRoutes.js';
import counterRoute from './routes/counterRoute.js';
import projectRoute from './routes/projectRoutes.js';
import reviewRoute from "./routes/reviewRoute.js";
import boardDirectorsRoute from './routes/boardDirectorsRoute.js';
import contactRoute from './routes/contactRoute.js';
import contactInfoRoute from './routes/contactInfoRoute.js';
import betweenLinesRoute from './routes/betweenLinesRoute.js';

const app = express();

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

export default app;
