import React, {useContext, memo} from 'react';
import {TouchableOpacity} from 'react-native';
import {
  Avatar,
  Actionsheet,
  Heading,
  HStack,
  FlatList,
  Divider,
  Box,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {shopsContext} from '../../context';
import {useDispatch} from 'react-redux';
import {
  filterShopByCategories,
  filterShopByShopType,
} from '../../redux/action/shopsActions';

const CategoriesActionSheet = ({isOpen, onClose, shopType, changeTitle}) => {
  const {getCategory} = useContext(shopsContext);
  const categories = getCategory(shopType);
  const dispatch = useDispatch();

  const handlePressCategory = category => {
    dispatch(filterShopByCategories(category));
    changeTitle(category);
    onClose();
  };

  const handlePressAllCategory = () => {
    if (shopType.includes('اسنپ فود') || shopType.includes('دارای')) {
      dispatch(filterShopByShopType('رستوران'));
    } else {
      dispatch(filterShopByShopType(shopType));
    }
    changeTitle('همه دسته ها');
    onClose();
  };

  //#region FlatList render Item
  const renderItem = ({item, index}) => (
    <>
      <Divider width="94%" ml="3%" />
      <Actionsheet.Item
        my="1"
        onPress={() => handlePressCategory(item)}
        key={index}
        startIcon={
          <Avatar
            bg="blueGray.600"
            size="8"
            p="0.3"
            source={{uri: `http://192.168.43.209:4000/${item}.jpg`}}
          />
        }>
        {item}
      </Actionsheet.Item>
    </>
  );
  //#endregion

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Box width="100%">
          <Heading mx="4" size="xs">
            انتخاب دسته ها
          </Heading>
          <TouchableOpacity onPress={() => handlePressAllCategory()}>
            <HStack p="7" space={2}>
              <Icon name="dashboard" color="#228B22" size={14} />
              <Heading color="#228B22" size="xs">
                همه دسته ها
              </Heading>
            </HStack>
          </TouchableOpacity>
          <FlatList data={categories} renderItem={renderItem} />
        </Box>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default memo(CategoriesActionSheet);
