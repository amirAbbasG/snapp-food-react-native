import React, {memo} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Box, HStack, VStack, Text, IconButton, Heading} from 'native-base';
import FastImage from 'react-native-fast-image';
import {separatePrice} from '../../utils/priceSeparator';
import {useNavigation} from '@react-navigation/native';
import {addToCart} from '../../redux/action/orderActions';
import {useDispatch} from 'react-redux';

const FoodCard = ({food}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('FoodDetailsScreen', {foodId: food._id})
      }>
      <Box shadow={1} style={styles.box}>
        <VStack p="1" width="35%" justifyContent="center">
          <FastImage
            style={styles.foodImage}
            alt="food-image"
            resizeMode="cover"
            source={{
              uri: `http://192.168.43.209:4000/${food.foodImage}`,
            }}
          />
        </VStack>
        <VStack pt="3" justifyContent="center" width="65%" p="1">
          <Heading mb="1" size="sm">
            {food.name}
          </Heading>
          <Text fontSize="xs">{food.description}</Text>
          <HStack justifyContent="space-between" alignItems="baseline">
            <Text fontSize="xs">{separatePrice(food.price)} تومان</Text>
            <IconButton
              onPress={() => dispatch(addToCart(food._id))}
              icon={
                <FastImage
                  style={styles.addToCartIcon}
                  alt="add-to-cart"
                  resizeMode="cover"
                  source={require('../../assets/images/add-to-cart.png')}
                />
              }
            />
          </HStack>
        </VStack>
      </Box>
    </TouchableOpacity>
  );
};

export default memo(FoodCard);

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    paddingHorizontal: 6,
    paddingVertical: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    borderRadius: 4,
  },
  foodImage: {
    borderRadius: 4,
    width: 90,
    height: 90,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addToCartIcon: {
    width: 44,
    height: 44,
  },
});
