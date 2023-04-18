import {
  CART_ADD_ITEM,
  CART_CLEAR_ITEMS,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  { type, payload }
) => {
  switch (type) {
    case CART_ADD_ITEM: {
      const newItem = payload;

      // if newItem is already in the cartItems, then replace the old item with the new one
      // product in here is the product id
      const itemExists = state.cartItems.find(
        (currentItem) => currentItem.product === newItem.product
      );
      if (itemExists) {
        return {
          ...state,
          cartItems: [...state.cartItems].map((currentItem) =>
            currentItem.product === newItem.product ? newItem : currentItem
          ),
        };
      }

      return {
        ...state,
        cartItems: [...state.cartItems, newItem],
      };
    }
    case CART_REMOVE_ITEM: {
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.product !== payload),
      };
    }

    case CART_CLEAR_ITEMS: {
      return {
        ...state,
        cartItems: [],
      };
    }

    case CART_SAVE_SHIPPING_ADDRESS: {
      return {
        ...state,
        shippingAddress: payload,
      };
    }
    case CART_SAVE_PAYMENT_METHOD: {
      return {
        ...state,
        paymentMethod: payload,
      };
    }

    default:
      return state;
  }
};
