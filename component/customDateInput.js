import React, {useRef, useState} from 'react';
import {
  Animated,
  Platform,
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
import DateTimePicker from '@react-native-community/datetimepicker';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCalendar} from '@fortawesome/free-regular-svg-icons';

const CustomDateInput = ({
  customStyle,
  placeholder = '',
  onChangeText,
  ...props
}) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');
  const labelPosition = useRef(new Animated.Value(0)).current;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = `${tempDate.getDate()}/${
      tempDate.getMonth() + 1
    }/${tempDate.getFullYear()}`;

    setText(fDate);
    onChangeText?.(fDate);
    animateLabel(1);
  };

  const showDatepicker = () => {
    setShow(true);
    animateLabel(1);
  };

  const animateLabel = toValue => {
    Animated.timing(labelPosition, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleFocus = () => animateLabel(1);

  const handleBlur = () => {
    if (!text) {
      animateLabel(0);
    }
  };

  const handleTextChange = newText => {
    setText(newText);
    animateLabel(newText ? 1 : 0);
    onChangeText?.(newText);
  };

  const labelStyle = {
    left: horizontalScale(10),
    top: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [17, 3],
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
            editable={false}
          />
          <TouchableOpacity onPress={showDatepicker}>
            <FontAwesomeIcon icon={faCalendar} size={20} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
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
    paddingTop: verticalScale(10),
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
});

export default CustomDateInput;
