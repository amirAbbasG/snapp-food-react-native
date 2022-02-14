import React, {useState, useCallback} from 'react';
import {Image, HStack, Heading, Text} from 'native-base';
import {
  RateBox,
  CommentBox,
  LoadingLayout,
  OrderFoodCounter,
  FoodPriceBox,
} from '../../components';
import styles from './style';
import {calculateRate} from '../../utils/rateCalculator';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const FoodDetailsScreen = ({route}) => {
  const {foodId} = route.params;
  const shopDetails = useSelector(state => state.shopDetails);
  const orders = useSelector(state => state.orders);

  const food = shopDetails.foods.find(f => f._id == foodId);
  const shopOrders = orders.find(o => o.shopId._id == food.shopId && !o.isPaid);
  let foodCountInOrder = 0;
  if (shopOrders) {
    const foodInOrder = shopOrders.foods.find(f => f._id == foodId);
    if (foodInOrder) {
      foodCountInOrder = foodInOrder.count;
    }
  }

  const rate = calculateRate(food.comments);
  const [loaded, setLoaded] = useState(false);

  //#region on screen focused
  useFocusEffect(
    useCallback(() => {
      setLoaded(true);
      return () => {
        setLoaded(false);
      };
    }, []),
  );
  //#endregion

  return (
    <LoadingLayout loaded={loaded}>
      <CommentBox comments={food.comments} id={food._id}>
        <Image
          alt="food-image"
          resizeMode="cover"
          style={styles.foodImag}
          source={{
            uri: `http://192.168.43.209:4000/${food.foodImage}`,
          }}
        />
        <HStack style={styles.titleBox}>
          <Heading size="md"> {food.name}</Heading>
          <HStack space="2">
            <RateBox title={rate == 0 ? 'جدید' : rate} />
            <RateBox
              title={food.comments.length}
              icon="comments"
              color="#fefefe"
              backgroundColor="#808080"
            />
          </HStack>
        </HStack>
        <Text ml="6" color="#808080" fontSize="sm">
          {food.description}
        </Text>
        <HStack style={styles.priceBox}>
          <FoodPriceBox price={food.price} discount={food.discount} />
          <OrderFoodCounter
            foodId={foodId}
            foodCountInOrder={foodCountInOrder}
          />
        </HStack>
      </CommentBox>
    </LoadingLayout>
  );
};

export default FoodDetailsScreen;
