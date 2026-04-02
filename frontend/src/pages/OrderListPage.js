import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../actions/orderActions";
import Load from "../components/Load";
import Message from "../components/Message";
import { Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

const OrderListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, orders, error } = useSelector((state) => state.orderList);
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo, navigate]);

  return (
    <>
      <div className="admin-page-toolbar">
        <h1 className="section-heading mb-2">Orders</h1>
        <p className="text-muted small mb-0">
          Admin: view all customer orders and payment status.
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
                <th>User</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="text-break small">{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>

                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i
                        className="fas fa-times text-danger"
                        aria-label="Unpaid"
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
    </>
  );
};

export default OrderListPage;
