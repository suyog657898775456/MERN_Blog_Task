import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";

// Create post
export const createPost = asyncHandler(async (req, res) => {
  const { user, title, content } = req.body;
  if (!user || !title || !content) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const post = await Post.create({ user, title, content });
  res.status(201).json(post);
});

// Get all posts
export const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().populate("user", "username email");
  res.json(posts);
});
