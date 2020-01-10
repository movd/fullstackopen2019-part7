import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

const NewBlogForm = ({ handleNewBlog, title, author, url }) => {
  return (
    <div className="NewBlogForm">
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          title:
          <input {...title} name="Title" />
        </div>
        <div>
          author:
          <input {...author} name="Author" />
        </div>
        <div>
          url:
          <input {...url} name="Url" />
        </div>
        <Button type="submit" id="create">
          create
        </Button>
      </form>
    </div>
  );
};

NewBlogForm.propTypes = {
  handleNewBlog: PropTypes.func.isRequired,
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired
};

export default NewBlogForm;
