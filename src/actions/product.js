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

export const ADD_MANY_PRODUCTS_SUCCESS = 'ADD_MANY_PRODUCTS_SUCCESS';
export const addManyProductsSuccess = data => ({
  type: ADD_MANY_PRODUCTS_SUCCESS,
  data,
});

export const addManyProducts = products => (dispatch, getState) => {
  const { authToken } = getState().auth;
  return (
    fetch(`${API_BASE_URL}/products/personal/many`, {
      method: 'POST',
      headers: {
        // Provide our auth token as credentials
        Authorization: `Bearer ${authToken}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(products),
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      dispatch(addManyProductsSuccess(data));
      data.forEach(productRes => {
        if (productRes.status === 200) {
          dispatch(addProductSuccess(productRes.product));
        }
      })
    })
    // .catch(err => console.log(err))
  )
}

export const addProduct = (product, closeModal) => (dispatch, getState) => {
  dispatch(addProductRequest());

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
        if (!res.ok) {
          return res.json().then(res => Promise.reject(res));
        }
        return res.json();
      })
      .then((data) => {
        dispatch(addProductSuccess(data));
        closeModal();
      })
      .catch(error => { 
        dispatch(addProductError(error.message))
      })
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
  type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProducts = () => (dispatch, getState) => {
  dispatch(fetchProductsRequest());
  const { authToken } = getState().auth;
  return fetch(`${API_BASE_URL}/products/personal`, {
      method: 'GET',
      headers: {
        // Provide our auth token as credentials
        'content-type': 'application/json',
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
      .catch(err => dispatch(fetchProductsError(err)));
};

export const CLEAR_ERR = 'CLEAR_ERR';
export const clearErr = () => ({
  type: CLEAR_ERR,
})

export const CLEAR_ADD_MANY_RESPONSE = 'CLEAR_ADD_MANY_RESPONSE';
export const clearAddManyResponse = () => ({
  type: CLEAR_ADD_MANY_RESPONSE,
})