import React, {useContext} from 'react';
import {View} from 'react-native';
import styles from './style';
import {accountContext} from '../../context';
import {useSelector} from 'react-redux';
import {ProfileItem} from '../../components';

const ProfileScreen = ({navigation}) => {
  const account = useSelector(state => state.account);
  const {exitAccount} = useContext(accountContext);
  return (
    <View style={{backgroundColor: '#FFFFFF', flex: 1}}>
      <ProfileItem
        header={account.fullName}
        title="نمایش اطلاعات کاربری"
        onPress={() => navigation.navigate('UserInformationsScreen')}
      />
      <ProfileItem
        icon={require('../../assets/images/Message.png')}
        title="پیام ها"
      />
      <ProfileItem
        icon={require('../../assets/images/Comment.png')}
        title="نظرات من"
        onPress={() => navigation.navigate('UserCommentsScreen')}
      />
      <ProfileItem
        icon={require('../../assets/images/Like.png')}
        onPress={() => navigation.navigate('FavoriteShopsScreen')}
        title="رستوران های مورد علاقه"
      />
      <ProfileItem
        onPress={() => navigation.navigate('UserPaymentsScreen')}
        icon={require('../../assets/images/Clipboard.png')}
        title="لیست پرداخت ها"
      />
      <ProfileItem
        icon={require('../../assets/images/Logout.png')}
        title="خروج"
        onPress={exitAccount}
      />
    </View>
  );
};

export default ProfileScreen;
