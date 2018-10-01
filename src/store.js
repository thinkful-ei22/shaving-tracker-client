import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';

import authReducer from './reducers/auth';
import userReducer from './reducers/register';
import shaveReducer from './reducers/shaves';
import productReducer from './reducers/products';
import collectionReducer from './reducers/get-collection';
import { loadAuthToken } from './local-storage';
import { setAuthToken, refreshAuthToken } from './actions/auth';


const store = createStore(
  combineReducers({
    form: formReducer,
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    collection: collectionReducer,
    shaves: shaveReducer,
  }),
  applyMiddleware(thunk),
);

const authToken = loadAuthToken();
if (authToken) {
  const token = authToken;
  store.dispatch(setAuthToken(token));
  store.dispatch(refreshAuthToken());
}

export default store;
