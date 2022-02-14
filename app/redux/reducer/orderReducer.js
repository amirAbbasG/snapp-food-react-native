export const orderReducer = (state = [], action) => {
  switch (action.type) {
    case 'Set_Orders':
      return [...action.payload];
    case 'Clear_Orders':
      return [];
    default:
      return state;
  }
};
