/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Image, Text, FlatList} from 'react-native';
import CustomTitle from '../../../component/customTitle';
import {useRoute} from '@react-navigation/native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../../assets/styles/scaling';
import {getFontFamily} from '../../../assets/fonts/helper';
import ComicsChapter from './renderItem';

const ItemSeparator = () => <View style={{height: verticalScale(10)}} />;

const ComicsDetail = () => {
  const route = useRoute();
  const comic = route.params;

  const renderItem = ({item, index}) => (
    <ComicsChapter title={item.title} image={item.image} index={index} />
  );

  return (
    <View style={styles.container}>
      <CustomTitle goBack={true} customStyle={{borderBottomWidth: 0}} />
      <View style={styles.contentContainer}>
        <Image
          source={{
            uri: `data:image/jpg;base64,${comic.comic.cover}`,
          }}
          style={styles.image}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{comic.comic.title}</Text>
          <Text style={styles.author}>MEMO TEAM</Text>
        </View>
        <FlatList
          data={comic.comic.chapter}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          style={styles.chapterList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: horizontalScale(15),
  },
  image: {
    width: '100%',
    height: verticalScale(400),
    borderRadius: horizontalScale(10),
  },
  titleContainer: {
    marginTop: verticalScale(15),
    gap: verticalScale(5),
    borderBottomWidth: 1,
    borderColor: '#ABABAB',
    width: '100%',
    paddingBottom: verticalScale(10),
  },
  title: {
    fontSize: scaleFontSize(17),
    fontFamily: getFontFamily(700, ''),
    color: '#000',
  },
  author: {
    fontSize: scaleFontSize(13),
    fontFamily: getFontFamily(400, ''),
    color: '#595959',
  },
  chapterList: {
    marginTop: verticalScale(10),
    padding: horizontalScale(5),
  },
});

export default ComicsDetail;
