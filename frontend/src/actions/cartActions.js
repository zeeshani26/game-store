import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  //getstate to get the state from redux
  try {
    const product = (await axios.get(`/api/products/${id}`)).data;
    const item = {
      name: product.name,
      qty: qty,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      product: product._id,
    };
    // DISPATCH AND SAVE TO LOCAL STORAGE
    dispatch({ type: CART_ADD_ITEM, payload: item });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    console.log(error);
  }
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: id });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
