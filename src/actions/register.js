/* eslint-env browser */
import { API_BASE_URL } from '../config';
import { login } from './auth';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const registerRequest = () => ({
  type: REGISTER_REQUEST,
});

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const registerSuccess = data => ({
  type: REGISTER_SUCCESS,
  data,
});

export const REGISTER_ERROR = 'REGISTER_ERROR';
export const registerError = err => ({
  type: REGISTER_ERROR,
  err,
});

export const registerUser = data => (dispatch) => {
  dispatch(registerRequest());

  return fetch(`${API_BASE_URL}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then(err => Promise.reject(err));
      }
      return (res.json());
    })
    .then(() => dispatch(login(data)))
    .catch(err => dispatch(registerError(err)));
};
