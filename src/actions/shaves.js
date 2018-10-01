/* eslint-env browser */
import { API_BASE_URL } from '../config';

export const GET_SHAVES_REQUEST = 'GET_SHAVES_REQUEST';
export const getShavesRequest = () => ({
  type: GET_SHAVES_REQUEST,
});

export const GET_SHAVES_SUCCESS = 'GET_SHAVES_SUCCESS';
export const getShavesSuccess = shaveHistory => ({
  type: GET_SHAVES_SUCCESS,
  shaveHistory,
});

export const GET_SHAVES_ERROR = 'GET_SHAVES_ERROR';
export const getShavesError = error => ({
  type: GET_SHAVES_ERROR,
  error,
});

export const REMOVE_SHAVE = 'REMOVE_SHAVE';
export const removeShave = id => ({
  type: REMOVE_SHAVE,
  id,
});

export const ADD_SHAVE_SUCCESS = 'ADD_SHAVE_SUCCESS';
export const addShaveSuccess = data => ({
  type: ADD_SHAVE_SUCCESS,
  data,
});

export const ADD_SHAVE_ERROR = 'ADD_SHAVE_ERROR';
export const addShaveError = error => ({
  type: ADD_SHAVE_ERROR,
  error,
});

export const ADD_SHAVE_REQUEST = 'ADD_SHAVE_REQUEST';
export const addShaveRequest = () => ({
  type: ADD_SHAVE_REQUEST,
});

export const getShaves = () => (dispatch, getState) => {
  dispatch(getShavesRequest());
  const { authToken } = getState().auth;

  return fetch(`${API_BASE_URL}/shaves`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then((res) => {
      dispatch(getShavesSuccess(res));
    })
    .catch((err) => {
      dispatch(getShavesError(`Error: ${err}`));
    });
};

export const deleteShaves = id => (dispatch, getState) => {
  const { authToken } = getState().auth;

  return fetch(`${API_BASE_URL}/shaves/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return dispatch(removeShave(id));
    })
    .catch((err) => {
      console.error(err);
    });
};

export const addShave = shave => (dispatch, getState) => {
  dispatch(addShaveRequest());
  const { authToken } = getState().auth;
  return (
    fetch(`${API_BASE_URL}/shaves/`, {
      method: 'POST',
      headers: {
        // Provide our auth token as credentials
        Authorization: `Bearer ${authToken}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(shave),
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(res.statusText);
        }
        return res.json();
      })
      .then(data => dispatch(addShaveSuccess(data)))
      .catch(error => dispatch(getShavesError(`Error: ${error}`)))
  );
};
