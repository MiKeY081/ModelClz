import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a post
export const createPost = async (req: Request, res: Response) => {
  const { title, content, authorId } = req.body;
  try {
    const post = await prisma.post.create({
      data: { title, content, authorId },
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};

// Get all posts
export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

// Get a post by ID
export const getPostById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
};

// Update a post
export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updatedPost = await prisma.post.update({
      where: { id },
      data: { title, content },
    });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post' });
  }
};

// Delete a post
export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedPost = await prisma.post.delete({ where: { id } });
    res.json(deletedPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
};
