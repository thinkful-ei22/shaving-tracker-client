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

export const REMOVE_IMAGE_SUCCESS = 'REMOVE_IMAGE_SUCCESS';
export const removeImageSuccess = () => ({
  type: REMOVE_IMAGE_SUCCESS,
});
export const addImage = file => (dispatch, getState) => {
  dispatch(addImageRequest());
  return (
    fetch(`${API_BASE_URL}/image/upload`, {
      method: 'POST',
      body: file,
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((image) => {
        dispatch(addImageSuccess(image));
      })
      .catch(err => dispatch(addImageError(err)))
  );
};

export const removeImage = () => (dispatch) => {
  dispatch(removeImageSuccess());
};
