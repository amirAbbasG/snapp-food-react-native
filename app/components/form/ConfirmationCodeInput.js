import React from 'react';
import CodeInput from 'react-native-confirmation-code-input';
import {Text} from 'native-base';
import {useFormikContext} from 'formik';

const ConfirmationCodeInput = () => {
  const {touched, errors, handleSubmit, setFieldValue, setFieldTouched} =
    useFormikContext();

  return (
    <>
      <CodeInput
        keyboardType="numeric"
        codeLength={5}
        inactiveColor="#000"
        activeColor="#F700A2"
        className="border-b"
        autoFocus={true}
        onPressIn={() => setFieldTouched('code')}
        codeInputStyle={{fontWeight: '800'}}
        containerStyle={{margin: 10}}
        onFulfill={code => {
          setFieldValue('code', code);
        }}
      />
      {touched['code'] && errors['code'] ? (
        <Text mt="20" ml="12" color="#FF0000">
          {errors['code']}
        </Text>
      ) : null}
    </>
  );
};

export default ConfirmationCodeInput;
