import {API_BASE_URL} from '../config';

export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const addProductSuccess = (data) => ({
  type: ADD_PRODUCT_SUCCESS,
  data
});

export const ADD_PRODUCT_ERROR = 'ADD_PRODUCT_ERROR';
export const addProductError = (error) => ({
  type: ADD_PRODUCT_ERROR,
  error
});

export const ADD_PRODUCT_REQUEST = 'ADD_PRODUCT_REQUEST';
export const addProductRequest = () => ({
  type: ADD_PRODUCT_REQUEST
});

export const addProduct = product => (dispatch, getState) => {
  dispatch(addProductRequest());
  const authToken = getState().authReducer.authToken;
  return(
    fetch(`${API_BASE_URL}/products/personal`, {
      method: 'POST',
      headers: {
        // Provide our auth token as credentials
        Authorization: `Bearer ${authToken}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(res =>  res.json())
      // should we populate the products in userProducts?
      .then(data => dispatch(addProductSuccess(data)))
      .catch(err => dispatch(addProductError(err)))
  );
};