import React, {useState, useRef, memo} from 'react';
import {ShopTypesRow, ImageCard} from '../';
import {VStack, HStack, View} from 'native-base';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import Dots from 'react-native-dots-pagination';
import {useNavigation} from '@react-navigation/native';

const ShopTypesBox = () => {
  const navigation = useNavigation();

  const shopTypes = useSelector(state => state.shopTypes);
  const miniImagesData = [[...shopTypes.slice(2, 6)], [...shopTypes.slice(6)]];
  const [activeDot, setActiveDot] = useState(0);

  const topTypes = shopTypes
    .filter(t => t.type == 'رستوران' || t.type == 'سوپرمارکت')
    .reverse();

  //#region FlatList render item
  const renderItem = ({item, index}) => (
    <ShopTypesRow
      data={item}
      key={index.toString()}
      onPressItems={handlePressShopType}
    />
  );
  //#endregion

  //#region flatList view change properties
  const onViewRef = useRef(({viewableItems}) => {
    setActiveDot(viewableItems[0].index);
  });

  const viewConfigRef = React.useRef({itemVisiblePercentThreshold: 50});
  //#endregion

  const handlePressShopType = shopType => {
    navigation.navigate('ShopsScreen', {title: shopType});
  };

  return (
    <VStack w="100%">
      <HStack justifyContent="space-around" px="5" py="2">
        {topTypes.map(item => (
          <ImageCard
            title={item.type}
            image={item.imageName}
            key={item._id}
            onPress={() => handlePressShopType(item.type)}
          />
        ))}
      </HStack>
      <View w="100%" alignSelf="center">
        <FlatList
          horizontal
          pagingEnabled
          viewabilityConfig={viewConfigRef.current}
          onViewableItemsChanged={onViewRef.current}
          showsHorizontalScrollIndicator={false}
          data={miniImagesData}
          renderItem={renderItem}
        />
        <Dots
          length={2}
          activeColor="#808080"
          active={activeDot}
          activeDotWidth={6}
          activeDotHeight={6}
          passiveDotHeight={6}
          passiveDotWidth={6}
        />
      </View>
    </VStack>
  );
};

export default memo(ShopTypesBox);
