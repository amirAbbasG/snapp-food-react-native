import {StyleSheet, Dimensions} from 'react-native';

const height = Dimensions.get('screen').height;

export default StyleSheet.create({
  foodImag: {
    width: '100%',
    height: height * 0.5,
  },
  titleBox: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 17,
  },
  priceBox: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 17,
    height: height * 0.2,
    paddingTop: height * 0.07,
  },
  firstPrice: {
    color: '#808080',
    textDecorationLine: 'line-through',
    textDecorationColor: '#808080',
  },
  discountBox: {
    borderWidth: 1,
    borderColor: '#F700A2',
    justifyContent: 'center',
    borderRadius: 7,
    paddingHorizontal: 3,
  },
});
