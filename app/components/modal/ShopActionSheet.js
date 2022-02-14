import React, {memo} from 'react';
import Icon from 'react-native-vector-icons/Fontisto';
import {
  Actionsheet,
  Heading,
  HStack,
  Divider,
  IconButton,
  Box,
} from 'native-base';

const ShopActionSheet = ({isOpen, onClose, children, title}) => {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator>
      <Actionsheet.Content>
        <Box width="100%">
          <HStack justifyContent="space-between" p="4" alignItems="center">
            <Heading size="md">{title}</Heading>
            <IconButton
              onPress={onClose}
              icon={<Icon name="close" size={17} />}
            />
          </HStack>
          <Divider />
          {children}
        </Box>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default memo(ShopActionSheet);
