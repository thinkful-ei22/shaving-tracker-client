/* eslint-env browser */
import { API_BASE_URL } from '../config';

export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const addProductSuccess = data => ({
  type: ADD_PRODUCT_SUCCESS,
  data,
});

export const ADD_PRODUCT_ERROR = 'ADD_PRODUCT_ERROR';
export const addProductError = error => ({
  type: ADD_PRODUCT_ERROR,
  error,
});

export const ADD_PRODUCT_REQUEST = 'ADD_PRODUCT_REQUEST';
export const addProductRequest = () => ({
  type: ADD_PRODUCT_REQUEST,
});

export const addProduct = product => (dispatch, getState) => {
  dispatch(addProductRequest());
  console.log(product);

  const { authToken } = getState().auth;
  return (
    fetch(`${API_BASE_URL}/products/personal`, {
      method: 'POST',
      headers: {
        // Provide our auth token as credentials
        Authorization: `Bearer ${authToken}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          return Promise.reject('Unable to reach server');
        }
        return res.json();
      })
      .then((data) => {
        dispatch(addProductSuccess(data));
      })
      .catch(error => dispatch(addProductError(error)))
  );
};

export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const fetchProductsSuccess = data => ({
  type: FETCH_PRODUCTS_SUCCESS,
  data,
});

export const FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCTS_ERROR';
export const fetchProductsError = error => ({
  type: FETCH_PRODUCTS_SUCCESS,
  error,
});

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_SUCCESS,
});

export const fetchProducts = () => (dispatch, getState) => {
  dispatch(fetchProductsRequest());
  const { authToken } = getState().auth;
  return (
    fetch(`${API_BASE_URL}/products/personal`, {
      method: 'GET',
      headers: {
        // Provide our auth token as credentials
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject('Unable to reach server');
        }
        return res.json();
      })
      .then((data) => {
        dispatch(fetchProductsSuccess(data));
      })
      .catch(err => dispatch(fetchProductsError(err)))
  );
};
