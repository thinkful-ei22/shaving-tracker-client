/* eslint-env browser */
import { API_BASE_URL } from '../config';

export const FETCH_REQUEST = 'FETCH_REQUEST';
export const fetchRequest = () => ({
  type: FETCH_REQUEST,
});

export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const fetchSuccess = data => ({
  type: FETCH_SUCCESS,
  data,
});

export const FETCH_ERROR = 'FETCH_ERROR';
export const fetchError = err => ({
  type: FETCH_ERROR,
  err,
});


export const fetchCollection = () => (dispatch, getState) => {
  console.log('fetchCollection was called');
  dispatch(fetchRequest());
  const { authToken } = getState().auth;

  return fetch(`${API_BASE_URL}/products/personal`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return (res.json());
    })
    .then(products => dispatch(fetchSuccess(products)))
    .catch(err => dispatch(fetchError(err)));
};
