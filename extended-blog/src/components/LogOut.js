import React from "react";
import { connect } from "react-redux";
import { logout } from "../reducers/userReducer";
const LogOut = props => {
  return (
    <div>
      {props.reduxUser !== null ? (
        <div>
          {props.reduxUser.name} logged in{" "}
          <button onClick={() => props.logout()}>logout</button>
        </div>
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
})(LogOut);
