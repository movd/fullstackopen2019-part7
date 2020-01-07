import blogsService from "../services/blogs";

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_BLOG":
      console.log(action.data);
      return [...state, action.data];
    case "UPDATE_BLOGS":
      const id = action.data.id;
      // Return array of blogs where at the index of the changed the new one is inserted
      return state.map(a => (a.id !== id ? a : action.data));
    case "REMOVE_BLOG":
      console.log("ACTION DELETE: ", action.data);
      return state.filter(b => b.id !== action.data);
    case "INIT_BLOGS":
      return action.data;
    default:
      return state;
  }
};

export default blogReducer;

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll();
    dispatch({ type: "INIT_BLOGS", data: blogs });
  };
};

export const createBlog = (blogObject, token) => {
  return async dispatch => {
    const addedBlog = await blogsService.create(blogObject, token);
    dispatch({
      type: "NEW_BLOG",
      data: addedBlog
    });
  };
};

export const removeBlog = blogObject => {
  return async dispatch => {
    await blogsService.remove(blogObject);
    dispatch({
      type: "REMOVE_BLOG",
      data: blogObject.id
    });
  };
};

export const like = blogObject => {
  return async dispatch => {
    const newBlogObject = {
      ...blogObject,
      likes: blogObject.likes + 1
    };
    await blogsService.like(newBlogObject.id, newBlogObject);
    dispatch({
      type: "UPDATE_BLOGS",
      // Backend only returns ID of username thats why newBlogObject instead of return from service
      data: newBlogObject
    });
  };
};
