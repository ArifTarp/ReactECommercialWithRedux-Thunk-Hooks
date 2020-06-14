import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function deleteProductReducer(
  state = initialState.deletedProductList,
  action
) {
  switch (action.type) {
    case actionTypes.DELETE_PRODUCT_SUCCESS:
      return [...state, { ...action.payload }];
    default:
      return state;
  }
}
