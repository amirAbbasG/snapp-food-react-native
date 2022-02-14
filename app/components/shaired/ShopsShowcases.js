import React, {memo} from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Heading, VStack, HStack} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {ShopCard, ShowCasesLastItemCard} from '../';

const ShopsShowcases = ({shops, title}) => {
  const navigation = useNavigation();
  if (shops.length > 0) {
    const showCases = shops.length > 9 ? shops.slice(0, 9) : shops;

    const handleShowMore = () => {
      navigation.navigate('ShopsScreen', {title, data: shops});
    };

    //#region flat list render item
    const renderItem = ({item, index}) => {
      if (index == showCases.length - 1 && shops.length > 1) {
        return (
          <ShowCasesLastItemCard
            onPress={handleShowMore}
            image={showCases[showCases.length - 1].shopImage}
          />
        );
      }
      return <ShopCard shop={item} />;
    };
    //#endregion

    return (
      <VStack style={styles.container}>
        <HStack style={styles.titleBox}>
          <Heading size="sm">{title}</Heading>
          <TouchableOpacity onPress={handleShowMore} style={styles.showMoreBox}>
            <Heading size="xs" color="#32CD32">
              بیشتر
            </Heading>
            <Icon name="left" size={17} color="#32CD32" />
          </TouchableOpacity>
        </HStack>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.flatList}
          data={showCases}
          keyExtractor={item => item._id}
          renderItem={renderItem}
        />
      </VStack>
    );
  } else {
    return null;
  }
};

export default memo(ShopsShowcases);

const styles = StyleSheet.create({
  flatList: {
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  titleBox: {
    paddingHorizontal: 17,
    justifyContent: 'space-between',
    width: '100%',
  },
  showMoreBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    alignItems: 'flex-start',
    marginVertical: 17,
  },
});
