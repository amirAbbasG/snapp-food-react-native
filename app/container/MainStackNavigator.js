import React, {useContext} from 'react';
import {Input} from 'native-base';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';
import Icon from 'react-native-vector-icons/Feather';
import {HeaderBackIcon, ShowShouldLogin} from '../components';
import {useSelector} from 'react-redux';
import {isEmpty} from 'lodash';
import PaymentWebView from '../screens/myOrders/PaymentWebView';
import {
  UserAuthScreen,
  WelcomeScreen,
  SearchScreen,
  UserInformationsScreen,
  ChangePasswordScreen,
  FavoriteShopsScreen,
  ShopDetailsScreen,
  FoodDetailsScreen,
  ShopsInformationAndCommentsScreen,
  UserCommentsScreen,
  CartScreen,
  OrderDetailsScreen,
  ActiveOrderDetailsScreen,
  ConfirmOrderScreen,
  UserPaymentsScreen,
} from '../screens';
import {shopsContext} from '../context';

const Stack = createStackNavigator();
const MainStackNavigator = () => {
  const account = useSelector(state => state.account);

  const {setSearch} = useContext(shopsContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: props => <HeaderBackIcon {...props} />,
        headerTitleStyle: {fontFamily: 'Iranian Sans', fontSize: 17},
        cardStyle: {backgroundColor: '#FFFFFF'},
      }}>
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserCommentsScreen"
        component={isEmpty(account) ? ShowShouldLogin : UserCommentsScreen}
        options={{
          headerTitle: 'نظرات شما',
        }}
      />
      <Stack.Screen
        name="UserPaymentsScreen"
        component={isEmpty(account) ? ShowShouldLogin : UserPaymentsScreen}
        options={{
          headerTitle: ' پرداخت های شما',
        }}
      />
      <Stack.Screen
        name="ShopDetailsScreen"
        component={ShopDetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserInformationsScreen"
        component={UserInformationsScreen}
        options={{
          headerTitle: 'اطلاعات کاربری',
        }}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{
          headerTitle: 'تغییر رمز عبور',
        }}
      />
      <Stack.Screen
        name="FavoriteShopsScreen"
        component={FavoriteShopsScreen}
        options={{
          headerTitle: 'علاقه مندی ها',
        }}
      />

      <Stack.Screen
        name="Main"
        component={DrawerNavigator}
        options={{headerShown: false}}
        initialParams={{isLogined: false}}
      />

      <Stack.Screen
        name="CartScreen"
        component={isEmpty(account) ? ShowShouldLogin : CartScreen}
        options={{
          headerTitle: 'سبد خرید شما',
        }}
      />
      <Stack.Screen
        name="OrderDetailsScreen"
        component={OrderDetailsScreen}
        options={{
          headerTitle: 'جزئیات سفارش',
        }}
      />
      <Stack.Screen
        name="UserAuthScreen"
        component={UserAuthScreen}
        options={{
          headerTitle: () => null,
        }}
      />

      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerTitleContainerStyle: {width: '100%'},
          headerTitle: () => (
            <Input
              onChangeText={setSearch}
              variant="unstyled"
              style={{direction: 'rtl'}}
              placeholder="جستجو در اسنپ فود"
            />
          ),
          headerLeft: props => <HeaderBackIcon {...props} />,
          headerRight: () => (
            <Icon name="search" size={25} style={{marginRight: 18}} />
          ),
        }}
      />

      <Stack.Screen
        name="FoodDetailsScreen"
        component={FoodDetailsScreen}
        options={{
          headerTitle: 'جزئیات محصول',
        }}
      />

      <Stack.Screen
        name="ConfirmOrderScreen"
        component={ConfirmOrderScreen}
        options={{
          headerTitle: 'تایید نهایی و پرداخت',
        }}
      />

      <Stack.Screen
        name="ActiveOrderDetailsScreen"
        component={ActiveOrderDetailsScreen}
        options={{
          headerTitle: 'پیگیری سفارش',
        }}
      />
      <Stack.Screen
        name="ShopsInformationAndCommentsScreen"
        component={ShopsInformationAndCommentsScreen}
        options={{
          headerTitle: 'اطلاعات و نظرات',
        }}
      />
      <Stack.Screen name="PaymentWebView" component={PaymentWebView} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
