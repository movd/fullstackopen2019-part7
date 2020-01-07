import loginService from "../services/login";
import blogsService from "../services/blogs";
const initialState = null;

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.data;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};

export default userReducer;

export const login = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username,
      password
    });
    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
    blogsService.setToken(user.token);
    dispatch({ type: "LOGIN", data: user });
  };
};

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch({ type: "LOGOUT" });
  };
};

export const initializeUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogsService.setToken(user.token);
      dispatch({ type: "LOGIN", data: user });
    }
  };
};
