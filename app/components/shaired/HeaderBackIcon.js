import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

const HeaderBackIcon = props => {
  return (
    <Icon name="chevron-right" size={35} {...props} style={{marginLeft: 18}} />
  );
};

export default HeaderBackIcon;
