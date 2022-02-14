import React from 'react';
import {Button} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RoundedIconButton = ({icon, title, onPress}) => {
  return (
    <Button
      onPress={onPress}
      variant="outline"
      size="sm"
      py="1"
      px="2"
      ml="1"
      my="1"
      colorScheme="emerald"
      style={{borderRadius: 30}}
      leftIcon={<Icon name={icon} color="#228B22" size={14} />}>
      {title}
    </Button>
  );
};

export default RoundedIconButton;
