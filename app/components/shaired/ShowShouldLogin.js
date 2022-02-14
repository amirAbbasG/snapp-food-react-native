import React from 'react';
import {Button, Container, Text, Center} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

const ShowShouldLogin = ({navigation}) => {
  return (
    <Center flex={1} mb="10">
      <Container alignItems="center">
        <Icon name="list-alt" size={100} color="lightgray" />
        <Text mt="8" fontWeight="normal" color="muted.400">
          برای ادامه نیاز به ورود / عضویت است
        </Text>
        <Button
          mt="8"
          style={{borderRadius: 30}}
          py="3"
          px="8"
          variant="outline"
          colorScheme="secondary"
          onPress={() => navigation.navigate('UserAuthScreen')}>
          ورود / عضویت
        </Button>
      </Container>
    </Center>
  );
};

export default ShowShouldLogin;
