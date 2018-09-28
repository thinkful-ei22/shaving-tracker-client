import {
  GET_SHAVES_REQUEST,
  GET_SHAVES_SUCCESS,
  GET_SHAVES_ERROR

} from '../actions/shaves';

const initialState = {

  shaveHistory: null,
  isLoading: true,
  error: null
};

export default function shaveReducer(state = initialState, action){
  console.log('In shave reducer. action.type:', action.type);
  switch(action.type){

    case GET_SHAVES_REQUEST:
      return {
        ...state,
        shaveHistory: null,
        isLoading: true,
        error: null
      }

    case GET_SHAVES_SUCCESS:
      return {
        ...state,
        shaveHistory: action.shaveHistory,
        isLoading: false,
        error: null
      }
    
    case GET_SHAVES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    default:
      return state;
  }

}