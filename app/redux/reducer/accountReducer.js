export const accountReducer = (state = {}, action) => {
  switch (action.type) {
    case 'Set_Account':
      return {...action.payload};
    case 'Clear_Account':
      return {};
    default:
      return state;
  }
};
