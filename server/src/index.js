const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const port = process.env.PORT || 8000;
const prisma = new PrismaClient();
const usersRouter = require('./users.js');

app.use(express.json());
app.use('/api/users', usersRouter);

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