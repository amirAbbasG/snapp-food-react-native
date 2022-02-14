import React from 'react';
import {Spinner, View} from 'native-base';

const LoadingLayout = ({loaded, children}) => {
  return (
    <>
      {loaded ? (
        <View flex="1">{children}</View>
      ) : (
        <Spinner mt="50%" size="lg" color="#F700A2" />
      )}
    </>
  );
};

export default LoadingLayout;
