import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';


export default function Nav({ posts }) {
    return (
        <div>
        <nav>
            <img src="https://dev-the-tremendous-journey.pantheonsite.io/wp-content/uploads/2023/12/logo.png" alt="logo" />
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <Link to={`/${post.title.rendered}`}>{post.title.rendered}</Link>
              </li>
            ))}
          </ul>
        </nav>
        </div>
    );
};

