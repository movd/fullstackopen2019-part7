import React from "react";
import { useField } from "../hooks";
import Button from "@material-ui/core/Button";
import blogsService from "../services/blogs";

const NewCommentForm = props => {
  const [comment, resetComment] = useField("text");

  const handleComment = async event => {
    event.preventDefault();
    await blogsService.createComment(props.blogId, {
      comment: comment.value
    });
  };

  return (
    <div className="NewComment">
      <form onSubmit={handleComment}>
        <div>
          comment
          <input {...comment} name="Comment" />
        </div>
        <Button type="submit">addComment</Button>
      </form>
    </div>
  );
};

export default NewCommentForm;
