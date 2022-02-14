import React, {useState, useContext, useEffect} from 'react';
import {Dimensions, Linking} from 'react-native';
import {VStack, HStack, Button, Text, Divider, Input} from 'native-base';
import MapView, {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Entypo';
import styles from './style';
import {separatePrice} from '../../utils/priceSeparator';
import {useDispatch, useSelector} from 'react-redux';
import {accountContext, globalContext, shopsContext} from '../../context';
import {checkPaymentApi} from '../../api/orderApi';
import {getUserOrders} from '../../redux/action/orderActions';
const screenHeight = Dimensions.get('screen').height;

const ConfirmOrderScreen = ({route, navigation}, props) => {
  const {orderId} = route.params;
  const [discountCode, setDiscountCode] = useState('');
  const [loadingPayment, setLoadingPayment] = useState(false);

  const orders = useSelector(state => state.orders);
  const order = orders.find(o => o._id == orderId);
  const {exactAddress, longitude, latitude} = order.address;
  const shop = useSelector(state => state.shops).find(
    s => s._id == order.shopId._id,
  );

  let couponDiscount = 0;
  if (order.usedCoupon && order.usedCoupon.discount > 0) {
    couponDiscount = (order.amountByDiscount * order.usedCoupon.discount) / 100;
  }

  const {useDiscount} = useContext(shopsContext);
  const {isLoadingButton} = useContext(accountContext);
  const {errorToast} = useContext(globalContext);
  const dispatch = useDispatch();

  const MarkerIcon = ({title}) => (
    <>
      <Text fontSize="md" color="#F700A2" textAlign="center">
        {title}
      </Text>
      <Icon name="location-pin" color="#F700A2" size={40} />
    </>
  );

  //#region payment
  const checkPayment = async orderId => {
    try {
      setLoadingPayment(true);
      const {data} = await checkPaymentApi(orderId);
      setLoadingPayment(false);
      navigation.navigate('PaymentWebView', {url: data.paymentUrl});
    } catch (error) {
      setLoadingPayment(false);
      errorToast(error.response.data.message);
    }
  };

  //#endregion

  return (
    <VStack style={styles.ConfirmOrderScreenContainer}>
      <VStack style={styles.addressBox}>
        <MapView
          style={{width: '100%', height: screenHeight * 0.24}}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            title="مقصد"
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}>
            <MarkerIcon title="مقصد" />
          </Marker>
          <Marker
            coordinate={{
              latitude: shop.address.latitude,
              longitude: shop.address.longitude,
            }}>
            <MarkerIcon title="مبدا" />
          </Marker>
        </MapView>
        <Text m={2}>{exactAddress}</Text>
      </VStack>
      <VStack justifyContent="space-between">
        <Divider w="100%" />
        <Input
          variant="unstyled"
          my={5}
          placeholder="کد تخفیف دارید ؟ "
          onChangeText={setDiscountCode}
          InputLeftElement={<Icon name="ticket" size={17} />}
          fontSize="sm"
          value={discountCode}
          InputRightElement={
            <Button
              isLoading={isLoadingButton}
              onPress={() => {
                useDiscount(orderId, discountCode);
                setDiscountCode('');
              }}
              p={1}
              variant="outline"
              colorScheme="success">
              وارد کردن
            </Button>
          }
        />
        <Divider w="100%" />
      </VStack>
      <HStack style={styles.orderDetailFooter}>
        <VStack space={2}>
          <Text color="#F700A2" fontSize="sm">
            جمع قیمت
          </Text>
          <Text fontSize="md">
            {separatePrice(
              order.amountByDiscount +
                order.shopId.deliveryCost -
                couponDiscount,
            )}{' '}
            تومان
          </Text>
        </VStack>
        <Button
          colorScheme="secondary"
          w={40}
          onPress={() => checkPayment(orderId)}
          isLoading={loadingPayment}>
          پرداخت آنلاین
        </Button>
      </HStack>
    </VStack>
  );
};

export default ConfirmOrderScreen;
