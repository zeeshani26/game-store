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
    <div>
      <h2 className="section-heading text-center">Top rated picks</h2>
      <Carousel fade pause="hover" className="carousel carousel-store">
        {products.map((product) => (
          <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`} className="text-decoration-none">
              <div className="carousel-slide-media">
                <Image
                  src={product.image}
                  alt={product.name}
                  fluid
                  className="d-block"
                />
              </div>
              <Carousel.Caption className="carousel-caption">
                <h3>
                  {product.name} — ₹{product.price}
                </h3>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
