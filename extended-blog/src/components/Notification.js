import React from "react";
import "./Notification.css";
import { connect } from "react-redux";

const Notification = props => {
  return props.notification ? (
    <div className={`Notification ${props.notification.type}`}>
      {props.notification.message}
    </div>
  ) : null;
};

const mapStateToProps = state => {
  return {
    notification: state.notification
  };
};

export default connect(mapStateToProps)(Notification);
