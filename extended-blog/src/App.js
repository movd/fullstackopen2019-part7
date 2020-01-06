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

const App = props => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
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
    try {
      const addedBlog = await blogsService.create(
        {
          title: title.value,
          author: author.value,
          url: url.value
        },
        user.token
      );
      // Add 'user' object so that Blog compoent gets user directly after its added to state
      setBlogs(blogs.concat({ ...addedBlog, user: [user] }));
      props.setNotification({
        type: "success",
        message: `A new Blog ${addedBlog.title} by ${addedBlog.author} added`,
        timeoutSeconds: 5
      });
      resetAuthor();
      resetTitle();
      resetUrl();
    } catch (error) {
      if (error.response.data.error) {
        props.setNotification({
          type: "error",
          message: error.response.data.error,
          timeoutSeconds: 5
        });
      } else {
        props.setNotification({
          type: "error",
          message: error.message,
          timeoutSeconds: 5
        });
      }
    }
  };

  const handleDeleteBlog = async blog => {
    window.confirm(`remove blog '${blog.title} by ${blog.author}`);
    const idx = blogs.findIndex(b => b.id === blog.id);
    let newBlogs = [...blogs];
    newBlogs.splice(idx, 1);
    try {
      await blogsService.remove(blog);
      setBlogs(newBlogs);
      props.setNotification({
        type: "success",
        message: `The Blog ${blog.title} by ${blog.author} has been deleted`,
        timeoutSeconds: 5
      });
    } catch (error) {
      props.setNotification({
        type: "error",
        message: error.message
      });
    }
  };

  // Only GET blogs when compontents mounts or 'user' state
  useEffect(() => {
    if (user) {
      setIsLoading(true);
      getBlogs();
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogsService.setToken(user.token);
    }
  }, []);

  const getBlogs = async () => {
    const unsortedBlogs = await blogsService.getAll();
    const sortedBlogs = unsortedBlogs.sort((a, b) => b.likes - a.likes);
    //
    setBlogs(sortedBlogs);
  };

  const handLikeChange = async blog => {
    // Find Element Index in blogs array (state) by given id
    const idx = blogs.findIndex(b => b.id === blog.id);
    // Create copy of blogs
    let newBlogs = [...blogs];
    // 1 up for likes
    const newLikes = blogs[idx].likes + 1;
    // Update copy of blogs
    newBlogs[idx] = { ...blogs[idx], likes: newLikes };
    // Set the updated as the state
    await blogsService.like(newBlogs[idx].id, newBlogs[idx]);
    // Sort by likes
    newBlogs.sort((a, b) => b.likes - a.likes);
    setBlogs(newBlogs);
  };

  const renderBlogs = () => {
    return (
      <div className="Blogs">
        {blogs.map(blog => (
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
  return {
    notification: state.notification
  };
};

export default connect(mapStateToProps, { setNotification })(App);
