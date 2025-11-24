import express from 'express';
import { PrismaClient } from '@prisma/client';
import usersRouter from './users';
import postsRouter from './posts';
import aiRouter from './ai';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 8000;
const prisma = new PrismaClient();


app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter); // Updated to match client route
app.use('/api/ai', aiRouter); // AI routes
app.get('/', (req, res) => {
  console.log(process.env.PORT, process.env.DB_URL);
  res.send('Hello, World!');
});

async function start() {
  try {
    await prisma.$connect();
    console.log('Connected to the database successfully.');
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error connecting to start server:', error);
    // process.exit(1);
  }
}

start();

