import React from 'react';
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
};

const {width} = Dimensions.get('window');
const ITEM_WIDTH = width * 0.8;
const SPACING = (width - ITEM_WIDTH) / 2;

const Slider = ({itemList, setSelectedOptions}: Props) => {
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
