/* eslint-env browser */
/* eslint-disable no-param-reassign */
import { LOAD_AUTH_TOKEN, SET_AUTH_TOKEN, CLEAR_AUTH } from '../Actions/auth';

const localStorageHandler = store => next => (action) => {
  switch (action.type) {
    case LOAD_AUTH_TOKEN:
      try {
        action.authToken = localStorage.getItem('authToken');
      } catch (e) {}
      break;
    case SET_AUTH_TOKEN:
      try {
        localStorage.setItem('authToken', action.authToken);
      } catch (e) {}
      break;
    case CLEAR_AUTH:
      try {
        localStorage.removeItem('authToken');
      } catch (e) {}
      break;
    default:
      break;
  }
  next(action);
};

export default localStorageHandler;
