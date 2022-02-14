import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
const DrawerLable = ({name}) => {
  return (
    <View
      style={{
        justifyContent: 'space-between',
        flex: 1,
        flexDirection: 'row',
      }}>
      <Text style={{fontFamily: 'Iranian Sans', fontSize: 15}}>{name}</Text>

      <Icon name="angle-left" size={17} />
    </View>
  );
};

export default DrawerLable;
