import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {PervOrdersScreen, ActiveOrdersScreen} from '../screens';

const TopTab = createMaterialTopTabNavigator();
const TopTabsNavigator = () => {
  return (
    <TopTab.Navigator
      initialRouteName="ActiveOrdersScreen"
      screenOptions={{
        tabBarActiveTintColor: '#228B22',
        tabBarLabelStyle: {
          fontFamily: 'Iranian Sans',
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#228B22',
        },
      }}>
      <TopTab.Screen
        name="PervOrdersScreen"
        component={PervOrdersScreen}
        options={{tabBarLabel: 'سفارش های قبلی'}}
      />
      <TopTab.Screen
        name="ActiveOrdersScreen"
        component={ActiveOrdersScreen}
        options={{tabBarLabel: 'سفارش های فعال'}}
      />
    </TopTab.Navigator>
  );
};

export default TopTabsNavigator;
