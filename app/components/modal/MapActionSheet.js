import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Actionsheet, Heading, Text} from 'native-base';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {globalContext, accountContext} from '../../context';

const MapActionSheet = ({isOpen, onClose}) => {
  const {errorToast} = useContext(globalContext);
  const {addAddress} = useContext(accountContext);

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      error => {
        errorToast(error.message.toString());
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      },
    );
  }, []);

  const onSelectLocation = coordinates => {
    setLatitude(coordinates.latitude);
    setLongitude(coordinates.longitude);
  };

  const onSubmit = () => {
    addAddress({latitude, longitude});
    onClose();
  };
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content style={styles.sheet}>
        <Heading alignSelf="flex-start" size="sm" mb="5">
          انتخاب آدرس
        </Heading>
        <Text>برای مشاهده بهترین پیشنهاد ها ابتدا موقعیتتان را مشخص کنید</Text>
        <View style={styles.MainContainer}>
          <MapView
            style={styles.mapStyle}
            zoomEnabled
            showsMyLocationButton={true}
            showsUserLocation={true}
            zoomControlEnabled
            onLongPress={event =>
              onSelectLocation(event.nativeEvent.coordinate)
            }
            region={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              coordinate={{
                latitude: latitude,
                longitude: longitude,
              }}
            />
          </MapView>
        </View>
        <Button
          w="92%"
          h="39"
          mt="2"
          colorScheme="secondary"
          onPress={onSubmit}>
          تایید
        </Button>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default MapActionSheet;

const styles = StyleSheet.create({
  MainContainer: {
    height: 350,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  sheet: {
    height: 500,
    justifyContent: 'flex-end',
  },
});
