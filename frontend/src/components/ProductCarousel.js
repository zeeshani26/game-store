import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import { listTopProducts } from "../actions/productActions";
import Load from "./Load";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Load />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel fade pause="hover" className="carousel">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image
              src={product.image}
              alt={product.name}
              fluid
              className="d-block w-100"
            />
            <Carousel.Caption className="carousel-caption">
              <h3>
                {product.name} (₹{product.price})
              </h3>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
