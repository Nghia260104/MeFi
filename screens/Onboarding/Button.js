import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';
import ChevronRight from '../../assets/images/ChevronRight.svg';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {getFontFamily} from '../../assets/fonts/helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Button = ({flatListIndex, flatListRef, dataLength, x, navigation}) => {
  const {width: SCREEN_WIDTH} = useWindowDimensions();

  const buttonAnimationStyle = useAnimatedStyle(() => {
    return {
      width:
        flatListIndex.value === dataLength - 1
          ? withSpring(70)
          : withSpring(36),
      height: 36,
    };
  });

  const chevronAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(70)
              : withTiming(0),
        },
      ],
    };
  });

  const textAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(0)
              : withTiming(-70),
        },
      ],
    };
  });

  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
      ['#FFDF99', '#603EF7', '#FFDF99'],
    );

    return {
      backgroundColor: backgroundColor,
    };
  });

  const handlePress = async () => {
    try {
      await AsyncStorage.setItem('alreadyLaunched', 'true');
      console.log('alreadyLaunched flag set to true');
      navigation.navigate('Sex');
    } catch (error) {
      console.error('Error setting alreadyLaunched flag:', error);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (flatListIndex.value < dataLength - 1) {
          flatListRef.current?.scrollToIndex({index: flatListIndex.value + 1});
        } else {
          handlePress();
        }
      }}>
      <Animated.View
        style={[styles.container, animatedColor, buttonAnimationStyle]}>
        <Animated.Text style={[styles.text, textAnimationStyle]}>
          Next
        </Animated.Text>
        <Animated.View style={[styles.chevronContainer, chevronAnimationStyle]}>
          <ChevronRight width={9.5} />
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: horizontalScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  chevronContainer: {
    position: 'absolute',
    paddingVertical: verticalScale(10),
    paddingRight: horizontalScale(12),
    paddingLeft: horizontalScale(14),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FCA735',
    fontSize: scaleFontSize(14),
    fontFamily: getFontFamily(700, ''),
  },
});

export default Button;
