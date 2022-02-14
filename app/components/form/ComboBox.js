import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import {HStack, Text} from 'native-base';

const ComboBox = ({onPress, title}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <HStack
        h="58"
        borderWidth="1"
        borderColor="#e2e2e2"
        borderRadius="3"
        justifyContent="space-between"
        p="2"
        alignItems="center">
        <Text>{title}</Text>
        <Icon name="caret-down" size={10} style={{marginRight: 10}} />
      </HStack>
    </TouchableWithoutFeedback>
  );
};

export default ComboBox;
