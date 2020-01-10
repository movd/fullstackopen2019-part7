import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import NewBlogForm from "./NewBlogForm";
import Button from "@material-ui/core/Button";
import { useField } from "../hooks";
import {
  initializeBlogs,
  like,
  createBlog,
  removeBlog
} from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import Typography from "@material-ui/core/Typography";

const BlogList = props => {
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

  const renderBlogs = () => {
    const sortedBlogs = props.reduxBlogs.sort((a, b) => b.likes - a.likes);
    return (
      <div className="Blogs">
        {sortedBlogs.map(blog => (
          // <Blog
          //   key={blog.id}
          //   blog={blog}
          //   handLikeChange={() => handLikeChange(blog)}
          //   handleDeleteBlog={() => handleDeleteBlog(blog)}
          // />

          <p key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author}
          </p>
        ))}
      </div>
    );
  };
  return (
    <div className="BlogList">
      <div>
        <Typography
          component="h1"
          variant="h2"
          align="left"
          color="textPrimary"
          gutterBottom
        >
          blogs
        </Typography>
        {visibilityNewBlogForm ? (
          <div>
            <NewBlogForm
              handleNewBlog={handleNewBlog}
              title={title}
              author={author}
              url={url}
            />
            <p>
              <Button onClick={toggleVisibilityChange}>cancel</Button>
            </p>
          </div>
        ) : (
          <p>
            <Button onClick={toggleVisibilityChange}>new blog</Button>
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
