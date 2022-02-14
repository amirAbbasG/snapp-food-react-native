import React from 'react';
import {Divider, HStack, View, Heading, Button, useDisclose} from 'native-base';
import {FlatList} from 'react-native';
import {AddCommentActionSheet, CommentCard} from '../';
import {useSelector} from 'react-redux';
import {isEmpty} from 'lodash';

const CommentBox = ({comments, id, children}) => {
  const {isOpen, onClose, onOpen} = useDisclose();
  const account = useSelector(state => state.account);
  const orders = useSelector(state => state.orders);
  let isUserBuyFromShop = false;
  if (!isEmpty(account)) {
    if (orders.some(o => o.shopId._id == id && o.isPaid)) {
      isUserBuyFromShop = true;
    } else {
      [...orders]
        .filter(o => o.isPaid)
        .map(o => {
          o.foods.map(f => {
            if (f._id == id) {
              isUserBuyFromShop = true;
            }
          });
        });
    }
  }

  //#region flat list item
  const RenderItem = ({item}) => <CommentCard comment={item} />;
  //#endregion

  //#region top detail above of comments
  const FlatListHeader = () => (
    <View flex="1">
      {children}
      <Divider w="100%" />
      <HStack
        backgroundColor="#F5F5F5"
        px="7"
        py="2"
        my="3"
        justifyContent="space-between"
        alignItems="center">
        <Heading size="sm">نظرات</Heading>
        {isUserBuyFromShop && (
          <Button
            onPress={onOpen}
            colorScheme="secondary"
            variant="outline"
            size="xs"
            p="1">
            افزودن نظر
          </Button>
        )}
      </HStack>
    </View>
  );
  //#endregion

  return (
    <>
      <FlatList
        ListHeaderComponent={FlatListHeader}
        data={[...comments].reverse()}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={RenderItem}
      />
      <AddCommentActionSheet isOpen={isOpen} onClose={onClose} id={id} />
    </>
  );
};

export default CommentBox;
