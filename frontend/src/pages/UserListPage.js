import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../actions/userActions";
import Load from "../components/Load";
import Message from "../components/Message";
import { Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

const UserListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, users } = useSelector((state) => state.userList);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success: successDelete } = useSelector((state) => state.userDelete);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo, navigate, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <div className="admin-page-toolbar">
        <h1 className="section-heading mb-2">Users</h1>
        <p className="text-muted small mb-0">
          Admin: manage registered accounts and roles.
        </p>
      </div>
      {loading ? (
        <Load />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="table-responsive rounded-3 shadow-sm border bg-white">
          <Table
            striped
            hover
            responsive
            bordered
            className="store-table table-sm mb-0"
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Admin</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="text-break small">{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className="fas fa-check text-success"
                        aria-label="Yes"
                      />
                    ) : (
                      <i className="fas fa-times text-danger" aria-label="No" />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="btn-outline-store me-1"
                      >
                        <i className="fas fa-edit" aria-hidden />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => deleteHandler(user._id)}
                      aria-label="Delete user"
                    >
                      <i className="fas fa-trash" aria-hidden />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
};

export default UserListPage;
