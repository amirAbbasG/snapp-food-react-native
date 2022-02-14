import React, {useContext, memo} from 'react';
import {Button, Heading, HStack, VStack, Divider, View} from 'native-base';
import {ShopActionSheet, FilterItem} from '../';
import {priceRanges} from '../../utils/values';
import {shopsContext} from '../../context';

const FilterShopsActionSheet = ({onClose, isOpen}) => {
  const {
    setIsFreeExpress,
    isFreeExpress,
    haveCoupon,
    setHaveCoupon,
    priceRange,
    setPriceRange,
  } = useContext(shopsContext);

  const handlePressPriceRange = item => {
    if (item == priceRange) {
      setPriceRange({});
    } else {
      setPriceRange(item);
    }
  };

  const handleRemoveFilters = () => {
    setPriceRange({
      title: 'همه',
      minPrice: 0,
      maxPrice: 1000000,
    });
    setHaveCoupon(false);
    setIsFreeExpress(false);
  };

  return (
    <ShopActionSheet isOpen={isOpen} onClose={onClose} title="فیلترها">
      <View key="3">
        <Heading size="sm" ml="2" mb="2">
          کلاس قیمتی
        </Heading>
        <HStack space={1} justifyContent="space-evenly" alignContent="stretch">
          {priceRanges.map((item, index) => (
            <Button
              colorScheme={item == priceRange ? 'emerald' : 'muted'}
              h="44"
              width="30%"
              onPress={() => handlePressPriceRange(item)}
              variant="outline"
              key={index}>
              {item.title}
            </Button>
          ))}
        </HStack>
        <Divider w="100%" mb="2" />
        <VStack>
          <FilterItem
            key="2"
            title="دارای کوپن"
            value={haveCoupon}
            onToggle={() => setHaveCoupon(!haveCoupon)}
          />
          <FilterItem
            key="1"
            title="ارسال رایگان"
            value={isFreeExpress}
            onToggle={() => setIsFreeExpress(!isFreeExpress)}
          />
        </VStack>
        <Button
          onPress={() => handleRemoveFilters()}
          w="94%"
          ml="3%"
          mt="2"
          h="10"
          colorScheme="secondary">
          حذف همه فیلترها
        </Button>
      </View>
    </ShopActionSheet>
  );
};

export default memo(FilterShopsActionSheet);
