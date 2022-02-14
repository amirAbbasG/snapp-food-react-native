import React, {memo} from 'react';
import {Heading, HStack, Text, VStack, Divider} from 'native-base';
import {Dimensions, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RateBox, CouponCard} from '../';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {separatePrice} from '../../utils/priceSeparator';
import {calculateRate} from '../../utils/rateCalculator';

const ShopsDetailsListHeader = () => {
  const navigation = useNavigation();
  const shopDetails = useSelector(state => state.shopDetails);
  const cost = separatePrice(shopDetails.deliveryCost);
  const rate = calculateRate(shopDetails.comments);

  //#region flatList render item
  const renderItem = ({item}) => (
    <CouponCard coupon={item} shopId={shopDetails._id} />
  );

  //#endregion
  return (
    <>
      <HStack style={styles.container}>
        <VStack space={6}>
          <HStack alignItems="center" space={2}>
            <Heading size="md">{shopDetails.shopName}</Heading>
            <RateBox title={rate == 0 ? 'جدید' : rate} />
            <RateBox
              title={shopDetails.comments.length}
              icon="comments"
              color="#fefefe"
              backgroundColor="#808080"
            />
          </HStack>
          <HStack alignItems="center" space={1}>
            <Icon name="sports-motorsports" size={20} color="#808080" />
            <Text>{cost == 0 ? 'رایگان' : `${cost} تومان`}</Text>
          </HStack>
        </VStack>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ShopsInformationAndCommentsScreen')
          }>
          <VStack shadow="4" style={styles.iconBox}>
            <FastImage
              style={styles.conmmentIcon}
              source={{
                uri: 'https://b2n.ir/k04180',
              }}
            />
            <Text fontSize="9"> اطلاعات و نظرات</Text>
          </VStack>
        </TouchableOpacity>
      </HStack>
      <Divider w="100%" my="2" />
      <HStack style={styles.copounBox} space="3">
        <VStack p="3">
          <FastImage
            style={styles.couponIcon}
            source={require('../../assets/images/coupon-icon.png')}
          />
          <Heading size="sm">کوپن ها</Heading>
        </VStack>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={shopDetails.coupons}
          keyExtractor={item => item._id}
          renderItem={renderItem}
        />
      </HStack>
    </>
  );
};

export default memo(ShopsDetailsListHeader);

const styles = StyleSheet.create({
  copounBox: {
    height: Dimensions.get('screen').height * 0.27,
    backgroundColor: '#F5F5F5',
    borderRadius: 7,
    alignItems: 'center',
    marginBottom: 14,
  },
  conmmentIcon: {
    width: 40,
    height: 40,
  },
  couponIcon: {
    width: 59,
    height: 59,
    marginBottom: 7,
  },
  iconBox: {
    alignItems: 'center',
    paddingHorizontal: 8,
    backgroundColor: '#ffffff',
    paddingVertical: 4,
    borderRadius: 4,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
    paddingHorizontal: 3,
  },
});
