import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  Divider,
  ScrollView,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Factor} from '../../components';
import {getClock, getPersianDate} from '../../utils/dateConvertor';
import styles from './style';

const ActiveOrderDetailsScreen = ({route, navigation}) => {
  const {orderId} = route.params;
  const orders = useSelector(state => state.orders);
  const order = orders.find(o => o._id == orderId);
  const persianDate = getPersianDate(order.createDate);
  const orderTime = getClock(order.createDate);

  return (
    <ScrollView style={{backgroundColor: '#FFFFFF'}}>
      <VStack space={3} style={styles.activeOrderDetailContainer}>
        <HStack justifyContent="space-between" alignItems="center" mb={4}>
          <Heading size="sm">در حال آماده سازی سفارش</Heading>
          <Heading size="sm">
            <Icon name="clock-outline" size={16} /> 29:30
          </Heading>
        </HStack>
        <Heading size="sm">جزئیات سفارش</Heading>
        <Text mb={3} fontSize="xs">{`${persianDate} ساعت ${orderTime}`}</Text>
        <Text fontSize="sm" color="#808080">
          تحویل به
        </Text>
        <Text mb={3} fontSize="sm">
          {order.address.exactAddress}
        </Text>
        <Divider w="100%" />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ShopDetailsScreen', {shopId: order.shopId._id})
          }>
          <HStack space={3} alignItems="center">
            <Image
              style={styles.foodImage}
              alt="foodImage"
              source={{
                uri: `http://192.168.43.209:4000/${order.shopId.shopLogo}`,
              }}
            />
            <Text fontSize="md">{order.shopId.shopName}</Text>
            <HStack flex="1" />
            <Icon name="chevron-left" size={30} />
          </HStack>
        </TouchableOpacity>
        <Divider w="100%" />
      </VStack>
      <Factor orderId={orderId} />
    </ScrollView>
  );
};

export default ActiveOrderDetailsScreen;
