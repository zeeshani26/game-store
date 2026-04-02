import React, { useEffect, useMemo } from "react";
import { Col, Row, Form } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Load from "../components/Load";
import Message from "../components/Message";
import { Link, useParams, useNavigate, useSearchParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import RecentlyViewed from "../components/RecentlyViewed";
import { buildCategoryFilterOptions } from "../utils/categoryOptions";
import { filterProductsByCategory } from "../utils/filterProductsByCategory";
import { sortProductsList } from "../utils/sortProductsList";

const HomePage = () => {
  const { query, pageNumber } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";
  const page = Number(pageNumber) || 1;

  useEffect(() => {
    dispatch(listProducts(query || "", page, category, sort));
  }, [dispatch, query, page, category, sort]);

  useEffect(() => {
    if (!category || page <= 1) return;
    const qs = searchParams.toString();
    const suffix = qs ? `?${qs}` : "";
    if (query) {
      navigate(`/search/${query}/page/1${suffix}`, { replace: true });
    } else {
      navigate(`/page/1${suffix}`, { replace: true });
    }
  }, [category, page, query, searchParams, navigate]);

  const productList = useSelector((state) => state.productList);
  const {
    loading,
    error,
    products,
    page: currentPage,
    pages,
    categories: categoriesFromList,
  } = productList;

  const categoryOptions = useMemo(
    () => buildCategoryFilterOptions(categoriesFromList, products),
    [categoriesFromList, products]
  );

  const displayProducts = useMemo(() => {
    const raw = products || [];
    const filtered = filterProductsByCategory(raw, category);
    return sortProductsList(filtered, sort);
  }, [products, category, sort]);

  const paginationPages = category ? 1 : pages || 1;
  const paginationPage = category ? 1 : currentPage || 1;

  const goToPageOne = (nextCategory, nextSort) => {
    const p = new URLSearchParams();
    if (nextCategory && nextCategory !== "all") p.set("category", nextCategory);
    if (nextSort) p.set("sort", nextSort);
    const suffix = p.toString() ? `?${p.toString()}` : "";
    if (query) {
      navigate(`/search/${query}/page/1${suffix}`);
    } else {
      navigate(`/page/1${suffix}`);
    }
  };

  return (
    <>
      {!query ? (
        <>
          <div className="hero-strip">
            <h1>New releases &amp; essential buys</h1>
            <p>
              Browse top-rated titles, read real reviews, and checkout securely.
              Your next adventure starts here.
            </p>
          </div>
          <ProductCarousel />
          <RecentlyViewed />
          <h2 className="section-heading">Featured catalog</h2>
        </>
      ) : (
        <>
          <div className="d-flex align-items-center gap-3 mb-4 flex-wrap">
            <h1 className="section-heading mb-0">Search results</h1>
            <Link to="/" className="btn btn-outline-store btn-sm">
              ← Back to home
            </Link>
          </div>
        </>
      )}

      <Row className="align-items-end g-3 mb-4 catalog-filters">
        <Col xs={12} md={4}>
          <Form.Label className="small fw-semibold text-muted mb-1">
            Category
          </Form.Label>
          <Form.Select
            value={category || "all"}
            onChange={(e) => {
              const v = e.target.value;
              goToPageOne(v === "all" ? "" : v, sort);
            }}
            aria-label="Filter by category"
          >
            <option value="all">All categories</option>
            {categoryOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col xs={12} md={4}>
          <Form.Label className="small fw-semibold text-muted mb-1">
            Sort by
          </Form.Label>
          <Form.Select
            value={sort || "default"}
            onChange={(e) => {
              const v = e.target.value;
              goToPageOne(category, v === "default" ? "" : v);
            }}
            aria-label="Sort products"
          >
            <option value="default">Newest first</option>
            <option value="price_asc">Price: low to high</option>
            <option value="price_desc">Price: high to low</option>
            <option value="rating">Top rated</option>
            <option value="name">Name (A–Z)</option>
          </Form.Select>
        </Col>
      </Row>

      {loading ? (
        <Load />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {displayProducts.map((el) => (
              <Col key={el._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={el} />
              </Col>
            ))}
          </Row>
          <div className="pagination pagination-store">
            <Paginate
              pages={paginationPages}
              page={paginationPage}
              keyword={query ? query : ""}
            />
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;
