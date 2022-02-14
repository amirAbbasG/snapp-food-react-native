import React, {useCallback, useState, useContext} from 'react';
import {ImageBackground, FlatList} from 'react-native';
import {IconButton, HStack, VStack, Divider, Button} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {
  FoodCard,
  ShopsDetailsListHeader,
  LoadingLayout,
} from '../../components';
import {useFocusEffect} from '@react-navigation/native';
import {setShopDetails} from '../../redux/action/shopsActions';
import {shopsContext} from '../../context';
import styles from './style';
import {isEmpty} from 'lodash';

const ShopDetailsScreen = ({navigation, route}) => {
  const {shopId} = route.params;
  const shopDetails = useSelector(state => state.shopDetails);
  const account = useSelector(state => state.account);
  const orders = useSelector(state => state.orders);

  let isShopFavorite = false;
  if (!isEmpty(account)) {
    isShopFavorite = account.favoriteShop.some(s => s._id == shopId);
  }
  const shopOrders = orders.find(o => o.shopId._id == shopId && !o.isPaid);

  const [loaded, setLoaded] = useState(false);

  const {addShopToFavorite, removeShopFromFavorite} = useContext(shopsContext);
  const dispatch = useDispatch();

  const TopIcon = ({name, color = '#FFFFE0', onPress}) => (
    <IconButton
      onPress={onPress}
      icon={<Icon name={name} color={color} size={22} />}
    />
  );

  const handlePressFavorite = () => {
    if (isShopFavorite) {
      removeShopFromFavorite(shopId);
    } else {
      addShopToFavorite(shopId);
    }
  };

  //#region on screen focused
  useFocusEffect(
    useCallback(() => {
      dispatch(setShopDetails(shopId));
      setLoaded(true);
      return () => {
        // dispatch(clearShopDetails());
        setLoaded(false);
      };
    }, []),
  );
  //#endregion

  //#region flatList render Items
  const renderItem = ({item}) => <FoodCard food={item} />;
  //#endregion

  return (
    <LoadingLayout loaded={loaded}>
      <ImageBackground
        style={{flex: 1}}
        imageStyle={{marginBottom: 500}}
        source={{
          uri: `http://192.168.43.209:4000/${shopDetails.shopImage}`,
        }}>
        <LinearGradient
          style={styles.linearGradient}
          colors={['black', 'transparent']}
          locations={[0, 0.15]}>
          <HStack p="3" justifyContent="space-between">
            <TopIcon name="chevron-right" onPress={() => navigation.goBack()} />
            <HStack space="2">
              <TopIcon name="history" />
              <TopIcon
                onPress={handlePressFavorite}
                name="heart-o"
                color={isShopFavorite ? '#F700A2' : '#FFFFE0'}
              />
            </HStack>
          </HStack>

          <VStack style={styles.centerBox}>
            <FlatList
              ListHeaderComponent={<ShopsDetailsListHeader />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{padding: 4}}
              data={shopDetails.foods}
              keyExtractor={item => item._id}
              renderItem={renderItem}
            />
            {shopOrders && (
              <VStack alignItems="center" space="3">
                <Divider w="100%" />
                <Button
                  onPress={() => navigation.navigate('CartScreen')}
                  h="10"
                  w="94%"
                  colorScheme="secondary">
                  {`تکمیل فرایند خرید (${shopOrders.foods.length})`}
                </Button>
              </VStack>
            )}
          </VStack>
        </LinearGradient>
      </ImageBackground>
    </LoadingLayout>
  );
};

export default ShopDetailsScreen;
