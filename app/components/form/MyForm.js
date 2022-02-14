import React, {useContext, useEffect} from 'react';
import {Divider, View} from 'native-base';
import {Formik} from 'formik';
import {SubmitButton} from '../';
import {accountContext} from '../../context';

const MyForm = ({
  children,
  initialValues,
  onSubmit,
  validationSchema,
  dontUseDefaltSubmitButton,
}) => {
  const {isLoadingButton, setIsLoadingButton} = useContext(accountContext);

  useEffect(() => {
    return () => {
      setIsLoadingButton(false);
    };
  }, []);
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {() => (
        <>
          {children}
          {!dontUseDefaltSubmitButton && (
            <View flex="1" justifyContent="flex-end">
              <Divider my="4" width="100%" />
              <SubmitButton title="تایید" isLoading={isLoadingButton} />
            </View>
          )}
        </>
      )}
    </Formik>
  );
};

export default MyForm;
