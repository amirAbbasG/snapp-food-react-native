import React, {memo, useState, useContext} from 'react';
import {TextArea, Text, Divider, Button, VStack} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Stars from 'react-native-stars';
import {ShopActionSheet} from '../';
import {accountContext, shopsContext} from '../../context';

const AddCommentActionSheet = ({onClose, isOpen, id}) => {
  const [commentText, setCommentText] = useState('');
  const [score, setScore] = useState(0);

  const {isLoadingButton} = useContext(accountContext);
  const {addComment} = useContext(shopsContext);

  const handleRating = rate => {
    if (score == 1 && rate == 1) {
      setScore(0);
    } else {
      setScore(rate);
    }
  };

  const handleAddComment = () => {
    const commentBody = {
      text: commentText,
      score,
    };
    addComment(id, commentBody);
    setCommentText('');
    setScore(0);
    onClose();
  };

  return (
    <ShopActionSheet onClose={onClose} isOpen={isOpen} title="افزودن نظر">
      <VStack px="2">
        <TextArea
          onChangeText={setCommentText}
          placeholder="نظر خود را بنویسید..."
          lineHeight={4}
          mb="7"
          w={{
            base: '100%',
            md: '49%',
          }}
        />
        <VStack alignItems="center" space="2">
          <Text>امتیاز دهید</Text>
          <Stars
            half={true}
            rating={score}
            update={handleRating}
            spacing={4}
            count={5}
            fullStar={<Icon name="star" size={49} color="#32CD32" />}
            emptyStar={<Icon name="star-outline" size={49} />}
            halfStar={<Icon name="star-half" size={49} color="#32CD32" />}
          />
        </VStack>
        <Divider my="4" width="100%" />
        <Button
          isDisabled={commentText == ''}
          onPress={handleAddComment}
          isLoading={isLoadingButton}
          w="100%"
          h="10"
          colorScheme="secondary">
          ثبت نظر
        </Button>
      </VStack>
    </ShopActionSheet>
  );
};

export default memo(AddCommentActionSheet);
