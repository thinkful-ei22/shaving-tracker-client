import {API_BASE_URL} from '../config';

export const GET_SHAVES_REQUEST = 'GET_SHAVES_REQUEST';
export const getShavesRequest = () =>({
  type: GET_SHAVES_REQUEST
});

export const GET_SHAVES_SUCCESS = 'GET_SHAVES_SUCCESS';
export const getShavesSuccess = shaveHistory =>({
  type: GET_SHAVES_SUCCESS,
  shaveHistory
});

export const GET_SHAVES_ERROR = 'GET_SHAVES_ERROR';
export const getShavesError = () =>({
  type: GET_SHAVES_ERROR
});

export const getShaves = () => (dispatch, getState) => {
  console.log('BEGIN GET SHAVES');
  dispatch(getShavesRequest());
  const authToken = getState().authReducer.authToken;
  
  return fetch(`${API_BASE_URL}/shaves`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
    })
    .then(res =>{
      if(!res.ok){
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(res =>{
      console.log('GET shaves success', res);
      dispatch(getShavesSuccess(res));
    })
    .catch(err =>{
      console.log('Error:', err);
    });
};


