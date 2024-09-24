import React, {useEffect, useRef} from 'react';
import {View, Dimensions} from 'react-native';
import SliderItem from './SliderItem';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {ItemType} from './Data';

type Props = {
  itemList: ItemType[];
  setSelectedOptions: (options: {title: string; selected: string}[]) => void;
  initialIndex: number;
};

const {width} = Dimensions.get('window');
const ITEM_WIDTH = width * 0.8;
const SPACING = (width - ITEM_WIDTH) / 2;

const Slider = ({itemList, setSelectedOptions, initialIndex}: Props) => {
  const scrollX = useSharedValue(0);

  const flatListRef = useRef(null); // Create a ref for the FlatList

  // Scroll to the initial index when the component mounts
  useEffect(() => {
    if (flatListRef.current && initialIndex !== undefined) {
      flatListRef.current.scrollToOffset({
        offset: initialIndex * (ITEM_WIDTH + SPACING * 2),
        animated: false,
      });
    }
  }, [initialIndex]);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      scrollX.value = e.contentOffset.x;
    },
  });

  return (
    <View>
      <Animated.FlatList
        ref={flatListRef}
        data={itemList}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <SliderItem
            item={item}
            index={index}
            scrollX={scrollX}
            setSelectedOptions={setSelectedOptions}
          />
        )}
        onScroll={onScrollHandler}
        bounces={false}
        pagingEnabled
        decelerationRate="fast"
        snapToInterval={ITEM_WIDTH + SPACING * 2}
        snapToAlignment="center"
        scrollEventThrottle={16}
      />
    </View>
  );
};

export default Slider;
