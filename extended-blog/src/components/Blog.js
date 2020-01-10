import React from "react";
import Button from "@material-ui/core/Button";
const Blog = ({ blog, handLikeChange, handleDeleteBlog }) => {
  const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");

  const blogDetails = (
    <div className="blog-details">
      <div>
        {blog.likes} likes <Button onClick={handLikeChange}>like</Button>
      </div>
      <div>added by {blog.user[0].name}</div>
      {JSON.parse(loggedUserJSON).username === blog.user[0].username &&
      handleDeleteBlog ? (
        <Button onClick={handleDeleteBlog}>remove</Button>
      ) : null}
      <h3>Comments</h3>
      {blog.comments.map(c => (
        <p>{c.comment}</p>
      ))}
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
