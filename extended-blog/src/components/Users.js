import React, { useEffect } from "react";
import { connect } from "react-redux";
import { initializeUsers } from "../reducers/usersReducers";

const Users = props => {
  const initUsers = props.initializeUsers;
  useEffect(() => {
    initUsers();
  }, [initUsers]);

  // props.users.map(u => console.log(u.name, u.username, u.blogs.length));
  return (
    <div className="Users">
      <h1>blogs</h1>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map(u => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

export default connect(mapStateToProps, { initializeUsers })(Users);
