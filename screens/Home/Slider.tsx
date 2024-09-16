import React from 'react';
import {View, Dimensions} from 'react-native';
import {ItemType} from './Data';
import SliderItem from './SliderItem';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

type Props = {
  itemList: ItemType[];
};

const {width} = Dimensions.get('window');
const ITEM_WIDTH = width * 0.8; // Set the item width to 80% of the screen
const SPACING = (width - ITEM_WIDTH) / 2; // Calculate the spacing for centering

const Slider = ({itemList}: Props) => {
  const scrollX = useSharedValue(0);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      scrollX.value = e.contentOffset.x;
    },
  });

  return (
    <View>
      <Animated.FlatList
        data={itemList}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <SliderItem item={item} index={index} scrollX={scrollX} />
        )}
        onScroll={onScrollHandler}
        bounces={false}
        decelerationRate="fast" // This helps with smooth scrolling
        snapToInterval={ITEM_WIDTH + SPACING * 2} // Snap to the width of the item + spacing
        snapToAlignment="center" // Align items to the center
        scrollEventThrottle={16} // Ensures the scroll handler fires smoothly
      />
    </View>
  );
};

export default Slider;
