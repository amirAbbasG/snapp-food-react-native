import React from 'react';
import {HStack, VStack, Heading, Divider, Text} from 'native-base';
import {getPersianDate} from '../../utils/dateConvertor';
import {RateBox} from '../';

const CommentCard = ({comment}) => {
  const persianDate = getPersianDate(comment.createDate);

  return (
    <VStack p="4" backgroundColor="#FFFFFF">
      <Heading size="xs">{comment.sender}</Heading>
      <HStack justifyContent="space-between" p="5" alignItems="center">
        <Text fontSize="xs" color="#808080">
          {persianDate}
        </Text>
        <HStack pl="4">
          <RateBox title={comment.score == 0 ? '-' : comment.score} />
        </HStack>
      </HStack>
      <Text my="3" color="#696969" mx="5">
        {comment.text}
      </Text>

      {comment.replay != null && (
        <VStack
          p="3"
          space="2"
          my="3"
          borderWidth="1"
          borderRadius="3"
          borderColor="#F700A2">
          <Heading color="#F700A2" size="sm">
            پاسخ مدیر رستوران
          </Heading>
          <Text>{comment.replay}</Text>
        </VStack>
      )}

      <Divider w="100%" />
    </VStack>
  );
};

export default CommentCard;
