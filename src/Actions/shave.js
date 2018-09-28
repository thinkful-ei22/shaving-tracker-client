import { API_BASE_URL } from '../config';

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

export const addShave = shave => (dispatch, getState) => {
  const { authToken } = getState().authReducer;
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
      .then(res => res.json())
      .then(data => console.log(data))
  );
};
