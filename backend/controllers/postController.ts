// backend/controllers/postController.ts
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      include: { author: true, comments: true },
      orderBy: { createdAt: 'desc' },
    });
    res.send({posts})
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts, homie!', error });
  }
};

export const createPost = async (req: Request, res: Response) => {
  const { content, image, tags } = req.body;
  const authorId = req.user?.id;
  if (!authorId) {
    return res.status(400).json({ message: 'Author ID is required!' });
  }
  try {
    const post = await prisma.post.create({
      data: {
        content,
        image,
        tags: tags || [],
        authorId
      },
      include: { author: true },
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post, homie!', error });
  }
};

export const likePost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const userId = req.user?.id;
  try {
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) return res.status(404).json({ message: 'Post not found, homie!' });
    // Simple like system - add userId to a likes array or increment a counter
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { updatedAt: new Date() }, // Add like logic here if you extend schema
      include: { author: true },
    });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error liking post, homie!', error });
  }
};