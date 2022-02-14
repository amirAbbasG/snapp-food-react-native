import React from 'react';
import {Badge, VStack} from 'native-base';

const MyBadge = ({Children, count}) => {
  return (
    <Badge
      colorScheme="secondary"
      mb={-4}
      borderRadius={'100'}
      w="4"
      h="4"
      alignItems={'center'}
      justifyContent={'center'}
      p={0}
      variant="solid"
      zIndex={1}
      alignSelf="flex-start"
      _text={{
        fontSize: 9,
      }}>
      {count}
    </Badge>
  );
};

export default MyBadge;
