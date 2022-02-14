import React from 'react';
import {HStack, VStack, Heading, Text, Divider} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {separatePrice} from '../../utils/priceSeparator';
import {getPersianDate, getClock} from './../../utils/dateConvertor';

const PaymentCard = ({payment}) => {
  const paymentDate = getPersianDate(payment.createDate);
  const paymentTime = getClock(payment.createDate);
  return (
    <VStack space={4} p={4}>
      <Heading size="md">{payment.shopId.shopName}</Heading>
      <HStack space={3}>
        <Text fontSize="sm" color="#808080">
          {paymentDate}
        </Text>
        <Text fontSize="sm" color="#808080">
          {paymentTime}
        </Text>
      </HStack>
      <HStack justifyContent="space-between" alignItems="center">
        <HStack width="10">
          <Icon
            name={
              payment.success ? 'check-circle-outline' : 'close-circle-outline'
            }
            size={20}
            color={payment.success ? '#32CD32' : '#FF0000'}
          />
          <Text
            color={payment.success ? '#32CD32' : '#FF0000'}
            fontSize="sm"
            fontWeight="100">
            {payment.success ? 'موفق' : 'ناموفق'}
          </Text>
        </HStack>
        <Text fontSize="md">
          {separatePrice(payment.amount)}
          تومان
        </Text>
      </HStack>

      <Divider w="100%" />
    </VStack>
  );
};

export default PaymentCard;
