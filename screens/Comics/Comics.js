import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import CustomTitle from '../../component/customTitle';
import {useDispatch, useSelector} from 'react-redux';
import {getComics} from '../../actions/comic';
import LottieView from 'lottie-react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';

import ComingSoon from './ComingSoon.svg';
import {getFontFamily} from '../../assets/fonts/helper';
import {useNavigation} from '@react-navigation/native';

const Comics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const comics = useSelector(state => state.comic.comics);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchComics = async () => {
      if (comics.length === 0) {
        setIsLoading(true);
        await dispatch(getComics());
      } else {
        setIsLoading(false);
      }
    };

    fetchComics();
  }, [comics.length, dispatch]);

  const handlePress = () => {
    navigation.navigate('ComicsDetail', {comic: comics.comics[0]});
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <CustomTitle title="Comics" />
      <View>
        {isLoading ? (
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              flex: 0.95,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <LottieView
              style={{
                width: horizontalScale(200),
                height: horizontalScale(200),
              }}
              source={require('../../assets/images/Loading.json')}
              autoPlay
              loop
            />
          </View>
        ) : (
          <ScrollView>
            <View style={styles.contentContainer}>
              <View style={styles.comicContainer}>
                <Pressable onPress={handlePress}>
                  <Image
                    source={{
                      uri: `data:image/jpg;base64,${comics.comics[0].cover}`,
                    }}
                    style={{
                      borderRadius: horizontalScale(12),
                      width: horizontalScale(130),
                      height: verticalScale(180),
                    }}
                  />
                </Pressable>
                <Text style={styles.title}>{comics.comics[0].title}</Text>
              </View>
              <View style={styles.comicContainer}>
                <View style={{borderRadius: horizontalScale(12)}}>
                  <ComingSoon
                    width={horizontalScale(130)}
                    height={verticalScale(180)}
                  />
                </View>
                <Text style={styles.title}>Coming soon</Text>
              </View>
              <View style={styles.comicContainer}>
                <ComingSoon
                  width={horizontalScale(130)}
                  height={verticalScale(180)}
                />
                <Text style={styles.title}>Coming soon</Text>
              </View>
              <View style={styles.comicContainer}>
                <ComingSoon
                  width={horizontalScale(130)}
                  height={verticalScale(180)}
                />
                <Text style={styles.title}>Coming soon</Text>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 0.945,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: horizontalScale(20),
    marginTop: verticalScale(25),
  },
  comicContainer: {
    width: 167,
    height: 250,
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  title: {
    fontSize: scaleFontSize(13),
    fontFamily: getFontFamily(600, ''),
    marginTop: verticalScale(10),
    color: '#000',
    width: 167,
    textAlign: 'center',
  },
});

export default Comics;
