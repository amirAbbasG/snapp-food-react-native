import React from 'react';
import {FlatList} from 'react-native';
import {
  Heading,
  Text,
  Image,
  Divider,
  HStack,
  VStack,
  Button,
} from 'native-base';
import {OrderFoodCounter, FoodPriceBox} from '../../components';
import {separatePrice} from '../../utils/priceSeparator';
import styles from './style';
import {useSelector} from 'react-redux';

const OrderDetailsScreen = ({route, navigation}) => {
  const {orderId} = route.params;
  const orders = useSelector(state => state.orders);
  const order = orders.find(o => o._id == orderId);
  let couponDiscount = 0;
  if (order.usedCoupon && order.usedCoupon.discount > 0) {
    couponDiscount = (order.amountByDiscount * order.usedCoupon.discount) / 100;
  }

  const PriceItem = ({title, price}) => (
    <HStack style={styles.priceItem}>
      <Text fontSize="sm">{title}</Text>
      <Text fontSize="sm">{separatePrice(price)} تومان</Text>
    </HStack>
  );

  //#region FlatList render Item
  const renderItem = ({item}) => (
    <VStack space={2} px={4} py={2}>
      <HStack space={4}>
        <Image
          style={styles.foodImage}
          alt="foodImage"
          source={{
            uri: `http://192.168.43.209:4000/${item.foodImage}`,
          }}
        />
        <Heading size="md">{item.name}</Heading>
      </HStack>
      <HStack justifyContent="space-between" alignItems="center">
        <FoodPriceBox price={item.price} discount={item.discount} />
        <OrderFoodCounter foodId={item._id} foodCountInOrder={item.count} />
      </HStack>
      <Divider w="100%" />
    </VStack>
  );
  //#endregion

  //#region list footer
  const listFooter = () => (
    <VStack space={2} p={4} mt={10}>
      <PriceItem title={`مجموع (${order.foods.length})`} price={order.amount} />
      <Divider w="100%" />
      <PriceItem
        title="جمع سفارشات پس از تخفیف"
        price={order.amountByDiscount - couponDiscount}
      />
      <PriceItem title="هزینه ارسال" price={order.shopId.deliveryCost} />
      <PriceItem title="مالیات" price={0} />
    </VStack>
  );

  //#endregion

  return (
    <VStack flex="1">
      <FlatList
        data={order.foods}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{backgroundColor: '#FFFFFF', paddingTop: 20}}
        ListFooterComponent={listFooter}
      />
      <HStack style={styles.orderDetailFooter}>
        <VStack space={1}>
          <Text fontSize="sm">جمع کل</Text>
          <Text fontSize="md">
            {separatePrice(
              order.amountByDiscount +
                order.shopId.deliveryCost -
                couponDiscount,
            )}{' '}
            تومان
          </Text>
        </VStack>
        <Button
          onPress={() =>
            navigation.navigate('ConfirmOrderScreen', {orderId: order._id})
          }
          colorScheme="secondary"
          w={40}>
          ادامه
        </Button>
      </HStack>
    </VStack>
  );
};

export default OrderDetailsScreen;
