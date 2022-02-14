import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {Button, HStack, VStack, Divider, Text, useDisclose} from 'native-base';
import {useSelector} from 'react-redux';
import {
  OrderCard,
  RemoveOrderActionSheet,
  FoodPriceBox,
} from '../../components';
import styles from './style';

const CartScreen = ({navigation}) => {
  const {onClose, isOpen, onOpen} = useDisclose();
  const [orderId, setOrderId] = useState();
  const orders = useSelector(state => state.orders);
  const cartOrders = [...orders].filter(o => !o.isPaid);

  const handleRomveOrder = id => {
    setOrderId(id);
    onOpen();
  };

  //#region flatList render item
  const renderItem = ({item}) => (
    <OrderCard order={item}>
      <VStack space={1} style={styles.foodBox}>
        {item.foods.map((food, index) => (
          <VStack key={index}>
            <HStack style={styles.foodItem}>
              <Text fontSize="xs">{`(${food.count}) ${food.name}`}</Text>
              <FoodPriceBox price={food.price} discount={food.discount} />
            </HStack>
            <Divider w="100%" />
          </VStack>
        ))}
      </VStack>
      <HStack w="100%" style={styles.buttonBox}>
        <Button
          variant="solid"
          size="lg"
          w="47%"
          colorScheme="secondary"
          onPress={() =>
            navigation.navigate('OrderDetailsScreen', {orderId: item._id})
          }>
          ادامه خرید
        </Button>
        <Button
          size="lg"
          w="47%"
          variant="outline"
          colorScheme="dark"
          onPress={() => handleRomveOrder(item._id)}>
          حذف سبد
        </Button>
      </HStack>
    </OrderCard>
  );
  //#endregion

  return (
    <>
      <FlatList
        data={cartOrders}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
      <RemoveOrderActionSheet
        isOpen={isOpen}
        onClose={onClose}
        orderId={orderId}
      />
    </>
  );
};

export default CartScreen;
