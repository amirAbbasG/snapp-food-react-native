import React from 'react';
import {Center, Text, HStack} from 'native-base';
import {TouchableWithoutFeedback, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

const SearchBox = ({searchBoxHeight}) => {
  const navigation = useNavigation();
  return (
    <Animated.View
      style={{backgroundColor: '#fefefe', height: searchBoxHeight}}>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('SearchScreen')}>
        <HStack
          backgroundColor="#eaeaea"
          h="12"
          flex="1"
          borderRadius="6"
          my="3"
          mx="4"
          px="4"
          justifyContent="space-between">
          <Center>
            <Text color="#b2b2b2">جستجو در اسنپ فود</Text>
          </Center>
          <Center>
            <Icon name="search" size={25} color="#b2b2b2" />
          </Center>
        </HStack>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

export default SearchBox;
