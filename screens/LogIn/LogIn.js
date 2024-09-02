import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';
import {getFontFamily} from '../../assets/fonts/helper';
import Logo from '../../assets/images/Logo.svg';
import InputField from '../../component/inputField';
import CustomInput from '../../component/customInput';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const {width: SCREEN_WIDTH} = useWindowDimensions();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <View style={styles.content}>
        <Logo width={SCREEN_WIDTH * 0.25} height={SCREEN_WIDTH * 0.25} />
        <CustomInput
          customStyle={styles.email}
          placeholder="Email"
          onChangeText={setEmail}
        />
        <CustomInput
          customStyle={styles.password}
          placeholder="Password"
          onChangeText={setPassword}
          error={passwordError}
          secureTextEntry
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    marginTop: verticalScale(80),
    alignItems: 'center',
    marginHorizontal: horizontalScale(30),
  },
  email: {
    marginTop: verticalScale(70),
    width: '100%',
  },
  password: {
    marginTop: verticalScale(14),
    width: '100%',
  },
});

export default LogIn;
