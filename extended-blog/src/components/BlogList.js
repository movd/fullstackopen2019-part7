import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Blog from "./Blog";
import NewBlogForm from "./NewBlogForm";
import { useField } from "../hooks";
import {
  initializeBlogs,
  like,
  createBlog,
  removeBlog
} from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const BlogList = props => {
  // Store blogs to Redux Store
  const initBlogs = props.initializeBlogs;
  useEffect(() => {
    initBlogs();
    setIsLoading(false);
  }, [initBlogs]);

  const [isLoading, setIsLoading] = useState(true);
  const [visibilityNewBlogForm, setVisibilityNewBlogForm] = useState(false);
  // Custom Hooks:
  const [title, resetTitle] = useField("text");
  const [author, resetAuthor] = useField("text");
  const [url, resetUrl] = useField("text");

  const toggleVisibilityChange = () =>
    setVisibilityNewBlogForm(!visibilityNewBlogForm);

  const handleNewBlog = async event => {
    event.preventDefault();
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value
    };

    props.createBlog(
      {
        title: title.value,
        author: author.value,
        url: url.value
      },
      props.reduxUser.token
    );

    props.setNotification({
      type: "success",
      message: `A new Blog ${newBlog.title} by ${newBlog.author} added`,
      timeoutSeconds: 5
    });
    resetAuthor();
    resetTitle();
    resetUrl();
  };

  const handleDeleteBlog = async blog => {
    props.removeBlog(blog);
    window.confirm(`remove blog '${blog.title} by ${blog.author}`);
    props.setNotification({
      type: "success",
      message: `The Blog ${blog.title} by ${blog.author} has been deleted`,
      timeoutSeconds: 5
    });
  };

  const handLikeChange = async blog => {
    // Find Element Index in blogs array (state) by given id
    const idx = props.reduxBlogs.findIndex(b => b.id === blog.id);
    const blogToLike = props.reduxBlogs[idx];
    props.like(blogToLike);
  };

  const renderBlogs = () => {
    const sortedBlogs = props.reduxBlogs.sort((a, b) => b.likes - a.likes);
    return (
      <div className="Blogs">
        {sortedBlogs.map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            handLikeChange={() => handLikeChange(blog)}
            handleDeleteBlog={() => handleDeleteBlog(blog)}
          />
        ))}
      </div>
    );
  };
  return (
    <div className="BlogList">
      <div>
        <h2>Blogs</h2>
        {visibilityNewBlogForm ? (
          <div>
            <NewBlogForm
              handleNewBlog={handleNewBlog}
              title={title}
              author={author}
              url={url}
            />
            <p>
              <button onClick={toggleVisibilityChange}>cancel</button>
            </p>
          </div>
        ) : (
          <p>
            <button onClick={toggleVisibilityChange}>new blog</button>
          </p>
        )}
        {isLoading === true ? (
          <div>Loading...</div>
        ) : (
          <div>{renderBlogs()}</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    notification: state.notification,
    reduxBlogs: state.blogs,
    reduxUser: state.user
  };
};

export default connect(mapStateToProps, {
  setNotification,
  initializeBlogs,
  like,
  createBlog,
  removeBlog
})(BlogList);
