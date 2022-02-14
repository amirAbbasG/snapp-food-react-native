import React from 'react';
import {HStack, IconButton, Box, Text, Button, VStack} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {MyBadge} from '../';

const AppBar = ({onOpenDrawerPress, onPressAddress}) => {
  const orders = useSelector(state => state.orders);
  const ordersInCartCount = [...orders].filter(o => !o.isPaid).length;
  const navigation = useNavigation();
  return (
    <Box safeAreaTop>
      <HStack
        px="1"
        py="0.5"
        justifyContent="space-between"
        alignItems="center"
        backgroundColor="#fefefe">
        <IconButton
          icon={<Icon name="menu" size={30} onPress={onOpenDrawerPress} />}
        />
        <Button
          onPress={onPressAddress}
          p="0.8"
          h="6"
          pl="2"
          borderRadius="20"
          colorScheme="rose"
          rightIcon={
            <AntDesignIcon
              color="#000"
              name="caretdown"
              style={{paddingHorizontal: 5}}
            />
          }>
          <Text color="#DC143C" fontSize="12">
            انتخاب آدرس
          </Text>
        </Button>
        <VStack>
          {ordersInCartCount > 0 && <MyBadge count={ordersInCartCount} />}
          <IconButton
            onPress={() => navigation.navigate('CartScreen')}
            icon={<Icon name="shopping-cart" size={25} />}
          />
        </VStack>
      </HStack>
    </Box>
  );
};

export default AppBar;
