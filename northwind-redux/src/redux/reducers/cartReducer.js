import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function cartReducer(state = initialState.cart, action) {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      var addedCartItem = state.find(cI => cI.product.id === action.payload.product.id);  
      if (addedCartItem) {
        var newState = state.map((cartItem) => {
          if (cartItem.product.id === addedCartItem.product.id) {
            return Object.assign({}, addedCartItem, {
              quantity: addedCartItem.quantity + 1,
            });
          }
          return cartItem;
        });

        return newState;
      } else {
        return [...state, { ...action.payload }];
      }
    case actionTypes.REMOVE_FROM_CART:
      var newState2 = state.filter(cI=>cI.product.id !== action.payload.product.id)
      return newState2;
    case actionTypes.DELETE_CART:
      return [];
    default:
      return state;
  }
}
