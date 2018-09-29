import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';

import authReducer from './reducers/auth';
import userReducer from './reducers/register';
import shaveReducer from './reducers/shaves';
import collectionReducer from './reducers/get-collection';

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
