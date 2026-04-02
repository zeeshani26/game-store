import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Load from "../components/Load";
import FormContainer from "../components/FormContainer";
import {
  listProductDetails,
  updateProduct,
  createProduct,
} from "../actions/productActions";
import {
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_RESET,
  PRODUCT_DETAILS_RESET,
} from "../constants/productContants";

const ProductEditPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isNew = productId === "new";

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [publisher, setPublisher] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = productCreate;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
  }, [dispatch, productId]);

  useEffect(() => {
    if (!isNew) return;
    dispatch({ type: PRODUCT_DETAILS_RESET });
    setName("");
    setPrice(0);
    setImage("");
    setPublisher("");
    setCategory("");
    setCountInStock("");
    setDescription("");
  }, [dispatch, isNew, productId]);

  useEffect(() => {
    if (isNew || !successCreate) return;
    dispatch({ type: PRODUCT_CREATE_RESET });
    navigate("/admin/productlist");
  }, [isNew, successCreate, dispatch, navigate]);

  useEffect(() => {
    if (isNew) return;
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin/productlist");
      dispatch(listProductDetails(productId));
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setPublisher(product.publisher);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, productId, product, navigate, successUpdate, isNew]);

  const submitHandler = (e) => {
    e.preventDefault();
    const trimmed = String(name || "").trim();
    if (!trimmed) {
      return;
    }
    if (isNew) {
      dispatch(
        createProduct({
          name: trimmed,
          price: Number(price),
          image,
          publisher,
          category,
          countInStock,
          description,
        })
      );
    } else {
      dispatch(
        updateProduct({
          _id: productId,
          name: trimmed,
          price,
          image,
          publisher,
          category,
          countInStock,
          description,
        })
      );
    }
  };

  const showFormLoader = !isNew && loading;

  return (
    <>
      <Link
        to="/admin/productlist"
        className="btn btn-outline-store mb-4 d-inline-flex align-items-center gap-2"
      >
        ← Back to products
      </Link>
      <FormContainer wide>
        <h1 className="section-heading mb-4">
          {isNew ? "Create product" : "Edit product"}
        </h1>
        {(loadingCreate || loadingUpdate) && <Load />}
        {errorCreate && <Message variant="danger">{errorCreate}</Message>}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {showFormLoader ? (
          <Load />
        ) : error && !isNew ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="price" className="mb-3">
              <Form.Label>Price ($)</Form.Label>
              <Form.Control
                type="number"
                min="0"
                step="0.01"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="image" className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="https://… or /images/…"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="publisher" className="mb-3">
              <Form.Label>Publisher</Form.Label>
              <Form.Control
                type="text"
                placeholder="Publisher"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="category" className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="CountInStock" className="mb-3">
              <Form.Label>Stock count</Form.Label>
              <Form.Control
                type="number"
                min="0"
                placeholder="Units in stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="description" className="mb-4">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Button
              type="submit"
              className="btn-store-primary w-100 py-2"
              disabled={loadingCreate || loadingUpdate}
            >
              {isNew ? "Create product" : "Save product"}
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditPage;
