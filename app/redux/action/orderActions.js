import {
  addToCartApi,
  getOrdersApi,
  removeCartApi,
  removeFoodFromCartApi,
  reOrderApi,
} from '../../api/orderApi';

export const getUserOrders = () => {
  return async dispatch => {
    try {
      const {data} = await getOrdersApi();
      await dispatch({type: 'Set_Orders', payload: data.userOrders});
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
};

export const addToCart = foodId => {
  return async (dispatch, getState) => {
    try {
      const {data} = await addToCartApi(foodId);
      const orders = [...getState().orders].filter(
        o => o._id != data.order._id,
      );
      const newOrders = [...orders, data.order];
      await dispatch({type: 'Set_Orders', payload: newOrders});
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
};

export const reOrder = orderId => {
  return async (dispatch, getState) => {
    try {
      const {data} = await reOrderApi(orderId);
      const orders = [...getState().orders, data.order];
      await dispatch({type: 'Set_Orders', payload: orders});
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
};

export const removeFoodFromCart = foodId => {
  return async (dispatch, getState) => {
    try {
      const {data} = await removeFoodFromCartApi(foodId);
      const orders = [...getState().orders].filter(
        o => o._id != data.order._id,
      );
      const newOrders = [...orders, data.order];
      await dispatch({type: 'Set_Orders', payload: newOrders});
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
};

export const removeCart = orderId => {
  return async (dispatch, getState) => {
    try {
      const {status} = await removeCartApi(orderId);
      if (status === 200) {
        const orders = [...getState().orders].filter(o => o._id != orderId);
        await dispatch({type: 'Set_Orders', payload: orders});
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
};
