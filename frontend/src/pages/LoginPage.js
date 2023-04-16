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
      <h2>Sign In </h2>
      {error && <Message>{error}</Message>}
      {loading && <Load />}
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="email">
          <FormLabel>Email Address</FormLabel>
          <FormControl
            type="text"
            value={email}
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            value={password}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          ></FormControl>
        </FormGroup>
        <Button type="submit" variant="primary" className="mt-3">
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer ? <Link to={"/register"}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginPage;
