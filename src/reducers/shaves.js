import {
  GET_SHAVES_REQUEST,
  GET_SHAVES_SUCCESS,
  GET_SHAVES_ERROR,
  REMOVE_SHAVE,
  ADD_SHAVE_REQUEST,
  ADD_SHAVE_SUCCESS,
  ADD_SHAVE_ERROR,
  SET_SHAVE_FILTER_START,
  SET_SHAVE_FILTER_END,
  RESET_SHAVE_FILTER,
  UPDATE_SHAVE_SUCCESS,
  UPDATE_SHAVE_REQUEST,
  UPDATE_SHAVE_ERROR,
} from '../actions/shaves';

const initialState = {
  startFilter: null,
  endFilter: null,
  shaveHistory: [],
  isLoading: true,
  error: null,
};

export default function shaveReducer(state = initialState, action) {
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

    case REMOVE_SHAVE:
      return {
        ...state,
        shaveHistory: state.shaveHistory.filter(item => item.id !== action.id),
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

    case SET_SHAVE_FILTER_START:
      return {
        ...state,
        startFilter: action.date,
      };

    case SET_SHAVE_FILTER_END:
      return {
        ...state,
        endFilter: action.date,
      };

    case RESET_SHAVE_FILTER:
      return {
        ...state,
        startFilter: null,
        endFilter: null,
      }

    case UPDATE_SHAVE_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: true,
      };

    case UPDATE_SHAVE_ERROR:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };

    case UPDATE_SHAVE_SUCCESS:
      console.log(action.data);
      const newShaveHistory = state.shaveHistory.map((shave) => {
        const updated = action.data;
        if (updated.id === shave.id) {
          const obj = {};
          for (const key in updated) {
            if (updated[key]) {
              obj[key] = updated[key];
            }
          }
          return Object.assign(shave, obj);
        }
        return shave;
      });
      return {
        ...state,
        shaveHistory: newShaveHistory,
        error: null,
        isLoading: false,
      };

    default:
      return state;
  }
}
