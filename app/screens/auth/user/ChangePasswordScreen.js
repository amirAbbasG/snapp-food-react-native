import React, {useContext} from 'react';
import {Heading, View} from 'native-base';
import {MyForm, UserInformationInput} from '../../../components';
import {accountContext} from '../../../context';
import {changePasswordSchema} from '../../../utils/validators';
import styles from './style';

const ChangePasswordScreen = () => {
  const {changeAuthenticatedUserPassword} = useContext(accountContext);
  return (
    <View style={styles.userInfoBox}>
      <Heading size="md">تغییر رمز عبور</Heading>
      <MyForm
        validationSchema={changePasswordSchema}
        initialValues={{oldPassword: '', newPassword: ''}}
        onSubmit={passwords => changeAuthenticatedUserPassword(passwords)}>
        <UserInformationInput title="پسورد فعلی" name="oldPassword" />
        <UserInformationInput title="پسورد جدید" name="newPassword" />
      </MyForm>
    </View>
  );
};

export default ChangePasswordScreen;
