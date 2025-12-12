import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/posts", { title, content });
      alert("Post created");
      navigate(`/posts/${res.data._id ?? res.data.id ?? ""}`);
    } catch (err) {
      console.error(err);
      alert("Failed to create post");
    }
  };

  return (
    <div>
      <h1>Create Post</h1>
      <form onSubmit={submit} className="form">
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}
