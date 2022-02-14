import React from 'react';
import {Text, HStack, View} from 'native-base';
import {separatePrice} from '../../utils/priceSeparator';
import {StyleSheet} from 'react-native';

const FoodPriceBox = ({discount, price}) => {
  return (
    <>
      {discount == 0 ? (
        <Text fontSize="xs">{separatePrice(price)} تومان</Text>
      ) : (
        <HStack space="1">
          <View style={styles.discountBox}>
            <Text color="#F700A2" fontSize="10">
              {discount} %
            </Text>
          </View>
          <View>
            <Text style={styles.firstPrice} fontSize="xs">
              {separatePrice(price)}
            </Text>
            <Text fontSize="xs">
              {separatePrice(price - (price * discount) / 100)}
              تومان
            </Text>
          </View>
        </HStack>
      )}
    </>
  );
};

export default FoodPriceBox;

const styles = StyleSheet.create({
  discountBox: {
    borderWidth: 1,
    borderColor: '#F700A2',
    justifyContent: 'center',
    borderRadius: 7,
    paddingHorizontal: 3,
  },
  firstPrice: {
    color: '#808080',
    textDecorationLine: 'line-through',
    textDecorationColor: '#808080',
  },
});
