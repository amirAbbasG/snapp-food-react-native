export const shopTypesReducer = (state = [], action) => {
  switch (action.type) {
    case 'Set_Types':
      return [...action.payload];
    default:
      return state;
  }
};
