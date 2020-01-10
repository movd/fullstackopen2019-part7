import React from "react";
import { login } from "../reducers/userReducer";
import { connect } from "react-redux";
import { useField } from "../hooks";
import Button from "@material-ui/core/Button";
const LoginForm = props => {
  const [username, resetUsername] = useField("text");
  const [password, resetPassword] = useField("password");

  const handleLogin = async event => {
    event.preventDefault();
    resetPassword();
    resetUsername();
    try {
      props.login(username.value, password.value);
    } catch (exception) {
      props.setNotification({
        type: "error",
        message: "wrong username or password",
        timeoutSeconds: 5
      });
    }
  };

  return (
    <div className="LoginForm">
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input {...username} name="Username" />
        </div>
        <div>
          password
          <input {...password} autoComplete="on" />
        </div>
        <Button type="submit">login</Button>
      </form>
    </div>
  );
};

export default connect(null, { login })(LoginForm);
