import React from 'react';
import {HStack, VStack, Heading, Text} from 'native-base';
import {Dimensions, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {getPersianDate, getClock} from './../../utils/dateConvertor';

const screenHeight = Dimensions.get('screen').height;
const OrderCard = ({children, order}) => {
  const navigation = useNavigation();
  const persianDate = getPersianDate(order.createDate);
  const orderTime = getClock(order.createDate);

  return (
    <VStack style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate('ShopDetailsScreen', {shopId: order.shopId._id})
        }>
        <HStack space="3" alignItems="center">
          <VStack w="30%">
            <FastImage
              style={styles.shopLog}
              resizeMode="cover"
              alt="shop-logo"
              source={{
                uri: `http://192.168.43.209:4000/${order.shopId.shopLogo}`,
              }}
            />
          </VStack>
          <VStack space="1" w="70%">
            <Heading size="md">{order.shopId.shopName}</Heading>
            <HStack space="2" alignItems="center">
              <AntIcon name="calendar" size={12} color="#808080" />
              <Text style={styles.detailText}>{persianDate}</Text>
              <AntIcon name="clockcircle" size={12} color="#808080" />
              <Text style={styles.detailText}>{orderTime}</Text>
            </HStack>
            <HStack space="1" alignItems="center">
              <MaterialIcon name="location-pin" size={17} color="#808080" />
              <Text style={styles.detailText}>
                {order.address.exactAddress.slice(0, 34)}....
              </Text>
            </HStack>
          </VStack>
        </HStack>
      </TouchableWithoutFeedback>
      <VStack style={styles.children}>{children}</VStack>
    </VStack>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  shopLog: {
    width: 80,
    height: 80,
    borderWidth: 0.4,
    borderColor: '#000',
    borderRadius: 10,
  },
  container: {
    padding: 14,
    backgroundColor: '#FFFFFF',
    margin: 17,
    elevation: 2,
    borderRadius: 7,
  },
  children: {
    alignItems: 'center',
    paddingTop: 17,
    flex: 1,
  },
  detailText: {
    fontSize: 11,
    color: '#808080',
  },
});
