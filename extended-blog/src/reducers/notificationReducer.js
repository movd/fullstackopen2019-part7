const initialState = null;

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      const newState = action.data;
      return newState;
    default:
      return state;
  }
};

export default notificationReducer;

export const setNotification = ({ type, message, timeoutSeconds }) => {
  // console.log(
  //   "MESSAGE= ",
  //   message,
  //   "TIMEOUT= ",
  //   timeoutSeconds,
  //   "TYPE= ",
  //   type
  // );
  return async dispatch => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: { type, message }
    });
    setTimeout(() => {
      dispatch({
        type: "SET_NOTIFICATION",
        data: null
      });
    }, timeoutSeconds * 1000);
  };
};
