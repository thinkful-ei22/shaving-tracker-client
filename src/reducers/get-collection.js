import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_ERROR } from '../actions/get-collection';

const initialState = {
  products: [],
  loading: false,
  error: null,
};

export default function collectionReducer(state = initialState, action) {
  if (action.type === FETCH_REQUEST) {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }
  if (action.type === FETCH_SUCCESS) {
    return {
      ...state,
      loading: false,
      error: null,
      products: action.data,
    };
  }
  if (action.type === FETCH_ERROR) {
    return {
      ...state,
      loading: false,
      error: action.err,
    };
  }
  return state;
}
