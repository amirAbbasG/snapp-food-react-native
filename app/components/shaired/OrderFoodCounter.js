import React from 'react';
import {HStack, IconButton, Text} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {addToCart, removeFoodFromCart} from '../../redux/action/orderActions';
import {useDispatch} from 'react-redux';

const OrderFoodCounter = ({foodId, foodCountInOrder}) => {
  const dispatch = useDispatch();

  const handleMinus = () => {
    if (foodCountInOrder != 0) {
      dispatch(removeFoodFromCart(foodId));
    }
  };

  return (
    <HStack alignItems="center">
      <IconButton
        onPress={() => dispatch(addToCart(foodId))}
        icon={<Icon name="plus-box" size={40} color="#F700A2" />}
      />
      <Text>{foodCountInOrder}</Text>
      <IconButton
        onPress={handleMinus}
        icon={<Icon name="minus-box-outline" size={40} color="#808080" />}
      />
    </HStack>
  );
};

export default OrderFoodCounter;
