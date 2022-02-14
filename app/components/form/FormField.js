import React from 'react';
import {useFormikContext} from 'formik';
import {Input, Text} from 'native-base';

const FormField = ({
  name,
  title,
  changeNumber,
  isDisabled = false,
  ...otherProps
}) => {
  const {errors, handleChange, touched, setFieldTouched} = useFormikContext();
  return (
    <>
      <Text mt="8">{title}</Text>
      <Input
        {...otherProps}
        isDisabled={isDisabled}
        variant="underlined"
        onChangeText={handleChange(name)}
        onChange={e => {
          changeNumber && changeNumber(e.nativeEvent.text);
        }}
        onPressIn={() => setFieldTouched(name)}
      />
      {touched[name] && errors[name] ? (
        <Text mt="2" ml="1" color="#FF0000">
          {errors[name]}
        </Text>
      ) : null}
    </>
  );
};

export default FormField;
