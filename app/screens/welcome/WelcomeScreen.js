import React, {useEffect, useContext} from 'react';
import {ImageBackground} from 'react-native';
import {Button, HStack} from 'native-base';
import {useNavigationState} from '@react-navigation/native';
import styles from './style';
import {accountContext, globalContext} from '../../context';
import {useSelector} from 'react-redux';

const WelcomeScreen = ({navigation}) => {
  const screenIndex = useNavigationState(state => state.index);
  const {backClickHandler, chekNet} = useContext(globalContext);
  const {checkToken} = useContext(accountContext);
  const shops = useSelector(state => state.shops);

  useEffect(() => {
    if (shops.length > 0) {
      checkToken();
    }
    chekNet();
    backClickHandler(screenIndex);
  }, [shops]);
  return (
    <ImageBackground
      style={styles.background}
      source={require('../../assets/images/welcome-bg.jpg')}>
      <HStack w="100%" style={styles.buttonBox}>
        <Button
          variant="solid"
          size="lg"
          colorScheme="secondary"
          onPress={() => navigation.navigate('Main')}>
          سفارش دهید
        </Button>
        <Button
          size="lg"
          variant="outline"
          colorScheme="dark"
          onPress={() => navigation.navigate('UserAuthScreen')}>
          ورود/عضویت
        </Button>
      </HStack>
    </ImageBackground>
  );
};

export default WelcomeScreen;
