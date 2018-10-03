import {
 ADD_IMAGE_ERROR, ADD_IMAGE_REQUEST, ADD_IMAGE_SUCCESS, REMOVE_IMAGE_SUCCESS 
} from '../actions/image';

const initialState = {
  image: null,
  loading: false,
  error: null,
};

export default function imageReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_IMAGE_SUCCESS:
      return {
        ...state,
        image: action.data,
        loading: false,
        error: null,
      };
    case ADD_IMAGE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_IMAGE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case REMOVE_IMAGE_SUCCESS:
      return {
        ...state,
        image: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
}
