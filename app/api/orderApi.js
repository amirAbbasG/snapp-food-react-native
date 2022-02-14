import http from './';

export const getOrdersApi = () => {
  return http.get('user/getOrders');
};
export const getPaymentsApi = () => {
  return http.get('user/getPayments');
};

export const addToCartApi = foodId => {
  return http.post(`user/addToCart/${foodId}`);
};

export const reOrderApi = orderId => {
  return http.post(`user/reOrder/${orderId}`);
};

export const removeFoodFromCartApi = (orderId, foodId) => {
  return http.delete(`user/removeFoodFromCart/${orderId}`, {foodId});
};
export const removeCartApi = orderId => {
  return http.delete(`user/removeCart/${orderId}`);
};
export const useDiscountApi = (orderId, discountCode) => {
  return http.post(`user/useDiscount/${orderId}`, {discountCode});
};
export const useCouponApi = (shopId, couponId) => {
  return http.put(`user/useCoupon/${shopId}`, {couponId});
};

export const checkPaymentApi = orderId => {
  return http.get(`user/checkPayment/${orderId}`);
};
