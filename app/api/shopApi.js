import http from './';

export const ShopRegisterApi = shop => {
  return http.post('shopAdmin/register', shop);
};

export const checkShopNumberApi = userNumber => {
  return http.post('shopAdmin/checkNumber', {userNumber});
};

export const getSuportedCitiesApi = () => {
  return http.get('shopAdmin/supportedCities');
};

export const getShopTypesApi = () => {
  return http.get('shopAdmin/shopTypes');
};

export const getShopsApi = () => {
  return http.get('user/shops');
};

export const getShopDetailsApi = shopId => {
  return http.get(`user/shopDetail/${shopId}`);
};

export const addShopToFavoriteApi = shopId => {
  return http.put(`user/addShopToFavorites/${shopId}`);
};

export const removeShopFromFavoriteApi = shopId => {
  return http.put(`user/removeShopFromFavorites/${shopId}`);
};

export const addCommentApi = (id, commentBody) => {
  return http.post(`user/comment/${id}`, commentBody);
};
