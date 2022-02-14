import React from 'react';
import {Actionsheet, Button, Heading, HStack, VStack} from 'native-base';
import {useDispatch} from 'react-redux';
import {removeCart} from '../../redux/action/orderActions';

const RemoveOrderActionSheet = ({onClose, isOpen, orderId}) => {
  const dispatch = useDispatch();
  const handleYes = () => {
    dispatch(removeCart(orderId));
    onClose();
  };

  return (
    <Actionsheet hideDragIndicator onClose={onClose} isOpen={isOpen}>
      <Actionsheet.Content>
        <VStack space="4" w="100%" alignItems="center" pt="6">
          <Heading size="sm" color="#FF0000">
            آیا از حذف این سفارش مطمئنید ؟
          </Heading>
          <HStack
            w="100%"
            alignItems="center"
            justifyContent="space-around"
            p="4">
            <Button
              variant="solid"
              size="lg"
              w="47%"
              colorScheme="secondary"
              onPress={handleYes}>
              بله
            </Button>
            <Button
              size="lg"
              w="47%"
              variant="outline"
              colorScheme="dark"
              onPress={onClose}>
              خیر
            </Button>
          </HStack>
        </VStack>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default RemoveOrderActionSheet;
