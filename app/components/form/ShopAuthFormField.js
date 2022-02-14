import React, {memo} from 'react';
import {Input} from 'native-base';
import {useFormikContext} from 'formik';

const ShopAuthFormField = ({
  name,
  placeholder,
  changeNumber,
  isDisabled,
  ...otherProps
}) => {
  const {handleChange} = useFormikContext();
  return (
    <Input
      {...otherProps}
      onChange={e => {
        changeNumber && changeNumber(e.nativeEvent.text);
      }}
      isDisabled={isDisabled}
      onChangeText={handleChange(name)}
      height="58"
      variant="outline"
      placeholder={placeholder}
    />
  );
};

export default memo(ShopAuthFormField);
