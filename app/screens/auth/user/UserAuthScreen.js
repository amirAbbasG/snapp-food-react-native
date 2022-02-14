import React, {useState, useContext, useEffect} from 'react';
import {Heading, View} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {validateAction} from '../../../utils/validators';
import {accountContext} from '../../../context';
import {MyForm, FormField, ConfirmationCodeInput} from '../../../components';
import styles from './style';

const UserAuthScreen = ({navigation}) => {
  const [number, setNumber] = useState('');

  const {
    action,
    handleUserAuthSubmit,
    isLoadingButton,
    setAction,
    setIsLoadingButton,
    forgotPassword,
  } = useContext(accountContext);

  useEffect(() => {
    return () => {
      setAction('');
      setIsLoadingButton(false);
    };
  }, []);

  return (
    <View style={styles.container}>
      <MyForm
        onSubmit={user => handleUserAuthSubmit(user, navigation)}
        initialValues={{
          number: number,
          fullName: '',
          password: '',
          code: '',
        }}
        validationSchema={validateAction(action)}>
        <View>
          {action == '' && <Heading>شماره موبایل خود را وارد کنید</Heading>}
          <FormField
            title="شماره موبایل"
            placeholder="09*********"
            maxLength={11}
            value={number}
            isDisabled={action != '' && true}
            keyboardType="phone-pad"
            name="number"
            changeNumber={setNumber}
          />

          {action == 'register' && (
            <FormField title="نام نام خانوادگی" name="fullName" />
          )}

          {(action == 'register' ||
            action == 'login' ||
            action == 'changePassword') && (
            <FormField secureTextEntry title="کلمه عبور" name="password" />
          )}

          {(action == 'sendCode' || action == 'changePassword') && (
            <ConfirmationCodeInput />
          )}

          {action == 'login' && (
            <TouchableOpacity
              style={{marginTop: 30}}
              onPress={() => forgotPassword(number)}>
              <Heading size="xs" color="#228B22">
                رمز عبور خود را فراموش کردید؟
              </Heading>
            </TouchableOpacity>
          )}
        </View>
      </MyForm>
    </View>
  );
};

export default UserAuthScreen;
