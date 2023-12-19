import React, { useEffect, useState } from 'react';
import Pages from './components/Pages';
import Nav from './components/Nav';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { fetchPosts } from './services/posts';

export default function App() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
        const postData = await fetchPosts();
        setPosts(postData);
    };
    fetchData()
  }, [])

  return (
    <Router>
       <div>
       <Nav posts={posts} />
        <Routes>
          <Route path="/:slug" element={<Pages posts={posts} />} />
          <Route path="/" element={<Navigate to={`/Home`} />} />
        </Routes>
      </div>
    </Router>
  )
}