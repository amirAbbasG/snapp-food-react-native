import React, {useContext, useState, memo} from 'react';
import {Linking} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {accountContext, shopsContext, globalContext} from '../';
import {getPriceAverage} from '../../utils/rateCalculator';
import {useNavigation} from '@react-navigation/native';
import {
  ShopRegisterApi,
  checkShopNumberApi,
  getSuportedCitiesApi,
  addShopToFavoriteApi,
  removeShopFromFavoriteApi,
  addCommentApi,
} from '../../api/shopApi';
import {setAccountInformation} from '../../redux/action/accountActions';
import {setShopDetails} from '../../redux/action/shopsActions';
import {
  useDiscountApi,
  useCouponApi,
  checkPaymentApi,
} from './../../api/orderApi';
import {getUserOrders} from './../../redux/action/orderActions';

const ShopsContextProvider = ({children}) => {
  const [couponId, setCouponId] = useState();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {setIsLoadingButton, setAction, action} = useContext(accountContext);
  const {errorToast, successToast} = useContext(globalContext);

  const shopTypes = useSelector(state => state.shopTypes);
  const filteredShops = useSelector(state => state.filteredShops);
  const shopDetails = useSelector(state => state.shopDetails);
  const account = useSelector(state => state.account);

  //#region filter shops parameters
  const [supportedCities, setSupportedCities] = useState([]);
  const [priceRange, setPriceRange] = useState({
    title: 'همه',
    minPrice: 0,
    maxPrice: 1000000,
  });
  const [isFreeExpress, setIsFreeExpress] = useState(false);
  const [haveCoupon, setHaveCoupon] = useState(false);
  //#endregion

  const filterShops = [...filteredShops].filter(s =>
    getPriceAverage(s.foods) >= priceRange.minPrice &&
    getPriceAverage(s.foods) < priceRange.maxPrice &&
    isFreeExpress
      ? s.deliveryCost == 0
      : s.deliveryCost >= 0 && haveCoupon
      ? s.coupons.length > 0
      : s.coupons.length >= 0,
  );

  //#region handle shop register
  const registerShop = async shop => {
    try {
      setIsLoadingButton(true);
      const {status} = await ShopRegisterApi(shop);
      if (status === 201) {
        successToast(` ${shop.shopType} ${shop.shopName} با موفقیت ثبت شد`);
        setAction('');
        navigation.reset({
          index: 0,
          routes: [{name: 'BottomTabs'}],
        });
      }
      setIsLoadingButton(false);
    } catch (error) {
      errorToast(error.response.data.message);
      setIsLoadingButton(false);
    }
  };
  //#endregion

  //#region send shop user number and get code if is valid
  const checkShopNumber = async shop => {
    try {
      setIsLoadingButton(true);
      const {status, data} = await checkShopNumberApi(shop.userNumber);
      if (status === 200) {
        setAction(data.action);
      }
      setIsLoadingButton(false);
    } catch (error) {
      errorToast(error.response.data.message);
      setIsLoadingButton(false);
    }
  };
  //#endregion

  //#region check action and return usefull function to shop authorization
  const handleShopAuth = shop => {
    switch (action) {
      case '':
        checkShopNumber(shop);
        break;
      case 'register':
        registerShop(shop);
        break;
      default:
        break;
    }
  };
  //#endregion

  //#region get supported cities
  const getSupportedCities = async () => {
    try {
      const {data, status} = await getSuportedCitiesApi();
      if (status == 200) {
        setSupportedCities(data.supportedCities);
      }
    } catch (error) {
      errorToast(error.response.data.message);
    }
  };
  //#endregion

  //#region get categpries of a shopType
  const getCategory = shopType => {
    const targetShopType = shopTypes.find(t => t.type == shopType);
    if (targetShopType != null) {
      const categories = targetShopType.categories;
      return categories;
    } else {
      return getCategory('رستوران');
    }
  };

  //#endregion

  //#region add shop to favorite and remove it
  const addShopToFavorite = async shopId => {
    try {
      await addShopToFavoriteApi(shopId);
      dispatch(setAccountInformation());
    } catch (error) {
      errorToast(error.response.data.message);
    }
  };

  const removeShopFromFavorite = async shopId => {
    try {
      await removeShopFromFavoriteApi(shopId);
      dispatch(setAccountInformation());
    } catch (error) {
      errorToast(error.response.data.message);
    }
  };
  //#endregion

  //#region add comment
  const addComment = async (id, commentBody) => {
    setIsLoadingButton(true);
    try {
      const {status} = await addCommentApi(id, commentBody);
      if (status === 201) {
        dispatch(setShopDetails(shopDetails._id));
        successToast('نظر شما ثیت شد');
      }
      setIsLoadingButton(false);
    } catch (error) {
      setIsLoadingButton(false);
      errorToast(error.response.data.message);
    }
  };
  //#endregion

  //#region use discount
  const useDiscount = async (orderId, discountCode) => {
    try {
      setIsLoadingButton(true);
      const {status} = await useDiscountApi(orderId, discountCode);
      if (status === 200) {
        dispatch(getUserOrders());
      }
      setIsLoadingButton(false);
      successToast('تخفیف اعمال شد');
    } catch (error) {
      setIsLoadingButton(false);
      errorToast(error.response.data.message);
    }
  };

  //#endregion

  //#region use coupon
  const useCoupon = async (coupon, shopId) => {
    if (coupon.usersUsed && coupon.usersUsed.includes(account._id)) {
      errorToast('قبلا از این کوپن استفاده کرده اید');
    } else {
      try {
        const {status} = await useCouponApi(shopId, coupon._id);
        if (status === 200) {
          setCouponId(coupon._id);
          dispatch(getUserOrders());
        }
      } catch (error) {
        errorToast(error.response.data.message);
      }
    }
  };
  //#endregion

  return (
    <shopsContext.Provider
      value={{
        handleShopAuth,
        getSupportedCities,
        supportedCities,
        getCategory,
        setPriceRange,
        setIsFreeExpress,
        filterShops,
        priceRange,
        isFreeExpress,
        haveCoupon,
        setHaveCoupon,
        addShopToFavorite,
        removeShopFromFavorite,
        addComment,
        useDiscount,
        couponId,
        useCoupon,
      }}>
      {children}
    </shopsContext.Provider>
  );
};

export default memo(ShopsContextProvider);
