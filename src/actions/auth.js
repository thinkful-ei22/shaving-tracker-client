/* eslint-env browser */
import jwtDecode from 'jwt-decode';
import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const setAuthToken = authToken => ({
  type: SET_AUTH_TOKEN,
  authToken,
});

export const CLEAR_AUTH = 'CLEAR_AUTH';
export const clearAuth = () => ({
  type: CLEAR_AUTH,
});

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = () => ({
  type: AUTH_REQUEST,
});

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccess = currentUser => ({
  type: AUTH_SUCCESS,
  currentUser,
});

export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = error => ({
  type: AUTH_ERROR,
  error,
});

// Stores the auth token in state and localStorage, and decodes and stores
// the user data stored in the token
const storeAuthInfo = authToken => (dispatch) => {
  const decodedToken = jwtDecode(authToken);
  dispatch(setAuthToken(authToken));
  dispatch(authSuccess(decodedToken.user));
};

export const LOAD_AUTH_TOKEN = 'LOAD_AUTH_TOKEN';
export const loadAuthToken = () => ({
  type: LOAD_AUTH_TOKEN,
});

export const login = data => (dispatch) => {
  dispatch(authRequest());

  return fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => {
      return normalizeResponseErrors(res)
    })
    .then(res => res.json())
    .then(({ authToken }) => dispatch(storeAuthInfo(authToken)))
    .catch((err) => {
      const { status } = err;
      err.message = 
        status === 401 
          ? 'Incorrect username or password'
          : 'Unable to login, please try again';
      dispatch(authError(err));
    });
};

export const refreshAuthToken = () => (dispatch, getState) => {
  const { authToken } = getState().auth;
  dispatch(authRequest());

  return fetch(`${API_BASE_URL}/refresh`, {
    method: 'POST',
    headers: {
      // Provide our existing token as credentials to get a new one
      Authorization: `Bearer ${authToken}`,
    },
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(({ authToken }) => dispatch(storeAuthInfo(authToken))) // eslint-disable-line no-shadow
    .catch((err) => {
      // We couldn't get a refresh token because our current credentials
      // are invalid or expired, or something else went wrong, so clear
      // them and sign us out
      dispatch(authError(err));
      dispatch(clearAuth());
    });
};
