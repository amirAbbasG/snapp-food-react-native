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
import RNBootSplash from 'react-native-bootsplash';

import MainStackNavigator from './app/container/MainStackNavigator';
import theme from './app/theme';
import {combineProviders} from './app/utils/combineProviders';

I18nManager.forceRTL(true);
LogBox.ignoreLogs(['NativeBase:']);
const App = () => {
  useEffect(() => {
    RNBootSplash.hide({fade: true});
  }, []);

  const Providers = combineProviders([
    NavigationContainer,
    GlobalContextProvider,
    AccountContextProvider,
    ShopsContextProvider,
  ]);

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar backgroundColor="#DCDCDC" barStyle={'dark-content'} />
      <Provider store={store}>
        <Providers>
          <MainStackNavigator />
        </Providers>
      </Provider>
    </NativeBaseProvider>
  );
};

export default App;
