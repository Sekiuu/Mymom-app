import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { ResponseData } from '../types';

const postsRouter = express.Router();
const prisma = new PrismaClient();


// // GET /api/feeder-texts
// postsRouter.get('/feeder', async (req: Request, res: Response) => {
//   try {
//     const allposts = await prisma.posts.findMany({ where: { image: { not: null } } }); // model name from schema.prisma
//     const response: ResponseData = {
//       message: 'Feeder posts retrieved successfully',
//       data: allposts,
//       success: true
//     };
//     res.json(response);
//   } catch (err) {
//     console.error(err);
//     const response: ResponseData = {
//       message: 'Failed to retrieve feeder posts',
//       data: err,
//       success: false
//     };
//     res.status(500).json(response);
//   }
// });
// GET /api/posts
postsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const allposts = await prisma.posts.findMany(); // model name from schema.prisma
    const response: ResponseData = {
      message: 'posts retrieved successfully',
      data: allposts,
      success: true
    };
    res.json(response);
  } catch (err) {
    console.error(err);
    const response: ResponseData = {
      message: 'Failed to retrieve posts',
      data: err,
      success: false
    };
    res.status(500).json(response);
  }
});

// GET /api/posts/[id]
postsRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const post = await prisma.posts.findFirst({ where: { id: postId } }); // model name from schema.prisma
    const response: ResponseData = {
      message: 'posts retrieved successfully',
      data: post,
      success: true
    };
    res.json(response);
  } catch (err) {
    console.error(err);
    const response: ResponseData = {
      message: 'Failed to retrieve posts',
      data: err,
      success: false
    };
    res.status(500).json(response);
  }
});

// PUT /api/posts/[id]
postsRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const updatedPost = await prisma.posts.update({
      where: { id: postId },
      data: { ...req.body }
    });
    const response: ResponseData = {
      message: 'posts retrieved successfully',
      data: updatedPost,
      success: true
    };
    res.json(response);
  } catch (err) {
    console.error(err);
    const response: ResponseData = {
      message: 'Failed to retrieve posts',
      data: err,
      success: false
    };
    res.status(500).json(response);
  }
});

// DELETE /api/posts/[id]
postsRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    await prisma.posts.delete({ where: { id: postId } });
    const response: ResponseData = {
      message: 'Text deleted successfully', // You can customize the response message
      data: null,
      success: true
    };
    res.json(response);
  } catch (err) {
    console.error(err);
    const response: ResponseData = {
      message: 'Failed to delete text',
      data: err,
      success: false
    };
    res.status(500).json(response);
  }
});


// POST /api/posts
postsRouter.post('/', (req: Request, res: Response) => {
  const createPost = async (content : string, user_id : string, username : string, image_url : string) => {

    if (!content || !content.trim()) {
      const response: ResponseData = {
        message: 'Content is required',
        data: null,
        success: false
      };
      return res.status(400).json(response);
    }

    const newPost = await prisma.posts.create({
      data: {
        user_id: user_id || "",  // Use null instead of empty string
        content: content.trim(),
        username: username || "",
        image: image_url.trim() || null,
      }
    });
    const response: ResponseData = {
      message: 'Text created successfully',
      data: newPost,
      success: true
    };
    res.json(response);
  };
  try {
    if (req.body.length > 1) {
      const posts = req.body;
      for (const post of posts) {
        createPost(post.content, post.user_id, post.username, post.image);
      }
    }
    else {
      const { content, user_id, username, image } = req.body;
      createPost(content, user_id, username, image);
    }
  } catch (err) {
    console.error(err);
    const response: ResponseData = {
      message: 'Failed to create text',
      data: err,
      success: false
    };
    res.status(500).json(response);
  }
});

export default postsRouter;