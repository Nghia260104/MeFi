import React from 'react';
import {Text, StyleSheet, Image, Pressable} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../../assets/styles/scaling';
import {getFontFamily} from '../../../assets/fonts/helper';
import {useNavigation} from '@react-navigation/native';

const ComicsChapter = ({image, title, index}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('ReadingComics', {initialIndex: index});
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Image
        style={styles.image}
        source={{uri: `data:image/jpg;base64,${image}`}}
      />
      <Text style={styles.chapter}>
        Chap {index + 1} - {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F6F5F3',
    width: '100%',
    height: verticalScale(100),
    padding: horizontalScale(10),
    borderRadius: horizontalScale(12),
    elevation: 1,
    gap: horizontalScale(10),
  },
  image: {
    width: horizontalScale(75),
    height: '100%',
  },
  chapter: {
    fontSize: scaleFontSize(13),
    fontFamily: getFontFamily(700, ''),
    color: '#000',
    numberOfLines: 2,
    width: '70%',
  },
});

export default ComicsChapter;
