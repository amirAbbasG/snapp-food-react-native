import {createContext} from 'react';

const shopsContext = createContext({
  handleShopAuth: () => {},
  supportedCities: [],
  getSupportedCities: () => {},
  getCategory: () => {},
  setPriceRange: () => {},
  setIsFreeExpress: () => {},
  setHaveCoupon: () => {},
  filterShops: [],
  priceRange: {},
  isFreeExpress: false,
  haveCoupon: false,
  addShopToFavorite: () => {},
  removeShopFromFavorite: () => {},
  addComment: () => {},
  useDiscount: () => {},
  useCoupon: () => {},
  couponId: 0,
});

export default shopsContext;
