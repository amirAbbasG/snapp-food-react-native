import React, {memo, useContext} from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {VStack, Button, HStack, View, Text} from 'native-base';
import Dash from 'react-native-dash';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {shopsContext} from '../../context';

const CouponCard = ({coupon, shopId}) => {
  const {couponId, useCoupon} = useContext(shopsContext);
  return (
    <View style={styles.container}>
      <VStack style={styles.detailsBox} space="1">
        <FastImage
          style={styles.icon}
          alt="coupon"
          resizeMode="cover"
          source={{
            uri: `http://192.168.43.209:4000/${coupon.icon}`,
          }}
        />
        <Text textAlign="center" fontSize="xs">
          {coupon.description}
        </Text>
        <Text fontSize="xs" color="#808080">
          {coupon.discount} %
        </Text>
      </VStack>
      <HStack style={styles.dashBox}>
        <View style={styles.rigthCircle} />
        <Dash dashColor="#E4E4E7" style={{width: '88%'}} />
        <View style={styles.leftCircle} />
      </HStack>
      <View style={styles.buttonBox}>
        <Button
          onPress={() => couponId != coupon._id && useCoupon(coupon, shopId)}
          size="sm"
          colorScheme="dark"
          p="1"
          variant={couponId == coupon._id ? 'unstyled' : 'outline'}
          leftIcon={
            couponId == coupon._id && (
              <Icon name="check-bold" size={17} color="#00FF00" />
            )
          }>
          <Text
            fontSize="xs"
            color={couponId == coupon._id ? '#00FF00' : '#808080'}>
            {couponId == coupon._id ? 'انتخاب شده' : 'انتخاب'}
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default memo(CouponCard);

const styles = StyleSheet.create({
  buttonBox: {
    padding: 3,
    paddingHorizontal: 13,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    backgroundColor: 'white',
    justifyContent: 'center',
    height: 43,
    width: '98%',
    elevation: 2,
  },
  detailsBox: {
    alignItems: 'center',
    paddingTop: 17,
    height: 119,
    backgroundColor: 'white',
    width: '98%',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    elevation: 2,
  },
  dashBox: {
    height: 8,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    elevation: 2,
  },
  container: {
    backgroundColor: 'transparent',
    height: 170,
    width: 130,
    marginHorizontal: 7,
    marginVertical: 3,
    alignItems: 'center',
  },
  leftCircle: {
    backgroundColor: '#F4F4F5',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    height: 8,
    width: 11,
    borderLeftColor: '#BDC7D4',
    borderLeftWidth: 1,
  },
  rigthCircle: {
    backgroundColor: '#F4F4F5',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    height: 8,
    width: 11,
    borderRightColor: '#BDC7D4',
    borderRightWidth: 1,
  },
  icon: {
    height: 50,
    width: 50,
    marginBottom: 9,
  },
});
