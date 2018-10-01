import {
  SET_AUTH_TOKEN,
  CLEAR_AUTH,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
  LOAD_AUTH_TOKEN,
} from '../actions/auth';

const initialState = {
  loggedIn: false,
  authToken: null, // authToken !== null does not mean it has been validated
  currentUser: null,
  loading: false,
  error: null,
};

export default function reducer(state = initialState, action) {
  if (action.type === LOAD_AUTH_TOKEN) {
    return Object.assign({}, state, {
      authToken: action.authToken,
    });
  } if (action.type === SET_AUTH_TOKEN) {
    return Object.assign({}, state, {
      authToken: action.authToken,
    });
  } if (action.type === CLEAR_AUTH) {
    return Object.assign({}, state, {
      authToken: null,
      currentUser: null,
      loggedIn: false,
    });
  } if (action.type === AUTH_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null,
    });
  } if (action.type === AUTH_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      currentUser: action.currentUser,
      loggedIn: true,
    });
  } if (action.type === AUTH_ERROR) {
    console.log(action.error);
    return Object.assign({}, state, {
      loading: false,
      error: action.error,
    });
  }
  return state;
}
