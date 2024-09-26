import {useRoute} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

const {width} = Dimensions.get('window');
const ITEM_WIDTH = width;

const ReadingComics = () => {
  const route = useRoute();
  const {initialIndex} = route.params;
  const comics = useSelector(state => state.comic.comics);
  const flatListRef = useRef(null);

  useEffect(() => {
    if (flatListRef.current && initialIndex !== undefined) {
      flatListRef.current.scrollToIndex({
        index: initialIndex,
        animated: false,
      });
    }
  }, [initialIndex]);

  const handleScrollToIndexFailed = info => {
    const wait = new Promise(resolve => setTimeout(resolve, 500));
    wait.then(() => {
      if (
        flatListRef.current &&
        typeof info.index === 'number' &&
        info.index >= 0
      ) {
        flatListRef.current.scrollToIndex({
          index: info.index,
          animated: false,
        });
      }
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        style={styles.listContainer}
        data={comics.comics[0].chapter}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.imageContainer}>
            <Image
              source={{uri: `data:image/jpg;base64,${item.image}`}}
              style={styles.image}
            />
          </View>
        )}
        onScrollToIndexFailed={handleScrollToIndexFailed}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  image: {
    width: ITEM_WIDTH,
    height: '70%',
  },
  imageContainer: {
    width: ITEM_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
    width: ITEM_WIDTH,
  },
});

export default ReadingComics;
