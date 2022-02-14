import {getShopDetailsApi, getShopsApi} from './../../api/shopApi';
0;

//#region all shops action
export const getShops = () => {
  return async dispatch => {
    const {data, status} = await getShopsApi();
    try {
      if (status === 200) {
        await dispatch({type: 'Set_Shops', payload: data.shops});
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
};
//#endregion

//#region filter shops actions
export const filterShopByShopType = shopType => {
  return async (dispatch, getState) => {
    const filterdShops = [...getState().shops].filter(
      s => s.shopType == shopType || s.category == shopType,
    );
    await dispatch({type: 'Filter_Shops', payload: filterdShops});
  };
};

export const filterShopByData = data => {
  return async dispatch => {
    await dispatch({type: 'Filter_Shops', payload: data});
  };
};

export const sortShops = sortType => {
  return async dispatch => {
    await dispatch({type: sortType});
  };
};
//#endregion

//#region shop details action
export const setShopDetails = shopId => {
  return async dispatch => {
    try {
      const {status, data} = await getShopDetailsApi(shopId);
      if (status == 200) {
        await dispatch({type: 'Set_ShopDetails', payload: data.shopDetails});
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
};

export const clearShopDetails = () => {
  return async dispatch => {
    await dispatch({type: 'Clear_ShopDetails'});
  };
};

//#endregion
