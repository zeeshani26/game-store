import {
  PRODUCT_DETAILS_FAILED,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAILED,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productContants";

export const productListReducer = (
  state = { products: [], loading: false },
  { type, payload }
) => {
  switch (type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: payload };
    case PRODUCT_LIST_FAILED:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] }, loading: false },
  { type, payload }
) => {
  switch (type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: payload };
    case PRODUCT_DETAILS_FAILED:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
