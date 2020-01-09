import React, { useEffect } from "react";

import { connect } from "react-redux";
import Notification from "./components/Notification";
import { initializeUser } from "./reducers/userReducer";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import Users from "./components/Users";
import SingleUser from "./components/SingleUser";
import SingleBlog from "./components/SingleBlog";

// REACT ROUTER
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import LogOut from "./components/LogOut";

const BlogListWithHistory = withRouter(BlogList);

const App = props => {
  // Store user to redux store
  const initUser = props.initializeUser;
  useEffect(() => {
    initUser();
  }, [initUser]);

  return (
    <div className="App">
      <Notification />
      <LogOut />
      {props.reduxUser == null ? (
        <LoginForm />
      ) : (
        <Router>
          <Route exact path="/" render={() => <BlogListWithHistory />} />
          <Route exact path="/blogs" render={() => <BlogListWithHistory />} />

          <Route
            exact
            path="/blogs/:id"
            render={({ match }) => <SingleBlog id={match.params.id} />}
          />
          <Route exact path="/users" render={() => <Users />} />
          <Route
            exact
            path="/users/:id"
            render={({ match }) => <SingleUser id={match.params.id} />}
          />
        </Router>
      )}
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
