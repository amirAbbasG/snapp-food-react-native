import React, {useState, useContext, useCallback} from 'react';
import {FlatList, Animated, Dimensions, TouchableOpacity} from 'react-native';
import {Heading, HStack} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  SearchBox,
  ShopCard,
  RoundedIconButton,
  CategoriesActionSheet,
  SortShopsActionSheet,
  FilterShopsActionSheet,
  LoadingLayout,
} from '../../components';
import {shopsContext} from '../../context';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {
  filterShopByData,
  filterShopByShopType,
} from '../../redux/action/shopsActions';

const ShopsScreen = ({route}) => {
  const screenWidth = Dimensions.get('screen').width;
  const [sheetAction, setSheetAction] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState('همه دسته ها');
  const {filterShops} = useContext(shopsContext);
  const {title, data} = route.params;
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      if (data.length > 0) {
        dispatch(filterShopByData(data));
      } else {
        dispatch(filterShopByShopType(title));
      }
      setLoaded(true);
      return () => setLoaded(false);
    }, []),
  );

  //#region search box height
  const scrollY = new Animated.Value(0);
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [60, 0],
    extrapolate: 'clamp',
  });
  //#endregion

  //#region FlatList render item
  const renderItem = ({item}) => (
    <ShopCard shop={item} style={{width: screenWidth * 0.9}} />
  );
  //#endregion

  //#region FlatList header
  const listHeader = () => (
    <HStack
      justifyContent="space-between"
      alignItems="center"
      w={screenWidth}
      p="3">
      <Heading size="md">{title}</Heading>
      <TouchableOpacity onPress={() => setSheetAction('sort')}>
        <HStack space="2">
          <Icon name="sort-amount-up-alt" color="#228B22" size={17} />
          <Heading color="#228B22" size="xs">
            به ترتیب...
          </Heading>
        </HStack>
      </TouchableOpacity>
    </HStack>
  );
  //#endregion

  return (
    <LoadingLayout loaded={loaded}>
      <SearchBox searchBoxHeight={headerHeight} />
      <HStack>
        <RoundedIconButton
          title={categoryTitle}
          key="1"
          icon="dashboard"
          onPress={() => setSheetAction('categories')}
        />
        <RoundedIconButton
          key="2"
          title="فیلتر ها"
          icon="filter-alt"
          onPress={() => setSheetAction('filterShops')}
        />
      </HStack>
      <FlatList
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{alignItems: 'center'}}
        data={filterShops}
        ListHeaderComponent={listHeader}
        keyExtractor={item => item._id}
        renderItem={renderItem}
      />
      <CategoriesActionSheet
        shopType={title}
        changeTitle={setCategoryTitle}
        isOpen={sheetAction == 'categories'}
        onClose={() => setSheetAction('')}
      />
      <SortShopsActionSheet
        isOpen={sheetAction == 'sort'}
        onClose={() => setSheetAction('')}
      />
      <FilterShopsActionSheet
        isOpen={sheetAction == 'filterShops'}
        onClose={() => setSheetAction('')}
      />
    </LoadingLayout>
  );
};

export default ShopsScreen;
