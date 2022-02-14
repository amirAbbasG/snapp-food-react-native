import React, {memo} from 'react';
import {orderContext} from '..';

const OrderContextProvider = ({children}) => {
  return <orderContext.Provider value={{}}>{children}</orderContext.Provider>;
};

export default memo(OrderContextProvider);
