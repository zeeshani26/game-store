import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import Load from "../components/Load";
import Message from "../components/Message";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <FormContainer>
      <h1 className="section-heading mb-4">Sign in</h1>
      <p className="text-muted small mb-4">
        Welcome back. Enter your credentials to access your account and
        orders.
      </p>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Load />}
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="email" className="mb-3">
          <FormLabel>Email address</FormLabel>
          <FormControl
            type="email"
            autoComplete="email"
            value={email}
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" className="mb-3">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            autoComplete="current-password"
            value={password}
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button type="submit" className="btn-store-primary w-100 mt-2 py-2">
          Sign in
        </Button>
      </Form>
      <Row className="mt-4">
        <Col className="text-center small text-muted">
          New customer?{" "}
          <Link to="/register">Create an account</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginPage;
