import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';

import authReducer from './reducers/auth';
import userReducer from './reducers/register';
import shaveReducer from './reducers/shaves';
import productReducer from './reducers/products';
import collectionReducer from './reducers/get-collection';

import localStorageHandler from './middleware/localStorage';


const store = createStore(
  combineReducers({
    form: formReducer,
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    collection: collectionReducer,
    shaves: shaveReducer,
  }),
  applyMiddleware(localStorageHandler, thunk),
);

export default store;
