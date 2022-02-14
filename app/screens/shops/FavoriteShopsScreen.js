import React from 'react';
import {Dimensions, FlatList} from 'react-native';
import {ShopCard} from '../../components';
import {useSelector} from 'react-redux';

const FavoriteShopsScreen = () => {
  const account = useSelector(state => state.account);
  const screenWidth = Dimensions.get('screen').width;
  //#region FlatList render item
  const renderItem = ({item}) => (
    <ShopCard shop={item} style={{width: screenWidth * 0.9}} />
  );
  //#endregion
  return (
    <FlatList
      contentContainerStyle={{alignItems: 'center', paddingTop: 20}}
      data={account.favoriteShop}
      keyExtractor={item => item._id}
      renderItem={renderItem}
    />
  );
};

export default FavoriteShopsScreen;
