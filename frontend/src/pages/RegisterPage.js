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
import { register } from "../actions/userActions";
import Load from "../components/Load";
import Message from "../components/Message";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h1 className="section-heading mb-4">Create account</h1>
      <p className="text-muted small mb-4">
        Join The Game Store to track orders and checkout faster.
      </p>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Load />}
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="name" className="mb-3">
          <FormLabel>Name</FormLabel>
          <FormControl
            type="text"
            value={name}
            placeholder="Your name"
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
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
            autoComplete="new-password"
            value={password}
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" className="mb-3">
          <FormLabel>Confirm password</FormLabel>
          <FormControl
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            placeholder="••••••••"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormGroup>
        <Button type="submit" className="btn-store-primary w-100 mt-2 py-2">
          Register
        </Button>
      </Form>
      <Row className="mt-4">
        <Col className="text-center small text-muted">
          Already have an account? <Link to="/login">Sign in</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterPage;
