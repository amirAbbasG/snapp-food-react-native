import React, {useState, useContext} from 'react';
import {Keyboard} from 'react-native';
import {accountContext, globalContext} from '../';
import {useDispatch, useSelector} from 'react-redux';
import Jwt from 'jwt-decode';
import {StackActions, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  setAccount,
  clearAccount,
  setAccountInformation,
} from '../../redux/action/accountActions';
import {
  checkNumberApi,
  verifyNumberApi,
  registerUserApi,
  loginUserApi,
  editProfileApi,
  forgotPasswordApi,
  changePasswordApi,
  changeAuthenticatedUserPasswordApi,
} from '../../api/userApi';
import {getAddress} from '../../api/addressApi';
import http from '../../api';

const AccountContextProvider = ({children}) => {
  const dispatch = useDispatch();
  const [action, setAction] = useState('');
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const {errorToast, successToast} = useContext(globalContext);
  const navigation = useNavigation();

  const account = useSelector(state => state.account);
  //#region change password
  const changePassword = async user => {
    try {
      setIsLoadingButton(true);
      const {status, data} = await changePasswordApi(user);
      if (status === 200) {
        setAction(data.action);
        setIsLoadingButton(false);
        successToast('کلمه عبور با موفقیت تغییر یافت');
      }
    } catch (error) {
      errorToast(error.response.data.message);
      setIsLoadingButton(false);
    }
  };
  //#endregion

  //#region send number to get code
  const checkNumber = async number => {
    try {
      setIsLoadingButton(true);
      const {status, data} = await checkNumberApi(number);
      if (status === 200) {
        setAction(data.action);
      } else {
        setIsLoadingButton(false);
        errorToast('مشکلی پیش آمده');
      }
      setIsLoadingButton(false);
    } catch (error) {
      errorToast(error.response.data.message);
      setIsLoadingButton(false);
    }
  };
  //#endregion

  //#region send code for verify number
  const verifyNumber = async body => {
    try {
      setIsLoadingButton(true);
      const {status, data} = await verifyNumberApi(body);
      if (status === 200) {
        setAction(data.action);
        setIsLoadingButton(false);
      } else {
        setIsLoadingButton(false);
        errorToast('مشکلی پیش آمده');
      }
    } catch (error) {
      errorToast(error.response.data.message);
      setIsLoadingButton(false);
    }
  };
  //#endregion

  // #region register after verify number
  const registerUser = async (user, navigation) => {
    try {
      setIsLoadingButton(true);
      Keyboard.dismiss();
      const {data, status} = await registerUserApi(user);
      if (status === 201) {
        setToken(data);
        setIsLoadingButton(false);
        successToast('ثبت نام با موفقیت انجام شد');
        setTimeout(() => {
          navigation.dispatch(StackActions.replace('Main', {isLogined: true}));
        }, 200);
      } else {
        setIsLoadingButton(false);
        errorToast('مشکلی پیش آمده');
      }
    } catch (error) {
      errorToast(error.response.data.message);
      setIsLoadingButton(false);
    }
  };
  //#endregion

  //#region login user after cheked is registered
  const loginUser = async user => {
    try {
      setIsLoadingButton(true);
      Keyboard.dismiss();
      const {status, data} = await loginUserApi(user);
      if (status === 200) {
        setToken(data);
        setIsLoadingButton(false);
        successToast('خوش آمدید');
        setTimeout(() => {
          navigation.dispatch(StackActions.replace('Main', {isLogined: true}));
        }, 200);
      } else {
        setIsLoadingButton(false);
        errorToast('مشکلی پیش آمده');
      }
    } catch (error) {
      errorToast(error.response.data.message);
      setIsLoadingButton(false);
    }
  };
  //#endregion

  //#region forgot password
  const forgotPassword = async number => {
    try {
      const {status, data} = await forgotPasswordApi(number);
      if (status === 200) {
        setAction(data.action);
      }
    } catch (error) {
      errorToast(error.response.data.message);
    }
  };
  //#endregion

  //#region submit in auth screen
  const handleUserAuthSubmit = user => {
    switch (action) {
      case '':
        checkNumber(user.number);
        break;
      case 'sendCode':
        verifyNumber({
          number: user.number,
          code: user.code,
        });
        break;
      case 'login':
        loginUser(
          {
            number: user.number,
            password: user.password,
          },
          navigation,
        );
        break;
      case 'register':
        registerUser(
          {
            number: user.number,
            fullName: user.fullName,
            password: user.password,
          },
          navigation,
        );
        break;
      case 'changePassword':
        changePassword({
          number: user.number,
          code: user.code,
          password: user.password,
        });
        break;

      default:
        break;
    }
  };
  //#endregion

  //#region edite profile
  const editProfile = async userData => {
    try {
      setIsLoadingButton(true);
      const editData = {fullName: account.fullName, ...userData};
      const {status, data} = await editProfileApi(editData);
      if (status === 200) {
        successToast('اطلاعات کاربر با موفقیت ویرایش شد');
        setToken(data);
        setIsLoadingButton(false);
      }
    } catch (error) {
      errorToast(error.response.data.message);
      setIsLoadingButton(false);
    }
  };
  //#endregion

  //#region check if token exist and isvalid navigate user to main
  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    const userId = await AsyncStorage.getItem('userId');
    if (token != null && userId != null) {
      const decodedToken = Jwt(token);
      const nowDate = Date.now() / 1000;
      if (nowDate < decodedToken.exp) {
        if (decodedToken['_id'] === userId) {
          http.defaults.headers.common['Authorization'] = token;
          navigation.dispatch(StackActions.replace('Main', {isLogined: true}));
        } else {
          exitAccount();
        }
      } else {
        exitAccount();
      }
    }
  };
  //#endregion

  //#region add address by user
  const addAddress = async (coordinates, title = 'آدرس من') => {
    const {data} = await getAddress(
      coordinates.latitude,
      coordinates.longitude,
    );
    const address = {
      city: data.city,
      exactAddress: data.formatted_address,
      title,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    };
    editProfile({address});
    dispatch(setAccountInformation());
  };
  //#endregion

  //#region exit account
  const exitAccount = () => {
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('userId');
    dispatch(clearAccount());
  };
  //#endregion

  //#region set token and header
  const setToken = async data => {
    await AsyncStorage.setItem('token', data.token);
    await AsyncStorage.setItem('userId', data.userId);
    dispatch(setAccount());
    http.defaults.headers.common['Authorization'] = data.token;
  };
  //#endregion

  //#region change authenticated user password
  const changeAuthenticatedUserPassword = async passwordsData => {
    try {
      setIsLoadingButton(true);
      const {status} = await changeAuthenticatedUserPasswordApi(passwordsData);
      if (status == 200) {
        setIsLoadingButton(false);
        successToast('پسورد با موفقیت ادیت شد');
      }
    } catch (error) {
      errorToast(error.response.data.message);
      setIsLoadingButton(false);
    }
  };
  //#endregion

  return (
    <accountContext.Provider
      value={{
        handleUserAuthSubmit,
        action,
        isLoadingButton,
        setAction,
        setIsLoadingButton,
        checkToken,
        editProfile,
        addAddress,
        exitAccount,
        forgotPassword,
        changeAuthenticatedUserPassword,
      }}>
      {children}
    </accountContext.Provider>
  );
};

export default AccountContextProvider;
