import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Pages.css";
import { fetchPosts } from "../services/posts";

export default function Pages({ posts }) {
  let { slug } = useParams();
  let post = posts.find((post) => post.title.rendered === slug);
  if(post== undefined){
    const post = fetchPosts
  }

  useEffect(() => {
  }, []);

  return (
<div>
  {post ? (
    <div
      className="blog-content"
      dangerouslySetInnerHTML={{ __html: post.content.rendered }}
    />
  ) : (
    <p>Loading...</p>
  )}
</div>
  );
  }