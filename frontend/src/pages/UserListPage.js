import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../actions/userActions";
import Load from "../components/Load";
import Message from "../components/Message";
import { Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const UserListPage = () => {
  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state) => state.userList);

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);
  const deleteHandler = (id) => {
    console.log("Del");
  };
  return (
    <>
      <h2>Users</h2>
      {loading ? (
        <Load />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped hover responsive bordered className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.admin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}{" "}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListPage;
