"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Post } from "../types";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Function to update username from localStorage
    const updateUsername = () => {
      const storedUsername = localStorage.getItem("username");
      setUsername(storedUsername);
    };

    // Set initial username
    updateUsername();

    // Fetch posts
    axios
      .get("http://127.0.0.1:8000/api/posts/")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });

    // Listen for auth changes (e.g., logout)
    window.addEventListener("authChange", updateUsername);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("authChange", updateUsername);
    };
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
      {username ? (
        <p className="mb-4 text-lg">Welcome, {username}!</p>
      ) : (
        <p className="mb-4 text-lg">Please log in to see your username.</p>
      )}
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="mb-6 p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p>{post.content}</p>
            <p className="text-gray-500 text-sm">
              {new Date(post.created_at).toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
