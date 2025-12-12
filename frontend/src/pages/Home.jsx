import React, { useEffect, useState } from "react";
import api from "../api/axios";
import PostCard from "../components/PostCard";
import ".Home.css";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async (search = "") => {
    try {
      const res = await api.get(`/posts?q=${encodeURIComponent(search)}`);
      const data = res.data?.data ?? res.data;
      setPosts(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load posts");
    }
  };

  const onSearch = (e) => {
    e.preventDefault();
    fetchPosts(q);
  };

  return (
    <div className="home-container">
      <h1 className="home-title">✨ All Posts</h1>

      <form onSubmit={onSearch} className="search-form">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search posts..."
          className="search-input"
        />
        <button className="search-btn">Search</button>
      </form>

      <div className="posts-grid">
        {posts.length === 0 ? (
          <p className="no-posts">No posts found.</p>
        ) : (
          posts.map((p) => <PostCard post={p} key={p._id} />)
        )}
      </div>
    </div>
  );
}
