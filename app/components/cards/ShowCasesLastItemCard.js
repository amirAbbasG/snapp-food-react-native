import React from 'react';
import {StyleSheet} from 'react-native';
import {Box, Heading, VStack} from 'native-base';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {ImageBackground} from 'react-native';

const ShowCasesLastItemCard = ({image, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box style={styles.box} p="0.5" shadow={3}>
        <ImageBackground
          blurRadius={4}
          imageStyle={{
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
          }}
          style={styles.imageBackground}
          source={{
            uri: `http://192.168.43.209:4000/${image}`,
          }}></ImageBackground>
        <VStack alignItems="center" flex="1" space="2">
          <Heading size="md" color="#228B22">
            نمایش همه
          </Heading>
          <Icon name="leftcircle" color="#228B22" size={35} />
        </VStack>
      </Box>
    </TouchableOpacity>
  );
};

export default ShowCasesLastItemCard;

const styles = StyleSheet.create({
  imageBackground: {
    height: 115,
    flex: 1,
  },
  box: {
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
    margin: 5,
    borderRadius: 6,
    width: 140,
    flex: 1,
  },
});
