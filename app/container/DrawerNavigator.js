import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/Fontisto';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {ShopAuthScreen} from '../screens';
import BottomTabNavigator from './BottomTabNavigator';
import {CloseIcon, DrawerLable} from '../components';
import {useDispatch} from 'react-redux';
import {setAccountInformation} from '../redux/action/accountActions';
import {getUserOrders} from '../redux/action/orderActions';

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({route}) => {
  const {isLogined} = route.params;
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLogined) {
      dispatch(setAccountInformation());
      dispatch(getUserOrders());
    }
  }, []);
  return (
    <Drawer.Navigator
      drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <CloseIcon onPress={() => props.navigation.toggleDrawer()} />
            <DrawerItemList {...props} />
          </DrawerContentScrollView>
        );
      }}
      initialRouteName="Main"
      screenOptions={({route}) => ({
        drawerIcon: ({color, size}) => {
          let iconName;
          if (route.name == 'SuportScreen') iconName = 'headphone';
          else if (route.name == 'ShopAuthScreen') iconName = 'shopping-store';
          else if (route.name == 'ServicesScreen') iconName = 'dropbox';
          return <Icon name={iconName} size={size} color={color} />;
        },
        cardStyle: {backgroundColor: '#FFFFFF'},
        headerShown: false,
        drawerItemStyle: {
          paddingVertical: 10,
          borderBottomColor: '#DCDCDC',
          borderBottomWidth: 1,
        },
        drawerStyle: {
          width: '100%',
        },
        swipeEnabled: false,
      })}>
      <Drawer.Screen
        name="BottomTabs"
        component={BottomTabNavigator}
        options={{
          drawerItemStyle: {
            display: 'none',
          },
        }}
      />
      <Drawer.Screen
        name="SuportScreen"
        component={ShopAuthScreen}
        options={{
          drawerLabel: () => <DrawerLable name="پشتیبانی" />,
        }}
      />
      <Drawer.Screen
        name="ShopAuthScreen"
        component={ShopAuthScreen}
        options={{
          drawerLabel: () => <DrawerLable name="ثبت نام فروشندگان" />,
        }}
      />
      <Drawer.Screen
        name="ServicesScreen"
        component={ShopAuthScreen}
        options={{drawerLabel: () => <DrawerLable name="بسته های خدماتی" />}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
