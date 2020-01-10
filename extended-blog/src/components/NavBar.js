import React from "react";
import { connect } from "react-redux";
import { logout } from "../reducers/userReducer";
import { Link as RouterLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";

import "./NavBar.css";
const useStyles = makeStyles(theme => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbar: {
    flexWrap: "wrap"
  },
  toolbarTitle: {
    flexGrow: 1
  },
  link: {
    margin: theme.spacing(1, 1.5)
  }
}));

const NavBar = props => {
  const classes = useStyles();

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <nav>
          <Link
            variant="button"
            color="textPrimary"
            component={RouterLink}
            to="/blogs"
            className={classes.link}
          >
            blogs
          </Link>
          <Link
            variant="button"
            color="textPrimary"
            component={RouterLink}
            to="/users"
            className={classes.link}
          >
            users
          </Link>
          {props.reduxUser !== null ? (
            <span>
              {props.reduxUser.name} logged in{" "}
              <Button onClick={() => props.logout()}>logout</Button>
            </span>
          ) : null}
        </nav>
      </Toolbar>
    </AppBar>
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
