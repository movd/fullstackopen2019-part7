import React, { useState, useEffect } from "react";
import loginService from "./services/login";
import blogsService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import Blog from "./components/Blog";
import NewBlogForm from "./components/NewBlogForm";
// TODO REDUX
import { connect } from "react-redux";
import Notification from "./components/Notification";
import { useField } from "./hooks";
import { setNotification } from "./reducers/notificationReducer";
import {
  initializeBlogs,
  like,
  createBlog,
  removeBlog
} from "./reducers/blogReducer";

const App = props => {
  // Store blogs to Redux Store
  const initBlogs = props.initializeBlogs;
  useEffect(() => {
    initBlogs();
    setIsLoading(false);
  }, [initBlogs]);

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [visibilityNewBlogForm, setVisibilityNewBlogForm] = useState(false);
  // Custom Hooks:
  const [username, resetUsername] = useField("text");
  const [password, resetPassword] = useField("password");
  const [title, resetTitle] = useField("text");
  const [author, resetAuthor] = useField("text");
  const [url, resetUrl] = useField("text");

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
      blogsService.setToken(user.token);
      resetUsername();
      resetPassword();
    } catch (exception) {
      props.setNotification({
        type: "error",
        message: "wrong username or password",
        timeoutSeconds: 5
      });
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

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
      user.token
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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogsService.setToken(user.token);
    }
  }, []);

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
    <div className="App">
      <Notification />
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
        />
      ) : (
        <div>
          <h2>Blogs</h2>
          <div>
            <p>
              {user.name} logged in{" "}
              <button onClick={handleLogout}>logout</button>
            </p>
          </div>
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
      )}
    </div>
  );
};

const mapStateToProps = state => {
  // log state for debugging
  console.log("### REDUX STATE :");
  console.log(state.blogs);
  // console.log(state.notification);
  return {
    notification: state.notification,
    reduxBlogs: state.blogs
  };
};

export default connect(mapStateToProps, {
  setNotification,
  initializeBlogs,
  like,
  createBlog,
  removeBlog
})(App);
