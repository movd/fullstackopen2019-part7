import React, { useEffect } from "react";
import { connect } from "react-redux";
import { initializeUsers } from "../reducers/usersReducers";
import { Redirect } from "react-router-dom";
const SingleUser = props => {
  const initUsers = props.initializeUsers;
  useEffect(() => {
    initUsers();
  }, [initUsers]);

  if (props.user === "not_found") {
    return <Redirect to="/users" />;
  }
  if (props.user === undefined) {
    return null;
  }

  return (
    <div className="Users">
      <h1>blogs</h1>
      <h2>{props.user.name}</h2>
      <p>added blogs</p>
      <ul>
        {props.user.blogs.map(b => (
          <li key={b.id}>
            <a href={b.url}>{b.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const userById = id => state.users.find(a => a.id === id);
  if (userById(ownProps.id) === undefined) {
    return {
      user: "not_found"
    };
  }
  return {
    user: userById(ownProps.id)
  };
};

export default connect(mapStateToProps, { initializeUsers })(SingleUser);
