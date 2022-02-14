import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {WebView} from 'react-native-webview';
import {useDispatch} from 'react-redux';
import {getUserOrders} from '../../redux/action/orderActions';

const PaymentWebView = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {url} = route.params;
  useFocusEffect(
    useCallback(() => {
      return () => {
        navigation.navigate('Main');
        dispatch(getUserOrders());
      };
    }, []),
  );

  return <WebView source={{uri: url}} style={{flex: 1}} />;
};

export default PaymentWebView;
