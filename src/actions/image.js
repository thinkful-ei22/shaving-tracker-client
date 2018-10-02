/* eslint-env browser */
import { API_BASE_URL } from '../config';

export const ADD_IMAGE_SUCCESS = 'ADD_IMAGE_SUCCESS';
export const addImageSuccess = data => ({
  type: ADD_IMAGE_SUCCESS,
  data,
});

export const ADD_IMAGE_ERROR = 'ADD_IMAGE_ERROR';
export const addImageError = error => ({
  type: ADD_IMAGE_ERROR,
  error,
});

export const ADD_IMAGE_REQUEST = 'ADD_IMAGE_REQUEST';
export const addImageRequest = () => ({
  type: ADD_IMAGE_REQUEST,
});

export const addImage = file => (dispatch, getState) => (
  fetch(`${API_BASE_URL}/image/upload`, {
    method: 'POST',
    body: file,
  })
    .then((res) => {
      console.log(res);
    })
);
