import React, {useContext, useState, useEffect} from 'react';
import {ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import LinearGradient from 'react-native-linear-gradient';
import {
  Button,
  Heading,
  VStack,
  HStack,
  View,
  Image,
  ScrollView,
} from 'native-base';
import {
  MyForm,
  SubmitButton,
  ShopAuthFormField,
  ConfirmationCodeInput,
  ComboBox,
  Cities,
  ShopTypes,
} from '../../../components';
import {accountContext, shopsContext} from '../../../context';
import {validateShopAuth} from '../../../utils/validators';
import styles from './style';

const ShopAuthScreen = () => {
  const {isLoadingButton, action} = useContext(accountContext);
  const {handleShopAuth, getSupportedCities} = useContext(shopsContext);
  const [number, setNumber] = useState('');
  const [sheetAction, setSheetAction] = useState('');

  useEffect(() => {
    getSupportedCities();
  }, []);

  return (
    <ScrollView flex="1">
      <ImageBackground
        source={require('../../../assets/images/shop-register-bg.png')}
        style={{
          height: 500,
        }}>
        <LinearGradient
          style={styles.linearGradient}
          colors={['transparent', 'black']}
          locations={[0.2, 0.9]}>
          <HStack justifyContent="space-between">
            <Button
              height="10"
              mt="3"
              leftIcon={<Icon name="cloud-down" size={20} color="#fff" />}
              colorScheme="secondary">
              نرم افزار دخل فروشندگان
            </Button>
            <Image
              width="79"
              height="66"
              alt="logo"
              source={require('../../../assets/images/logo-name.png')}
            />
          </HStack>
          <VStack space={5}>
            <Heading color="#fff" size="2xl">
              همکار اسنپ فود شوید!
            </Heading>
            <Heading color="#fff" size="sm">
              کسب کارتان را آنلاین کنید و فروشتان را افزایش دهید
            </Heading>
          </VStack>
        </LinearGradient>
      </ImageBackground>
      <View style={styles.formBox}>
        <MyForm
          dontUseDefaltSubmitButton={true}
          onSubmit={shop => handleShopAuth(shop)}
          validationSchema={validateShopAuth(action)}
          initialValues={{
            shopType: '',
            city: '',
            shopName: '',
            ownerFullName: '',
            userNumber: '',
            userPassword: '',
            category: '',
            code: '',
          }}>
          <VStack style={styles.form} space={4}>
            <Heading my="5" size="md">
              ثبت نام فروشندگان
            </Heading>

            <ComboBox
              title="نوع فروشگاه"
              onPress={() => setSheetAction('shopTypes')}
            />
            <ComboBox
              title=" انتخاب شهر"
              onPress={() => setSheetAction('cities')}
            />
            <ShopAuthFormField name="shopName" placeholder="نام فروشگاه" />
            <ShopAuthFormField
              name="ownerFullName"
              placeholder="نام مالک فروشگاه"
            />
            <ShopAuthFormField
              name="userNumber"
              placeholder="شماره کاربر"
              value={number}
              changeNumber={setNumber}
              isDisabled={action != ''}
            />
            <ShopAuthFormField name="userPassword" placeholder="پسورد" />
            {action == 'register' && <ConfirmationCodeInput />}
            <SubmitButton title="تایید" isLoading={isLoadingButton} />
          </VStack>
          <Cities
            sheetAction={sheetAction}
            onClose={() => setSheetAction('')}
          />
          <ShopTypes
            sheetAction={sheetAction}
            onClose={() => setSheetAction('')}
          />
        </MyForm>
      </View>
    </ScrollView>
  );
};

export default ShopAuthScreen;
