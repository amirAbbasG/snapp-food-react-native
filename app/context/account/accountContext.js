import {createContext} from 'react';

const accountContext = createContext({
  action: '',
  setAction: () => {},
  handleUserAuthSubmit: () => {},
  isLoadingButton: false,
  setIsLoadingButton: () => {},
  checkToken: () => {},
  editProfile: () => {},
  addAddress: () => {},
  exitAccount: () => {},
  forgotPassword: () => {},
  changeAuthenticatedUserPassword: () => {},
});

export default accountContext;
