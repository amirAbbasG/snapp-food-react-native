import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import {getUserCommentsApi} from '../../api/userApi';
import {CommentCard, LoadingLayout} from '../../components';

const UserCommentsScreen = () => {
  const [loaded, setLoaded] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const setData = async () => {
      const {status, data} = await getUserCommentsApi();
      if (status === 200) {
        setComments(data.comments);
        setLoaded(true);
      }
    };
    setData();
  }, []);

  //#region flat list item
  const RenderItem = ({item}) => <CommentCard comment={item} />;
  //#endregion

  return (
    <LoadingLayout loaded={loaded}>
      <FlatList
        data={[...comments].reverse()}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={RenderItem}
      />
    </LoadingLayout>
  );
};

export default UserCommentsScreen;
