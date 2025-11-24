import express from 'express';
import { PrismaClient } from '@prisma/client';
import { ResponseData } from '../types';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
const usersRouter = express.Router();
const prisma = new PrismaClient();

// GET /api/users
usersRouter.get('/', async (req: Request, res: Response) => {
  try {
    const allUsers = await prisma.users.findMany(); // model name from schema.prisma
    const response: ResponseData =
      {
        message: 'Users fetched successfully',
        data: allUsers,
        success: true
      }
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Failed to fetch users',
      data: err,
      success: false
    }
    );
  }
});

// POST /api/users/register - Register a new user
usersRouter.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({
        message: 'Email, password, and username are required',
        data: null,
        success: false
      });
    }

    // Check if user already exists
    const existingUser = await prisma.users.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'User with this email already exists',
        data: null,
        success: false
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        username
      }
    });

    // Don't send password back
    const { password: _, ...userWithoutPassword } = newUser;

    const response: ResponseData = {
      message: 'User registered successfully',
      data: userWithoutPassword,
      success: true
    };

    res.status(201).json(response);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      message: 'Failed to register user',
      data: err?.message || err,
      success: false
    });
  }
});

// POST /api/users/login - Login user
usersRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required',
        data: null,
        success: false
      });
    }

    // Find user
    const user = await prisma.users.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email',
        data: null,
        success: false
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        message: 'Invalid password',
        data: null,
        success: false
      });
    }

    // Don't send password back
    const { password: _, ...userWithoutPassword } = user;

    const response: ResponseData = {
      message: 'Login successful',
      data: userWithoutPassword,
      success: true
    };

    res.json(response);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      message: 'Failed to login',
      data: err?.message || err,
      success: false
    });
  }
});

export default usersRouter;