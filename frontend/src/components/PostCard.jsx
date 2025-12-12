import React from "react";
import "./PostCard.css";

export default function PostCard({ post }) {
  return (
    <div className="post-card">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-body">{post.content?.substring(0, 120)}...</p>
      <p className="post-date">
        📅 {new Date(post.createdAt).toLocaleDateString()}
      </p>

      <button className="read-more">Read More</button>
    </div>
  );
}
