import React, {memo} from 'react';
import {Heading, Divider, HStack} from 'native-base';
import {TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileItem = ({title, icon, onPress, header}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {header && (
        <Heading size="md" mt="4" ml="7">
          {header}
        </Heading>
      )}
      <HStack justifyContent="space-between" p="4" alignItems="center">
        <HStack space={3} p="2" alignItems="center">
          {icon && (
            <FastImage
              source={icon}
              style={{width: 30, height: 30}}
              alt="پروفایل"
            />
          )}
          <Heading size="sm">{title}</Heading>
        </HStack>
        <Icon name="chevron-left" size={25} />
      </HStack>
      <Divider w="94%" ml="3%" />
    </TouchableOpacity>
  );
};

export default memo(ProfileItem);
