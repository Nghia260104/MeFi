import React, {useState, useRef} from 'react';
import {Text, TextInput, StyleSheet, Pressable} from 'react-native';
import {horizontalScale, verticalScale} from '../assets/styles/scaling';
import {getFontFamily} from '../assets/fonts/helper';

const InputField = ({label, placeholder = '', secureTextEntry = false}) => {
  const textInputRef = useRef(null);
  const [text, setText] = useState('');

  const focusInput = () => {
    textInputRef.current.focus();
  };

  const handleInput = inputValue => {
    setText(inputValue);
  };

  return (
    <Pressable style={styles.inputContainer} onPress={focusInput}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        ref={textInputRef}
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        value={text}
        onChangeText={value => handleInput(value)}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderRadius: horizontalScale(15),
    borderWidth: 2,
    borderColor: '#FFD55F',
    padding: verticalScale(5),
    paddingLeft: horizontalScale(6),
  },
  input: {
    width: '100%',
    fontSize: horizontalScale(15),
    color: '#808080',
    fontFamily: getFontFamily('FZ Poppins', 400, ''),
  },
  label: {
    position: 'absolute',
    left: horizontalScale(11),
    fontSize: horizontalScale(10),
    color: '#818181',
    fontFamily: getFontFamily('FZ Poppins', 600, ''),
  },
});

export default InputField;
