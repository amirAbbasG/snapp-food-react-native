import React, {memo} from 'react';
import {Actionsheet, Divider, FlatList, Text} from 'native-base';
import {useDispatch} from 'react-redux';
import {ShopActionSheet} from '../';
import {sortTypes} from '../../utils/values';
import {sortShops} from '../../redux/action/shopsActions';

const SortShopsActionSheet = ({onClose, isOpen}) => {
  const dispatch = useDispatch();

  const handlePressSort = item => {
    dispatch(sortShops(item.type));
    onClose();
  };

  //#region FlatList render item
  const renderItem = ({item, index}) => (
    <>
      <Actionsheet.Item
        onPress={() => handlePressSort(item)}
        my="3"
        key={index}>
        <Text fontSize="md">{item.title}</Text>
      </Actionsheet.Item>
      <Divider w="94%" ml="3%" />
    </>
  );
  //#endregion

  return (
    <ShopActionSheet isOpen={isOpen} onClose={onClose} title="به ترتیب...">
      <FlatList key="4" data={sortTypes} renderItem={renderItem} />
    </ShopActionSheet>
  );
};

export default memo(SortShopsActionSheet);
