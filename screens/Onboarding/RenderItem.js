import React from 'react';
import {View, Text, StyleSheet, useWindowDimensions} from 'react-native';
import {horizontalScale, scaleFontSize} from '../../assets/styles/scaling';
import {getFontFamily} from '../../assets/fonts/helper';
import Rutorabbie from '../../assets/images/Rutorabbie.svg';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const RenderItem = ({item, index, x}) => {
  const ImageComponent = item.Image;
  const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = useWindowDimensions();
  const isRutorabbie = ImageComponent === Rutorabbie;
  const imageWidth = isRutorabbie ? SCREEN_WIDTH * 1.1 : SCREEN_WIDTH * 0.96;
  const imageHeight = isRutorabbie ? SCREEN_WIDTH * 1.1 : SCREEN_WIDTH * 0.96;

  const imageStyle = useAnimatedStyle(() => {
    const translateYAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [200, 0, -200],
      Extrapolation.CLAMP,
    );
    return {
      transform: [{translateY: translateYAnimation}],
    };
  });

  const circleAnimation = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [1, 4, 4],
      Extrapolation.CLAMP,
    );
    return {
      transform: [{scale: scale}],
    };
  });

  return (
    <View style={[styles.itemContainer, {width: SCREEN_WIDTH}]}>
      <View style={styles.circleContainer}>
        <Animated.View
          style={[
            {
              width: SCREEN_WIDTH,
              height: SCREEN_WIDTH,
              backgroundColor: item.backgroundColor,
              borderRadius: SCREEN_WIDTH / 2,
            },
            circleAnimation,
          ]}
        />
      </View>
      <View
        style={[
          styles.titleContainer,
          {
            height: SCREEN_HEIGHT * 0.65,
            width: SCREEN_WIDTH * 0.88,
          },
        ]}>
        <Animated.View style={[styles.image, imageStyle]}>
          <ImageComponent width={imageWidth} height={imageHeight} />
        </Animated.View>
        <Text
          style={[
            styles.title,
            {color: item.textColor, width: SCREEN_WIDTH * 0.9},
          ]}>
          {item.title}
        </Text>
      </View>
      <View style={{width: SCREEN_WIDTH - horizontalScale(23) * 2}}>
        <Text
          style={[
            styles.text,
            {color: item.textColor, width: SCREEN_WIDTH * 0.8},
          ]}>
          {item.text}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    justifyContent: 'space-between',
    marginHorizontal: horizontalScale(23),
  },
  title: {
    fontSize: scaleFontSize(36),
    fontFamily: getFontFamily(700),
  },
  text: {
    fontSize: scaleFontSize(13),
    fontFamily: getFontFamily(500, 'Italic'),
    marginHorizontal: horizontalScale(23),
  },
  circleContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default RenderItem;
