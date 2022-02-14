import React from 'react';
import {Input, FormControl, VStack} from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';
import {useFormikContext} from 'formik';

const UserInformationInput = ({title, value, name, isReadOnly}) => {
  const {handleChange} = useFormikContext();
  return (
    <VStack my="8">
      <FormControl.Label>{title}</FormControl.Label>
      <Input
        fontSize="15"
        onChangeText={handleChange(name)}
        variant="underlined"
        defaultValue={value}
        isReadOnly={isReadOnly}
        placeholder={title}
        InputRightElement={
          value && <Icon name="dot-single" color="#228B22" size={40} />
        }
      />
    </VStack>
  );
};

export default UserInformationInput;
