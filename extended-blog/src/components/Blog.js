import React, { useState, useEffect } from "react";
import "./Blog.css";

const Blog = ({ blog, handLikeChange, handleDeleteBlog }) => {


  const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");

  const blogDetails = (
    <div className="blog-details">
      <div>
        {blog.likes} likes <button onClick={handLikeChange}>like</button>
      </div>
      <div>added by {blog.user[0].name}</div>
      {JSON.parse(loggedUserJSON).username === blog.user[0].username &&
      handleDeleteBlog ? (
        <button onClick={handleDeleteBlog}>remove</button>
      ) : null}
    </div>
  );

  return (
    <div className="Blog">
      <a title={blog.title} href={blog.url}>
        {blog.title}
      </a>{" "}
      by <span>{blog.author}</span>
      {blogDetails}
    </div>
  );
};

export default Blog;
