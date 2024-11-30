

import { blogData } from "@/data/blogs";
import { Link } from "react-router-dom";

const Blog = () => {
 
  return (
    <>
      {blogData.map((item, index) => (
        <div className="blog-style1 large-size bgc-white" key={index}>
          <div className="blog-img">
            <img
              className="w-100 h-100 cover"
              src={item.image}
              alt="blog"
            />
          </div>
          <div className="blog-content pl30 pb20">
            <div className="date">
              <span className="month">{item.date.month}</span>
              <span className="day">{item.date.day}</span>
            </div>
            <a className="tag" href="#">
              {item.tag}
            </a>
            <h4 className="title mt-1 mb20">
              <Link to={`/blogs/${item.id}`}>{item.title}</Link>
            </h4>
            <p className="text">{item.text}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Blog;
