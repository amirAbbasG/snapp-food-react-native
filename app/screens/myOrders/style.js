import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  buttonBox: {
    padding: 10,
    justifyContent: 'space-between',
  },
  foodItem: {
    justifyContent: 'space-between',
    padding: 9,
    alignItems: 'center',
  },
  foodBox: {
    width: '100%',
    paddingVertical: 8,
    flex: 1,
    justifyContent: 'flex-end',
  },
  orderDetailFooter: {
    padding: 14,
    justifyContent: 'space-between',
    borderTopColor: '#808080',
    borderTopWidth: 0.3,
  },
  foodImage: {
    width: 60,
    height: 60,
    borderRadius: 7,
    borderColor: '#808080',
    borderWidth: 0.4,
  },

  priceItem: {
    justifyContent: 'space-between',
    paddingVertical: 5,
    alignItems: 'center',
  },
  activeOrderDetailContainer: {
    flex: 1,
    padding: 14,
  },
  ConfirmOrderScreenContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 17,
    paddingTop: 20,
  },

  addressBox: {
    borderColor: '#228B22',
    borderRadius: 7,
    borderWidth: 1,
  },
});
