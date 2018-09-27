import {FETCH_REQUEST, FETCH_SUCCESS, FETCH_ERROR} from '../actions/get-collection';

const initialState = {
  products: [],
  loading: false,
  error: null
}

export function collectionReducer(state = initialState, action) {
  if (action.type === FETCH_REQUEST) {
    console.log('request being made')
    return {
      ...state,
      loading: true,
      error:null
    }
  }
  else if(action.type === FETCH_SUCCESS) {
    console.log('successful request,', action.data)
    return {
      ...state,
      loading: false,
      error: null,
      products: action.data
    }
  }
  else if (action.type === FETCH_ERROR) {
    console.log('Error with request')
    return {
      ...state,
      loading: false,
      error: action.err
    }
  }
  return state;
}