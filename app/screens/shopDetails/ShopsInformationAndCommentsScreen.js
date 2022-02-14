import React, {useState, useCallback} from 'react';
import {Text, Heading, Divider, HStack, VStack, Progress} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import MapView, {Marker} from 'react-native-maps';
import {CommentBox, LoadingLayout} from '../../components';
import {calculateRate} from '../../utils/rateCalculator';

const ShopsInformationAndCommentsScreen = ({route}) => {
  const [loaded, setLoaded] = useState(false);
  const shopDetails = useSelector(state => state.shopDetails);
  const comments = shopDetails.comments;
  const {city, exactAddress, longitude, latitude} = shopDetails.address;
  const commentsCount = comments.length;
  const nonZeroScoreCommentsCount = [...comments].filter(
    c => c.score != 0,
  ).length;

  const scoreRanges = [
    {color: '#FF0000', colorScheme: 'error'},
    {color: '#FF8C00', colorScheme: 'warning'},
    {color: '#9ACD32', colorScheme: 'lime'},
    {color: '#32CD32', colorScheme: 'green'},
    {color: '#008000', colorScheme: 'success'},
  ];

  const getPersentageOfScore = score => {
    const scoreCount = [...comments].filter(
      c => Math.floor(c.score) == score,
    ).length;
    const scorePercentage = (scoreCount * 100) / nonZeroScoreCommentsCount;
    return Math.floor(scorePercentage);
  };

  //#region on screen focused
  useFocusEffect(
    useCallback(() => {
      setLoaded(true);
      return () => {
        setLoaded(false);
      };
    }, []),
  );
  //#endregion
  return (
    <LoadingLayout loaded={loaded}>
      <CommentBox comments={comments} id={shopDetails._id}>
        <Heading p="7" size="md">{`${shopDetails.shopName} (${city})`}</Heading>
        <Divider w="100%" />
        <HStack space={1} p="4">
          <Icon name="location-pin" size={27} />
          <Text w="55%" color="#808080" fontSize="sm" lineHeight="xl">
            {exactAddress}
          </Text>
          <VStack borderRadius="7" shadow="3">
            <MapView
              style={{width: 110, height: 90}}
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
          </VStack>
          <HStack h="18" w="40%" />
        </HStack>
        <Divider w="100%" />
        <HStack p="4" justifyContent="space-between" alignItems="center">
          <VStack alignItems="center" space={2}>
            <Heading size="xl" color="#32CD32">
              {calculateRate(comments)}
            </Heading>
            <Text
              color="#808080"
              fontSize="10">{`از مجموع ${nonZeroScoreCommentsCount} امتیاز و ${commentsCount} نظر`}</Text>
          </VStack>
          <VStack flexDirection="column-reverse">
            {scoreRanges.map((item, index) => (
              <HStack key={index} space={1} alignItems="center">
                <HStack w="8">
                  <Text color="#808080" fontSize="10">
                    {getPersentageOfScore(index + 1)} %
                  </Text>
                </HStack>
                <Progress
                  size="xs"
                  w="20"
                  colorScheme={item.colorScheme}
                  value={getPersentageOfScore(index + 1)}
                />
                <Icon name="star" size={10} color={item.color} />
                <Text color={item.color} fontSize="10">
                  {index + 1}
                </Text>
              </HStack>
            ))}
          </VStack>
        </HStack>
      </CommentBox>
    </LoadingLayout>
  );
};

export default ShopsInformationAndCommentsScreen;
