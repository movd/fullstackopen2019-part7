import React from "react";
import { connect } from "react-redux";
import { logout } from "../reducers/userReducer";
import { Link } from "react-router-dom";
import "./NavBar.css";
const NavBar = props => {
  return (
    <div className="NavBar">
      <span>
        <Link to="/blogs">blogs</Link>
      </span>
      <span>
        <Link to="/users">users</Link>
      </span>
      {props.reduxUser !== null ? (
        <span>
          {props.reduxUser.name} logged in{" "}
          <button onClick={() => props.logout()}>logout</button>
        </span>
      ) : null}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    reduxUser: state.user
  };
};

export default connect(mapStateToProps, {
  logout
})(NavBar);
