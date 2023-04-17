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
      setMessage("Passwords do not match !");
    } else {
      dispatch(register(name, email, password));
    }
  };
  console.log(error);
  return (
    <FormContainer>
      <h2>Sign Up</h2>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant={"danger"}>{error}</Message>}
      {loading && <Load />}
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="name">
          <FormLabel>Name</FormLabel>
          <FormControl
            type="text"
            value={name}
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
          ></FormControl>
        </FormGroup>
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
        <FormGroup controlId="confirmPassword">
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></FormControl>
        </FormGroup>
        <Button type="submit" variant="primary" className="mt-3">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Already Have an Account ?<Link to={"/login"}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterPage;
