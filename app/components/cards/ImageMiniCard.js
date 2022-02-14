import React, {memo} from 'react';
import {Center, Text} from 'native-base';
import {TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

const ImageMiniCard = ({image, title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Center>
        <FastImage
          source={{
            uri: `http://192.168.43.209:4000/${image}`,
            priority: FastImage.priority.normal,
          }}
          style={{width: 65, height: 65, borderRadius: 10}}
          alt="شیرینی"
        />
        <Text mt="2" textAlign="center">
          {title}
        </Text>
      </Center>
    </TouchableOpacity>
  );
};

export default memo(ImageMiniCard);
