import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { useState, useEffect } from "react";
import Load from "../components/Load";
import { USER_UPDATE_PROFILE__RESET } from "../constants/userConstants";
import { listMyOrders } from "../actions/orderActions";

const ProfilePage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderMyList = useSelector((state) => state.orderMyList);
  const {
    loading: loadingOrderList,
    error: errorOrderList,
    orders,
  } = orderMyList;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE__RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, userInfo, user, navigate, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Row className="g-4">
      <Col lg={4}>
        <div className="profile-panel">
          <h1 className="section-heading h4 mb-3">Profile</h1>
          <p className="text-muted small mb-4">
            Update your name, email, or password. Leave password blank to keep
            the current one.
          </p>
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {success && (
            <Message variant="success">Profile updated successfully.</Message>
          )}
          {loading && <Load />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>New password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Leave blank to keep current"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="confirmPassword" className="mb-4">
              <Form.Label>Confirm new password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" className="btn-store-primary w-100 py-2">
              Update profile
            </Button>
          </Form>
        </div>
      </Col>
      <Col lg={8}>
        <h1 className="section-heading h4 mb-3">My orders</h1>
        {loadingOrderList ? (
          <Load />
        ) : errorOrderList ? (
          <Message variant="danger">{errorOrderList}</Message>
        ) : (
          <div className="table-responsive rounded-3 shadow-sm border bg-white">
            <Table
              striped
              hover
              responsive
              className="store-table table-sm mb-0"
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Delivered</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="text-break small">{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>₹{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times text-danger"
                          aria-label="Not paid"
                        />
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times text-danger"
                          aria-label="Not delivered"
                        />
                      )}
                    </td>
                    <td>
                      {order.isCancelled ? (
                        <span className="text-muted">Cancelled</span>
                      ) : order.isPaid ? (
                        order.isDelivered ? (
                          "Shipped"
                        ) : (
                          "Processing"
                        )
                      ) : (
                        "Awaiting payment"
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="btn-outline-store"
                        >
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default ProfilePage;
