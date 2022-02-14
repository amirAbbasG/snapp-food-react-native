import React, {useContext} from 'react';
import {Heading, View} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {UserInformationInput} from '../../../components';
import styles from './style';
import {MyForm} from '../../../components';
import {accountContext} from '../../../context';

const UserInformationsScreen = ({navigation}) => {
  const account = useSelector(state => state.account);
  const {editProfile} = useContext(accountContext);

  //#region apply changers
  const handleSummit = user => {
    if (user.email == '') {
      editProfile({
        fullName: user.fullName,
      });
    } else {
      editProfile(user);
    }
  };
  //#endregion

  return (
    <View style={styles.userInfoBox}>
      <MyForm
        initialValues={{email: '', fullName: account.fullName}}
        onSubmit={user => handleSummit(user)}>
        <UserInformationInput
          title="نام نام خانوادگی"
          value={account.fullName}
          name="fullName"
        />
        <UserInformationInput
          title="موبایل"
          value={account.number}
          name="number"
          isReadOnly={true}
        />
        <UserInformationInput
          title="ایمیل"
          value={account.email}
          name="email"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('ChangePasswordScreen')}>
          <Heading mt="5" size="sm" color="#228B22">
            تغییر رمز عبور
          </Heading>
        </TouchableOpacity>
      </MyForm>
    </View>
  );
};

export default UserInformationsScreen;
