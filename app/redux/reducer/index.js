import {combineReducers} from 'redux';
import {accountReducer} from './accountReducer';
import {
  shopsReducer,
  shopDetailsReducer,
  filterdShopshopsReducer,
} from './shopsReducer';
import {shopTypesReducer} from './ShopTypesReducer';
import {orderReducer} from './orderReducer';

export const reducers = combineReducers({
  account: accountReducer,
  shops: shopsReducer,
  shopTypes: shopTypesReducer,
  shopDetails: shopDetailsReducer,
  filteredShops: filterdShopshopsReducer,
  orders: orderReducer,
});
