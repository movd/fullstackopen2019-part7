import React, { useEffect } from "react";

// TODO REDUX
import { connect } from "react-redux";
import Notification from "./components/Notification";
import { initializeUser } from "./reducers/userReducer";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";

const App = props => {
  // Store user to redux store
  const initUser = props.initializeUser;
  useEffect(() => {
    initUser();
  }, [initUser]);

  return (
    <div className="App">
      <Notification />
      {props.reduxUser === null ? <LoginForm /> : <BlogList />}
    </div>
  );
};

const mapStateToProps = state => {
  // log state for debugging
  console.log("### REDUX STATE :");
  console.log(state);
  return {
    reduxUser: state.user
  };
};

export default connect(mapStateToProps, { initializeUser })(App);
