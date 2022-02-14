import React, {useContext, useState, memo} from 'react';
import {Actionsheet, Divider, Input} from 'native-base';
import {useFormikContext} from 'formik';
import {FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {shopsContext} from '../../context';
import {ShopActionSheet} from '../';

const Cities = ({sheetAction, onClose}) => {
  const {supportedCities} = useContext(shopsContext);
  const [search, setSearch] = useState('');
  const data = supportedCities.filter(c => c.name.includes(search));
  const {setFieldValue} = useFormikContext();

  //#region FlatList render Item
  const renderItem = ({item: {name}}) => (
    <>
      <Actionsheet.Item
        onPress={() => {
          setFieldValue('city', name);
          onClose();
        }}
        my="3"
        startIcon={<Icon name="staro" size={15} />}>
        {name}
      </Actionsheet.Item>
      <Divider width="100%" />
    </>
  );
  //#endregion

  return (
    <ShopActionSheet
      title="انتخاب شهر"
      onClose={onClose}
      isOpen={sheetAction == 'cities'}>
      <Input
        variant="filled"
        placeholder="جستجو..."
        my="5"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        key="1"
        data={data}
        keyExtractor={item => item._id}
        renderItem={renderItem}
      />
    </ShopActionSheet>
  );
};

export default memo(Cities);
