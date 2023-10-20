import express from 'express';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';
import {
  errorHandler,
  notFound,
} from '../backend/middleware/errorMiddleware.js';
import dbConnect from './config/db.js';
dotenv.config();

dbConnect();

const port = process.env.PORT || 7000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Server is ready');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
