import { posts } from "@/data/blogs";

import { Link } from "react-router-dom";
import React from "react";

const LatestPost = () => {
  

  return (
    <div className="sidebar-widget mb30">
      <h6 className="widget-title">Latest Posts</h6>
      {posts.map((post, index) => (
        <div
          className="list-news-style d-flex align-items-center mt20 mb20"
          key={index}
        >
          <div className="news-img flex-shrink-0">
            <img  src={post.image} alt="blog" />
          </div>
          <div className="news-content flex-shrink-1 ms-3">
            <p className="new-text mb0 fz14">
              <Link to={`/blogs/${post.id}`}>{post.content}</Link>
            </p>
            <a className="body-light-color" href="#">
              {post.date.day}{' '}{post.date.month}, {' '}{post.date.year}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LatestPost;
