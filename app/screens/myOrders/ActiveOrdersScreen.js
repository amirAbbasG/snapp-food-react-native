import React from 'react';
import {FlatList} from 'react-native';
import {Button, HStack, VStack, Text, Heading} from 'native-base';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {OrderCard} from '../../components';
import styles from './style';

const ActiveOrdersScreen = ({navigation}) => {
  const orders = useSelector(state => state.orders);
  const activeOrders = [...orders].filter(o => o.isPaid && !o.isDelivered);
  //#region flatList render item
  const renderItem = ({item}) => (
    <OrderCard order={item}>
      <VStack space={1} style={styles.foodBox}>
        <HStack justifyContent="space-between" alignItems="center">
          <VStack space="1" my="7">
            <Text color="#808080" fontSize="10">
              در حال آماده سازی سفارش
            </Text>
            <Text fontSize="12">پیک به سمت رستوران</Text>
          </VStack>
          <Heading size="sm">
            <Icon name="clock-outline" size={17} /> 29:30
          </Heading>
        </HStack>
        <Button
          variant="solid"
          size="lg"
          w="100%"
          colorScheme="secondary"
          onPress={() =>
            navigation.navigate('ActiveOrderDetailsScreen', {orderId: item._id})
          }>
          پیگیری سفارش
        </Button>
      </VStack>
    </OrderCard>
  );
  //#endregion

  return (
    <VStack flex={1} backgroundColor="#FFFFFF">
      <FlatList
        data={activeOrders}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
    </VStack>
  );
};

export default ActiveOrdersScreen;
