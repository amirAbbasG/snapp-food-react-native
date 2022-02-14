import React, {useState, useCallback} from 'react';
import {View, Animated} from 'react-native';
import {ScrollView} from 'native-base';
import styles from './style';
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {
  SearchBox,
  ShopTypesBox,
  RestaurantCategoriesBox,
  ShopsShowcases,
  MyContentLoader,
} from '../../components';
import {getMeal} from '../../utils/mealCalculator';
import {calculateRate, getFoodWithDiscount} from '../../utils/rateCalculator';
import {clearShopDetails} from '../../redux/action/shopsActions';

const MainScreen = () => {
  const shops = useSelector(state => state.shops);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  //#region search box height
  const scrollY = new Animated.Value(0);
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [60, 0],
    extrapolate: 'clamp',
  });
  //#endregion

  useFocusEffect(
    useCallback(() => {
      setLoaded(true);
      dispatch(clearShopDetails());
      return () => setLoaded(false);
    }, []),
  );

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      {loaded ? (
        <>
          <SearchBox searchBoxHeight={headerHeight} />
          <ScrollView
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
            scrollEventThrottle={16}>
            <ShopTypesBox />
            <RestaurantCategoriesBox />
            <ShopsShowcases
              shops={[...shops].reverse().slice(0, 14)}
              title="تازه ها در اسنپ فود"
            />
            <ShopsShowcases
              shops={[...shops].filter(s => s.shopType == 'رستوران')}
              title={` ${getMeal()} در اسنپ فود`}
            />
            <ShopsShowcases
              shops={[...shops]
                .filter(s => getFoodWithDiscount(s.foods).length > 0)
                .slice(0, 14)}
              title="دارای تخفیف"
            />
            <ShopsShowcases
              shops={[...shops].filter(s => s.coupons.length > 0)}
              title="دارای کوپن"
            />
            <ShopsShowcases
              shops={[...shops].sort(
                (a, b) => calculateRate(b.comments) - calculateRate(a.comments),
              )}
              title="بهترین ها در اسنپ فود"
            />
          </ScrollView>
        </>
      ) : (
        <MyContentLoader />
      )}
    </View>
  );
};

export default MainScreen;
