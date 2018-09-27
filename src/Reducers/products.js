import {
  ADD_PRODUCT_ERROR,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_REQUEST,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_REQUEST,
} from '../actions/product';

const initialState = {
  userProducts: null,
  loading: false,
  error: null,
};

export default function productReducer(state = initialState, action) {
  if (action.type === ADD_PRODUCT_REQUEST) {
    return ({
      ...state,
      loading: true,
      error: null,
    });
  }
  if (action.type === ADD_PRODUCT_SUCCESS) {
    return ({
      ...state,
      loading: false,
      error: null,
      userProducts: action.data,
    });
  }
  if (action.type === ADD_PRODUCT_ERROR) {
    return ({
      ...state,
      loading: false,
      error: action.error,
    });
  }
  if (action.type === FETCH_PRODUCTS_SUCCESS) {
    return ({
      ...state,
      loading: false,
      error: null,
      userProducts: action.data,
    });
  }
  if (action.type === FETCH_PRODUCTS_ERROR) {
    return ({
      ...state,
      loading: false,
      error: action.error,
    });
  }
  if (action.type === FETCH_PRODUCTS_REQUEST) {
    return ({
      ...state,
      loading: true,
      error: null,
    });
  }
  return state;
}
