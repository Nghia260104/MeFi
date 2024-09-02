import React, {useRef, useState} from 'react';
import {
  Animated,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  horizontalScale,
  verticalScale,
  scaleFontSize,
} from '../assets/styles/scaling';
import {getFontFamily} from '../assets/fonts/helper';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomInput = ({
  customStyle,
  placeholder = '',
  onChangeText,
  error,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState('');
  const [showPassword, setShowPassword] = useState(props.secureTextEntry);
  const labelPosition = useRef(new Animated.Value(text ? 1 : 0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    animatedLabel(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!text) {
      animatedLabel(0);
    }
  };

  const handleTextChange = text => {
    setText(text);
    if (onChangeText) {
      onChangeText(text);
    }
    if (text) {
      animatedLabel(1);
    } else {
      animatedLabel(isFocused ? 1 : 0);
    }
  };

  const animatedLabel = toValue => {
    Animated.timing(labelPosition, {
      toValue: toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const labelStyle = {
    left: horizontalScale(10),
    top: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [17, 0],
    }),
    fontSize: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [scaleFontSize(15), scaleFontSize(10)],
    }),
    color: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: ['#808080', '#818181'],
    }),
    fontFamily: getFontFamily(
      'FZ Poppins',
      labelPosition.interpolate({
        inputRange: [0, 1],
        outputRange: [400, 600],
      }),
      '',
    ),
  };

  return (
    <View style={customStyle}>
      <View style={styles.innerContainer}>
        <Animated.Text style={[styles.label, labelStyle]}>
          {placeholder}
        </Animated.Text>
        <View style={styles.inputContainer}>
          <TextInput
            {...props}
            style={styles.input}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={handleTextChange}
            value={text}
            textAlignVertical="center"
            textContentType={
              props.secureTextEntry ? 'password' : props.secureTextEntry
            }
            secureTextEntry={showPassword}
          />
          {props.secureTextEntry && !!text && (
            <View>
              <TouchableOpacity
                style={styles.passwordIcon}
                onPress={() => setShowPassword(!showPassword)}>
                {!showPassword ? (
                  <Icon name="eye-outline" color={'gray'} size={24} />
                ) : (
                  <Icon name="eye-off-outline" color={'gray'} size={24} />
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    width: '100%',
    borderRadius: horizontalScale(10),
    borderWidth: 2,
    borderColor: '#FFD55F',
    justifyContent: 'center',
    height: verticalScale(52),
  },
  label: {
    position: 'absolute',
    color: '#818181',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: horizontalScale(10),
  },
  input: {
    flex: 1,
    fontSize: scaleFontSize(15),
    paddingLeft: horizontalScale(10),
    fontFamily: getFontFamily('FZ Poppins', 400, ''),
  },
  passwordIcon: {
    width: 24,
  },
});

export default CustomInput;
