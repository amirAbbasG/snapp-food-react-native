import React from 'react';
import {useFormikContext} from 'formik';
import {Button} from 'native-base';

const SubmitButton = ({title, isLoading}) => {
  const {handleSubmit, isValid} = useFormikContext();
  return (
    <Button
      isDisabled={!isValid}
      onPress={handleSubmit}
      isLoading={isLoading}
      w="100%"
      h="10"
      colorScheme="secondary">
      {title}
    </Button>
  );
};

export default SubmitButton;
