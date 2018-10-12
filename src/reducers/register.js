import {
  REGISTER_REQUEST,
  REGISTER_ERROR,
} from '../actions/register';

const initialState = {
  isLogged: false,
  loading: false,
  error: null,
};

export default function userReducer(state = initialState, action) {
  if (action.type === REGISTER_REQUEST) {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }
  if (action.type === REGISTER_ERROR) {
    return {
      ...state,
      loading: false,
      error: action.err,
    };
  }
  return state;
}
