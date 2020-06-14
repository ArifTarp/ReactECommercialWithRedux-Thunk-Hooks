import * as actionTypes from "./actionTypes";

export function getProducts(categoryId) {
  return function (dispatch) {
    let url = "http://localhost:3000/products";

    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }

    return fetch(url)
      .then((response) => response.json())
      .then((data) => dispatch(getProductsSuccess(data)));
  };
}

export function getProductsSuccess(products) {
  return { type: actionTypes.GET_PRODUCTS_SUCCESS, payload: products };
}

export function saveProduct(product) {
  return function (dispatch) {
    return saveProductApi(product)
      .then((savedProduct) => {
        product.id
          ? dispatch(updateProductSuccess(savedProduct))
          : dispatch(createProductSuccess(savedProduct));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function saveProductApi(product) {
  return fetch("http://localhost:3000/products/" + (product.id || ""), {
    method: product.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(product),
  })
    .then(handleResponse)
    .catch(handleError);
}

export async function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }
  
  const error = await response.text();
  throw new Error(error);
}

export function handleError(error) {
  console.log("Something Went Wrong");
  throw error;
}

export function createProductSuccess(product) {
  return { type: actionTypes.CREATE_PRODUCT_SUCCESS, payload: product };
}

export function updateProductSuccess(product) {
  return { type: actionTypes.UPDATE_PRODUCT_SUCCESS, payload: product };
}

export function deleteProduct(product) {
  return function (dispatch) {
    return deleteProductApi(product)
      .then(
        dispatch(deleteProductSuccess(product))
      )
      .catch((error) => {
        throw error;
      });
  };
}

export function deleteProductApi(product) {
  return fetch("http://localhost:3000/products/" + (product.id || ""), {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(product),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteProductSuccess(product) {
  return { type: actionTypes.DELETE_PRODUCT_SUCCESS, payload: product };
}