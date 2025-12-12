import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await api.get(`/posts/${id}`);
      // expected { post, comments } from backend getPostById
      if (res.data.post) {
        setPost(res.data.post);
        setComments(res.data.comments || []);
      } else {
        // fallback: if backend returns the post directly
        setPost(res.data);
        const r2 = await api.get(`/comments/${id}`);
        setComments(r2.data);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to fetch post");
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/comments/${id}`, { text });
      setComments((prev) => [res.data, ...prev]);
      setText("");
    } catch (err) {
      console.error(err);
      alert("Failed to add comment");
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p className="meta">by {post.author?.username || "Unknown"}</p>
      <div className="post-content">{post.content}</div>

      <section className="comments">
        <h2>Comments</h2>

        <form onSubmit={addComment} className="comment-form">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment..."
          />
          <button type="submit">Add Comment</button>
        </form>

        {comments.length === 0 ? (
          <p>No comments</p>
        ) : (
          <ul className="comment-list">
            {comments.map((c) => (
              <li key={c._id}>
                <strong>{c.user?.username || "Anonymous"}</strong> •{" "}
                {new Date(c.createdAt).toLocaleString()}
                <p>{c.text ?? c.content}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
