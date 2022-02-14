import React from 'react';
import {
  ImageBackground,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const ImageCard = ({title, image, onPress, style}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        blurRadius={1}
        imageStyle={styles.image}
        style={[styles.imageBackground, style]}
        source={{uri: `http://192.168.43.209:4000/${image}`}}>
        <Text style={styles.title}>{title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Iranian Sans',
    fontWeight: 'bold',
    fontSize: 22,
    color: '#FFFFFF',
    textShadowColor: 'rgba(255,99,71,0.7)',
    textShadowOffset: {
      width: 0,
      height: 0,
    },
    textShadowRadius: 10,
  },
  imageBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 130,
    width: 150,
  },
  image: {borderRadius: 10},
});
