import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';

import authReducer from './Reducers/auth';
import userReducer from './Reducers/register';
import shaveReducer from './Reducers/shaves';
import collectionReducer from './Reducers/get-collection';

import localStorageHandler from './middleware/localStorage';


const store = createStore(
  combineReducers({
    form: formReducer,
    auth: authReducer,
    user: userReducer,
    collection: collectionReducer,
    shaves: shaveReducer,
  }),
  applyMiddleware(localStorageHandler, thunk),
);

export default store;
