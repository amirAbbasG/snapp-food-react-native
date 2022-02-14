import React from 'react';
import {isEmpty} from 'lodash';
import {useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDisclose} from 'native-base';
import {ProfileScreen} from '../screens';
import {AppBar, ShowShouldLogin, MapActionSheet} from '../components';
import InternalStackNavigator from './InternalStackNavigator';
import TopTabsNavigator from './TopTabsNavigator';

const BottomTab = createBottomTabNavigator();
const BottomTabNavigator = ({navigation}) => {
  const account = useSelector(state => state.account);
  const {onOpen, isOpen, onClose} = useDisclose();
  return (
    <>
      <BottomTab.Navigator
        initialRouteName="Home"
        screenOptions={({route}) => ({
          cardStyle: {backgroundColor: '#FFFFFF'},
          tabBarIcon: ({color, size}) => {
            let iconName;
            if (route.name == 'Home') iconName = 'home';
            else if (route.name == 'MyOrdersScreen')
              iconName = 'order-bool-descending-variant';
            else if (route.name == 'ProfileScreen')
              iconName = 'account-tie-outline';
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#F700A2',
          tabBarLabelStyle: {
            fontFamily: 'Iranian Sans',
          },
          header: () => (
            <AppBar
              onPressAddress={onOpen}
              onOpenDrawerPress={() => navigation.openDrawer()}
            />
          ),
        })}>
        <BottomTab.Screen
          name="Home"
          component={InternalStackNavigator}
          options={{tabBarLabel: 'خانه'}}
        />

        <BottomTab.Screen
          name="MyOrdersScreen"
          component={isEmpty(account) ? ShowShouldLogin : TopTabsNavigator}
          options={{tabBarLabel: 'سفارش ها'}}
        />

        <BottomTab.Screen
          name="ProfileScreen"
          component={isEmpty(account) ? ShowShouldLogin : ProfileScreen}
          options={{tabBarLabel: 'پروفایل'}}
        />
      </BottomTab.Navigator>
      <MapActionSheet isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default BottomTabNavigator;
