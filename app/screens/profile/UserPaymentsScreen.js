import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import {getPaymentsApi} from '../../api/orderApi';
import {PaymentCard, LoadingLayout} from '../../components';

const UserPaymentsScreen = () => {
  const [loaded, setLoaded] = useState(false);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const setData = async () => {
      const {status, data} = await getPaymentsApi();
      if (status === 200) {
        setPayments(data.userPayments);
        setLoaded(true);
      }
    };
    setData();
  }, []);

  //#region flat list item
  const RenderItem = ({item}) => <PaymentCard payment={item} />;
  //#endregion

  return (
    <LoadingLayout loaded={loaded}>
      <FlatList
        data={[...payments].reverse()}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={RenderItem}
      />
    </LoadingLayout>
  );
};

export default UserPaymentsScreen;
