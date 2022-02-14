import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';

const CloseIcon = ({onPress}) => {
  return (
    <View
      style={{
        alignItems: 'flex-start',
        flex: 1,
        padding: 20,
        marginBottom: 30,
      }}>
      <TouchableOpacity onPress={onPress}>
        <Icon name="close-a" size={16} />
      </TouchableOpacity>
    </View>
  );
};

export default CloseIcon;
