import React, {memo} from 'react';
import {View, HStack} from 'native-base';
import Svg, {Rect} from 'react-native-svg';
import ContentLoader from 'react-native-masked-loader';

const MyContentLoader = () => {
  const ColeredRect = ({color, height, width}) => (
    <View w={width} h={height} mb="6">
      <ContentLoader
        backColor={color}
        forColor="#fefefe"
        MaskedElement={
          <Svg height={height} width="100%" fill={'black'}>
            <Rect rx="8" ry="8" width="100%" height="100%" />
          </Svg>
        }
      />
    </View>
  );

  return (
    <View flex="1" p="6">
      <HStack justifyContent="space-between">
        <ColeredRect width="47%" color="#9ACD32" height={120} />
        <ColeredRect width="47%" color="#FF6347" height={120} />
      </HStack>
      <HStack justifyContent="space-between">
        <ColeredRect width="22%" color="#DEB887" height={74} />
        <ColeredRect width="22%" color="#FFC0CB" height={74} />
        <ColeredRect width="22%" color="#fcff72" height={74} />
        <ColeredRect width="22%" color="#F4A460" height={74} />
      </HStack>
      <ColeredRect width="100%" color="#e5e5e5" height={120} />
      <ColeredRect width="100%" color="#e5e5e5" height={120} />
    </View>
  );
};

export default memo(MyContentLoader);
