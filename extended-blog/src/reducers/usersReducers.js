import usersService from "../services/users";

const initialState = [];

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERS":
      return action.data;
    default:
      return state;
  }
};

export default usersReducer;

export const initializeUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll();
    dispatch({ type: "FETCH_USERS", data: users });
  };
};
