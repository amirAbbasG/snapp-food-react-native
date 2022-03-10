import React, {memo, useContext} from 'react';
import {Heading, View} from 'native-base';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ImageCard} from '../';
import {shopsContext} from './../../context';

const RestaurantCategoriesBox = () => {
  const {getCategory} = useContext(shopsContext);
  const navigation = useNavigation();
  const restaurantCategories = getCategory('رستوران');

  const handlePressCategory = category => {
    navigation.navigate('ShopsScreen', {title: category});
  };

  //#region FlatList render item
  const renderItem = ({item, index}) => (
    <ImageCard
      onPress={() => handlePressCategory(item)}
      image={`${item.replace(' ', '-')}.jpg`}
      title={item}
      key={index}
      style={{
        height: 120,
        width: 120,
        margin: 6,
      }}
    />
  );
  //#endregion

  return (
    <View mt="4">
      <Heading ml="6" size="md">
        دسته بندی ها
      </Heading>
      <FlatList
        data={restaurantCategories}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{paddingHorizontal: 13, paddingVertical: 5}}
        renderItem={renderItem}
      />
    </View>
  );
};

export default memo(RestaurantCategoriesBox);
