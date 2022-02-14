import React from 'react';
import {HStack, Text, VStack, Divider} from 'native-base';
import {useSelector} from 'react-redux';
import {separatePrice} from '../../utils/priceSeparator';

const Factor = ({orderId}) => {
  const orders = useSelector(state => state.orders);
  const order = orders.find(o => o._id == orderId);

  const PriceItem = ({title, price, color}) => (
    <HStack justifyContent="space-between" py={1} alignItems="center">
      <Text color={color && color} fontSize="sm">
        {title}
      </Text>
      <Text color={color && color} fontSize="sm">
        {separatePrice(price)} تومان
      </Text>
    </HStack>
  );
  return (
    <VStack space={2} p={4}>
      {order.foods.map(f => (
        <PriceItem
          key={f._id}
          title={`${f.name} (${f.count})`}
          price={f.price}
        />
      ))}
      <Divider w="100%" />
      <PriceItem title="مجموع سفارش" price={order.amount} />
      <PriceItem
        color="#F700A2"
        title="تخفیف"
        price={order.amount - order.amountByDiscount}
      />
      <PriceItem title="هزینه ارسال" price={order.shopId.deliveryCost} />
      <Divider w="100%" />
      <PriceItem
        color="#32CD32"
        title="جمع کل"
        price={order.amountByDiscount + order.shopId.deliveryCost}
      />
    </VStack>
  );
};

export default Factor;
