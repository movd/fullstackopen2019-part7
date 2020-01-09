import React, { useEffect } from "react";
import { connect } from "react-redux";
import { initializeBlogs, like } from "../reducers/blogReducer";
import { Redirect } from "react-router-dom";
import Blog from "./Blog";

const SingleBlog = props => {
  const initBlogs = props.initializeBlogs;

  useEffect(() => {
    initBlogs();
  }, [initBlogs]);
  console.log(props);
  if (props.blog === "not_found") {
    return <Redirect to="/blogs" />;
  }

  if (props.blog === undefined) {
    return null;
  }

  if (props.blog.title) {
    return (
      <div className="SingleBlog">
        <h1>Single Blog</h1>
        <Blog
          key={props.blog.id}
          blog={props.blog}
          handLikeChange={() => props.like(props.blog)}
        />
      </div>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state, ownProps) => {
  const blogById = id => state.blogs.find(a => a.id === id);
  if (blogById(ownProps.id) === undefined) {
    return {
      user: "not_found"
    };
  }
  return {
    blog: blogById(ownProps.id)
  };
};

export default connect(mapStateToProps, { like, initializeBlogs })(SingleBlog);
