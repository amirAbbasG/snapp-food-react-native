import React, {useState, memo} from 'react';
import {Actionsheet, Accordion, ScrollView} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useFormikContext} from 'formik';
import {useSelector} from 'react-redux';
import {ShopActionSheet} from '../';

const ShopTypes = ({onClose, sheetAction}) => {
  const shopTypes = useSelector(state => state.shopTypes);
  const [selectedCategory, setSelectedCategory] = useState('');
  const {setFieldValue} = useFormikContext();

  const onSelectCategory = category => {
    const shopType = shopTypes.filter(t => t.categories.includes(category));
    setFieldValue('shopType', shopType[0].type);
    setFieldValue('category', category);
    setSelectedCategory(category);
    onClose();
  };

  return (
    <ShopActionSheet
      title="نوع فروشگاه"
      isOpen={sheetAction == 'shopTypes'}
      onClose={onClose}>
      <ScrollView key="2">
        <Accordion>
          {shopTypes.map(item => (
            <Accordion.Item key={item._id}>
              <Accordion.Summary>
                {item.type}
                <Accordion.Icon />
              </Accordion.Summary>
              <Accordion.Details>
                {item.categories.map((c, index) => (
                  <Actionsheet.Item
                    onPress={() => onSelectCategory(c)}
                    startIcon={
                      <Icon
                        name={
                          c == selectedCategory ? 'check-circle' : 'circle-thin'
                        }
                        color={c == selectedCategory ? '#32CD32' : '#000'}
                        size={20}
                      />
                    }
                    my="2"
                    key={index}>
                    {c}
                  </Actionsheet.Item>
                ))}
              </Accordion.Details>
            </Accordion.Item>
          ))}
        </Accordion>
      </ScrollView>
    </ShopActionSheet>
  );
};

export default memo(ShopTypes);
