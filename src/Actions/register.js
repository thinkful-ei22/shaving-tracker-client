import {API_BASE_URL} from '../config';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const registerRequest = () => ({
  type: REGISTER_REQUEST
})

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const registerSuccess = (data) => ({
  type: REGISTER_SUCCESS,
  data
})

export const REGISTER_ERROR = 'REGISTER_ERROR';
export const registerError = (err) => ({
  type: REGISTER_ERROR,
  err
})

export const registerUser = (data) => dispatch => {
  console.log('registerEvent was called');
  dispatch(registerRequest());
  fetch(`${API_BASE_URL}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)})
      .then(res => {
        if(!res.ok) {
          return Promise.reject(res.statusText)
        }
        return(res.json())
      })
      .then(results => dispatch(registerSuccess(results)))
      .catch(err => dispatch(registerError(err)))
}