import React, {memo} from 'react';
import {Actionsheet, HStack, Divider, Switch} from 'native-base';

const FilterItem = ({title, onToggle, value}) => {
  return (
    <>
      <Actionsheet.Item
        rightIcon={
          <>
            <HStack flex="1"></HStack>
            <Switch
              isChecked={value}
              onToggle={onToggle}
              colorScheme="emerald"
              size="lg"
            />
          </>
        }
        my="2">
        {title}
      </Actionsheet.Item>
      <Divider w="100%" />
    </>
  );
};

export default memo(FilterItem);
