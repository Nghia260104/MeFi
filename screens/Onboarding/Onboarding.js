import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import items from './item';
import RenderItem from './RenderItem';
import {horizontalScale} from '../../assets/styles/scaling';
import Pagination from './Pagination';
import Button from './Button';
import {useNavigation} from '@react-navigation/native';

const Onboarding = () => {
  const navigation = useNavigation();
  const flatlistRef = useAnimatedRef();

  const x = useSharedValue(0);
  const flatlistIndex = useSharedValue(0);
  const onViewableItemsChanged = (
    {viewableItems} = {
      viewableItems: [],
    },
  ) => {
    if (viewableItems[0].index !== null) {
      flatlistIndex.value = viewableItems[0].index;
    }
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <Animated.FlatList
        ref={flatlistRef}
        horizontal={true}
        data={items}
        onScroll={onScroll}
        renderItem={({item, index}) => (
          <RenderItem item={item} index={index} x={x} />
        )}
        keyExtractor={item => item.id}
        bounces={false}
        scrollEventThrottle={16}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10,
        }}
      />
      <View style={[styles.bottomContainer]}>
        <Pagination data={items} x={x} />
        <Button
          flatListIndex={flatlistIndex}
          flatListRef={flatlistRef}
          dataLength={items.length}
          x={x}
          navigation={navigation}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: horizontalScale(25),
    right: 0,
    left: 0,
    marginHorizontal: horizontalScale(23),
  },
});

export default Onboarding;
