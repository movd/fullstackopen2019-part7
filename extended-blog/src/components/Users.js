import React, { useEffect } from "react";
import { connect } from "react-redux";
import { initializeUsers } from "../reducers/usersReducers";
import { Link } from "react-router-dom";
const Users = props => {
  const initUsers = props.initializeUsers;
  useEffect(() => {
    initUsers();
  }, [initUsers]);

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
              <td>
                <Link to={`/users/${u.id}`}>{u.name}</Link>
              </td>
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
