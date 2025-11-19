// ...existing code...
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const usersRouter = express.Router();
const prisma = new PrismaClient();

// GET /api/users
usersRouter.get('/', async (req, res) => {
  try {
    const allUsers = await prisma.users.findMany(); // model name from schema.prisma
    res.json(allUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = usersRouter;