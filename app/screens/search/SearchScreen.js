import React, {useContext} from 'react';
import {Dimensions, FlatList} from 'react-native';
import {ShopCard} from '../../components';
import {shopsContext} from '../../context';
import styles from './style';

const SearchScreen = () => {
  const {searchShops} = useContext(shopsContext);
  const screenWidth = Dimensions.get('screen').width;
  //#region FlatList render item
  const renderItem = ({item}) => (
    <ShopCard shop={item} style={{width: screenWidth * 0.9}} />
  );
  //#endregion
  return (
    <FlatList
      contentContainerStyle={{alignItems: 'center', paddingTop: 20}}
      data={searchShops}
      keyExtractor={item => item._id}
      renderItem={renderItem}
    />
  );
};

export default SearchScreen;
