import {
  ADD_PRODUCT_ERROR,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_REQUEST,
  ADD_MANY_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_REQUEST,
  CLEAR_ERR,
  CLEAR_ADD_MANY_RESPONSE,
} from '../actions/product';

const initialState = {
  userProducts: [],
  loading: false,
  error: null,
  manyProductsResponse: [],
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
      userProducts: [...state.userProducts, action.data],
    });
  }
  if (action.type === ADD_PRODUCT_ERROR) {
    return ({
      ...state,
      loading: false,
      error: action.error,
    });
  }
  if (action.type === ADD_MANY_PRODUCTS_SUCCESS) {
    return ({
      ...state,
      manyProductsResponse: action.data,
    })
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
  if (action.type === CLEAR_ERR) {
    return ({
      ...state, 
      error: null,
      loading: false,
    })
  }
  if (action.type === CLEAR_ADD_MANY_RESPONSE) {
    return ({
      ...state,
      manyProductsResponse: [],
    })
  }
  return state;
}
