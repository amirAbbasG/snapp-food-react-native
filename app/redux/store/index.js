import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {reducers} from '../reducer';
import {getShopTypes} from './../action/shopTypesAction';
import {getShops} from './../action/shopsActions';

export const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f,
  ),
);

store.dispatch(getShopTypes());
store.dispatch(getShops());
