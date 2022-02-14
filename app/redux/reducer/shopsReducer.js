import {
  calculateRate,
  getBestCoupone,
  getPriceAverage,
} from '../../utils/rateCalculator';

//#region all shops data
export const shopsReducer = (state = [], action) => {
  switch (action.type) {
    case 'Set_Shops':
      return [...action.payload];
    default:
      return state;
  }
};
//#endregion

//#region filtered shops data
export const filterdShopshopsReducer = (state = [], action) => {
  switch (action.type) {
    case 'Filter_Shops':
      return [...action.payload];
    case 'Sort_By_High_Score':
      return [...state].sort(
        (a, b) => calculateRate(b.comments) - calculateRate(a.comments),
      );
    case 'Sort_By_Chipe_Price':
      return [...state].sort(
        (a, b) => getPriceAverage(a.foods) - getPriceAverage(b.foods),
      );
    case 'Sort_By_Best_Coupon':
      return [...state].sort(
        (a, b) => getBestCoupone(b.coupons) - getBestCoupone(a.coupons),
      );

    case 'Sort_By_Expensive_Price':
      return [...state].sort(
        (a, b) => getPriceAverage(b.foods) - getPriceAverage(a.foods),
      );
    default:
      return state;
  }
};
//#endregion

//#region target shop details
export const shopDetailsReducer = (state = {comments: []}, action) => {
  switch (action.type) {
    case 'Set_ShopDetails':
      return {...action.payload};
    case 'Clear_ShopDetails':
      return {comments: []};
    default:
      return state;
  }
};
//#endregion
