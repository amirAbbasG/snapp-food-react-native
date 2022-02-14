import {createContext} from 'react';

const globalContext = createContext({
  backClickHandler: () => {},
  chekNet: () => {},
  errorToast: () => {},
  successToast: () => {},
});

export default globalContext;
