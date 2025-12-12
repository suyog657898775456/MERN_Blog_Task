import asyncHandler from "express-async-handler";
import Comment from "../models/Comment.js";

// Create comment
export const createComment = asyncHandler(async (req, res) => {
  const { post, user, content } = req.body;
  if (!post || !user || !content) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const comment = await Comment.create({ post, user, content });
  res.status(201).json(comment);
});

// Get comments for a post
export const getComments = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const comments = await Comment.find({ post: postId }).populate(
    "user",
    "username email"
  );
  res.json(comments);
});
