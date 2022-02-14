import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {HStack, Text} from 'native-base';
import Icon from 'react-native-vector-icons/Fontisto';

const RateBox = ({
  title,
  icon = 'star',
  backgroundColor = '#eafcf4',
  color = '#228B22',
}) => {
  return (
    <HStack width="10" style={[styles.rateBox, {backgroundColor}]}>
      <Text fontSize="xs" fontWeight="100" color={color}>
        {title}
      </Text>
      <Icon name={icon} color={color} size={10} />
    </HStack>
  );
};

export default memo(RateBox);

const styles = StyleSheet.create({
  rateBox: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 3,
  },
});
