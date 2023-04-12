import React from "react";
import Rating from "../components/Rating";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import products from "../product";
import { Link, useParams } from "react-router-dom";

const SingleProduct = () => {
  const { id } = useParams();
  const product = products.find((product) => product._id === id);
  console.log(product);

  return <div>SingleProduct {id}</div>;
};

export default SingleProduct;
