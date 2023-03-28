import React from 'react';
import {globalContext} from '..';
import {BackHandler, Alert} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {useToast} from 'native-base';

const GlobalContextProvider = ({children}) => {
  const toast = useToast();
  //#region toast error message
  const errorToast = description => {
    toast.show({
      title: 'خطایی رخ داده',
      status: 'error',
      description,
    });
  };
  //#endregion

  //#region toast success message
  const successToast = description => {
    toast.show({
      title: 'عملیات موفق',
      status: 'success',
      description,
    });
  };
  //#endregion

  //#region handle when back button clicked
  const backClickHandler = screenIndex => {
    let backClickCount = 0;
    if (screenIndex <= 0) {
      BackHandler.addEventListener('hardwareBackPress', () => {
        if (backClickCount === 1) {
          BackHandler.exitApp();
          return true;
        } else {
          toast.show({
            title: 'برای خروج دوباره  کلیک کنید',
            status: 'error',
          });
          backClickCount += 1;
          setTimeout(() => {
            backClickCount = 0;
          }, 2000);
          return true;
        }
      });
    }
  };
  //#endregion

  //#region check is user connected to internet
  const needNetAlert = () => {
    Alert.alert(
      'اتصال اینترنت',
      'برای ادامه کار نیاز به اتصال به اینترنت است',
      [
        {
          text: 'باشه',
          onPress: BackHandler.exitApp,
        },
      ],
      {cancelable: false},
    );
  };

  const chekNet = async () => {
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      needNetAlert();
    }
  };
  //#endregion

  return (
    <globalContext.Provider
      value={{
        backClickHandler,
        chekNet,
        errorToast,
        successToast,
      }}>
      {children}
    </globalContext.Provider>
  );
};

export default GlobalContextProvider;
