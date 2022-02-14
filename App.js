import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {I18nManager, LogBox} from 'react-native';
import {NativeBaseProvider, StatusBar} from 'native-base';
import {Provider} from 'react-redux';
import {store} from './app/redux/store';
import {
  GlobalContextProvider,
  AccountContextProvider,
  ShopsContextProvider,
} from './app/context';
import MainStackNavigator from './app/container/MainStackNavigator';
import RNBootSplash from 'react-native-bootsplash';
import theme from './app/theme';

I18nManager.forceRTL(true);
LogBox.ignoreLogs(['NativeBase:']);
const App = () => {
  useEffect(() => {
    RNBootSplash.hide({fade: true});
  }, []);
  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar backgroundColor="#DCDCDC" barStyle={'dark-content'} />
      <Provider store={store}>
        <NavigationContainer>
          {/* global states start tags */}
          <GlobalContextProvider>
            <AccountContextProvider>
              <ShopsContextProvider>
                {/*  */}

                <MainStackNavigator />

                {/* global states end tags */}
              </ShopsContextProvider>
            </AccountContextProvider>
          </GlobalContextProvider>
          {/* */}
        </NavigationContainer>
      </Provider>
    </NativeBaseProvider>
  );
};

export default App;
