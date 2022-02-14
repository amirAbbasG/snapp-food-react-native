import {getShopTypesApi} from '../../api/shopApi';

export const getShopTypes = () => {
  return async dispatch => {
    try {
      const {data, status} = await getShopTypesApi();
      if (status == 200) {
        await dispatch({type: 'Set_Types', payload: data.shopTypes});
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
};
