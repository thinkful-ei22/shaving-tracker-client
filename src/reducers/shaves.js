import {
  GET_SHAVES_REQUEST,
  GET_SHAVES_SUCCESS,
  GET_SHAVES_ERROR,
  ADD_SHAVE_REQUEST,
  ADD_SHAVE_SUCCESS,
  ADD_SHAVE_ERROR,
} from '../actions/shaves';

const initialState = {
  shaveHistory: [],
  isLoading: true,
  error: null,
};

export default function shaveReducer(state = initialState, action) {
  console.log('In shave reducer. action.type:', action.type);
  switch (action.type) {
    case GET_SHAVES_REQUEST:
      return {
        ...state,
        shaveHistory: null,
        isLoading: true,
        error: null,
      };

    case GET_SHAVES_SUCCESS:
      return {
        ...state,
        shaveHistory: action.shaveHistory,
        isLoading: false,
        error: null,
      };

    case GET_SHAVES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case ADD_SHAVE_SUCCESS:
      return {
        ...state,
        shaveHistory: [...state.shaveHistory, action.data],
        isLoading: false,
        error: null,
      };

    case ADD_SHAVE_ERROR:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };

    case ADD_SHAVE_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: true,
      };

    default:
      return state;
  }
}
