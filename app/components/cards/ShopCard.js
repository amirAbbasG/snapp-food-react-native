import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {Box, Heading, Text, HStack, Stack} from 'native-base';
import {TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ImageBackground} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {separatePrice} from '../../utils/priceSeparator';
import {calculateRate} from '../../utils/rateCalculator';
import {RateBox} from '../';

const ShopCard = ({shop, style}) => {
  const cost = separatePrice(shop.deliveryCost);

  const rate = calculateRate(shop.comments);

  const navigation = useNavigation();

  const handlePressCard = () => {
    navigation.navigate('ShopDetailsScreen', {shopId: shop._id});
  };

  return (
    <TouchableOpacity onPress={handlePressCard}>
      <Box style={[styles.box, style]} p="0.5" width="72" shadow={3}>
        <Box>
          <ImageBackground
            imageStyle={styles.imageBackgroundImage}
            style={styles.imageBackground}
            source={{uri: `http://192.168.43.209:4000/${shop.shopImage}`}}>
            <FastImage
              style={styles.logo}
              resizeMode="cover"
              alt="shop-logo"
              source={{uri: `http://192.168.43.209:4000/${shop.shopLogo}`}}
            />
          </ImageBackground>
        </Box>
        <Stack py="2" px="3.5" space={2}>
          <Stack space={2}>
            <HStack pt="2" justifyContent="space-between">
              <Heading size="sm">{shop.shopName}</Heading>
              <RateBox title={rate == 0 ? 'جدید' : rate} />
            </HStack>
            <Text fontSize="xs" fontWeight="500">
              {shop.category}
            </Text>
          </Stack>
          <Text fontSize="xs" fontWeight="400">
            ارسال اکسپرس : {cost == 0 ? 'رایگان' : `${cost} تومان`}
          </Text>
        </Stack>
      </Box>
    </TouchableOpacity>
  );
};

export default memo(ShopCard);

const styles = StyleSheet.create({
  imageBackground: {
    borderBottomWidth: 130,
    borderColor: '#f9f9f9',
    height: 115,
    flex: 1,
  },
  logo: {
    marginTop: '25%',
    marginLeft: 6,
    borderRadius: 7,
    width: 60,
    height: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  box: {
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
    margin: 5,
    borderRadius: 6,
  },
  imageBackgroundImage: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
});
