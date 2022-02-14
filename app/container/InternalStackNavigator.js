import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {MainScreen, ShopsScreen} from '../screens';

const Stack = createStackNavigator();

const InternalStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="MainScreen">
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen
        name="ShopsScreen"
        component={ShopsScreen}
        initialParams={{title: 'اسنپ فود', data: []}}
      />
    </Stack.Navigator>
  );
};

export default InternalStackNavigator;
