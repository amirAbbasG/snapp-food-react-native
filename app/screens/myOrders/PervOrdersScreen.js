import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {Button, HStack, VStack, Heading, useDisclose} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import {OrderCard, ShopActionSheet, Factor} from '../../components';
import {separatePrice} from '../../utils/priceSeparator';
import styles from './style';
import {addToCart, reOrder} from '../../redux/action/orderActions';

const PervOrdersScreen = () => {
  const [orderId, setOrderId] = useState();
  const orders = useSelector(state => state.orders);
  const deliverdOrders = [...orders].filter(o => o.isPaid && o.isDelivered);

  const {isOpen, onClose, onOpen} = useDisclose();
  const dispatch = useDispatch();

  //#region flatList render item
  const renderItem = ({item}) => (
    <OrderCard order={item}>
      <HStack style={styles.foodItem}>
        <Heading size="sm">مجموع</Heading>
        <VStack flex="1" py="7" />
        <Heading size="xs">
          {separatePrice(item.amountByDiscount + item.shopId.deliveryCost)}{' '}
          تومان
        </Heading>
      </HStack>
      <HStack w="100%" style={styles.buttonBox}>
        <Button
          variant="solid"
          size="lg"
          w="47%"
          colorScheme="secondary"
          onPress={() => dispatch(reOrder(item._id))}>
          سفارش مجدد
        </Button>
        <Button
          size="lg"
          w="47%"
          variant="outline"
          colorScheme="dark"
          onPress={() => {
            setOrderId(item._id);
            onOpen();
          }}>
          مشاهده فاکتور
        </Button>
      </HStack>
    </OrderCard>
  );
  //#endregion
  return (
    <VStack flex={1} backgroundColor="#FFFFFF">
      <FlatList
        data={deliverdOrders}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
      {orderId && (
        <ShopActionSheet isOpen={isOpen} onClose={onClose} title="فاکتور">
          <Factor orderId={orderId} />
        </ShopActionSheet>
      )}
    </VStack>
  );
};

export default PervOrdersScreen;
