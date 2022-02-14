import React from 'react';
import {HStack} from 'native-base';
import {Dimensions} from 'react-native';
import {ImageMiniCard} from '../';

const CategoryRow = ({data, onPressItems}) => {
  const screenWidth = Dimensions.get('screen').width;
  return (
    <HStack justifyContent="space-around" py="2" px="5" w={screenWidth}>
      {data.map(item => (
        <ImageMiniCard
          title={item.type}
          key={item._id}
          image={item.imageName}
          onPress={() => onPressItems(item.type)}
        />
      ))}
    </HStack>
  );
};

export default CategoryRow;
