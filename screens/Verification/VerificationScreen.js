import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import {
    horizontalScale,
    scaleFontSize,
    verticalScale,
} from '../../assets/styles/scaling';
import LogIn from '../LogIn/LogIn';
import ResetPassword from '../ResetPassword/ResetPassword';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { sendCode, verify } from '../../actions/auth';
import { USER_KEY } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../component/customButton';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import PeriodTrackerCalendar from '../Calendar/Calendar';

const VerificationScreen = () => {

// const VerificationScreen = ({ navigation }) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);
    const [error, setError] = useState('');

    const handleChange = (text, index) => {
        const newCode = [...code];
        newCode[index] = text;

        setCode(newCode);

        // Move to next input box if a digit is entered
        if (text && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && index > 0 && !code[index]) {
            inputRefs.current[index - 1].focus();
        }
        if(e.nativeEvent.key !== 'Backspace' && code[index] && index < 5){
            inputRefs.current[index + 1].focus();
            const newCode = [...code];
            newCode[index + 1] = e.nativeEvent.key;
            setCode(newCode);
        }

    };

    const handleSubmit = async () => {
        // Submit code to backend
        const verificationCode = code.join('');
        const encryptedLoadedData = await AsyncStorage.getItem(USER_KEY);
        const loadedData = JSON.parse(encryptedLoadedData);
        const email = loadedData.user.email;
        await dispatch(verify(email, verificationCode));

        // Backend return response
        const encryptedData = await AsyncStorage.getItem(USER_KEY);
        const data = JSON.parse(encryptedData);
        const verified = data.user.resetPassword;
        setError('');
        if (!verified) {
            setError('Invalid or expired code!');
            return;
        }
        const prevScreen = await AsyncStorage.getItem('prevScreen');
        if (prevScreen && prevScreen === 'ForgotPassword') {
            navigation.navigate(ResetPassword);
            return;
        }

        navigation.navigate(LogIn);
    };

    const handleResend = async () => {
        const encryptedLoadedData = await AsyncStorage.getItem(USER_KEY);
        const loadedData = await JSON.parse(encryptedLoadedData);
        const email = loadedData.user.email;
        await dispatch(sendCode(email));
    };
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Text style={styles.title}>OTP</Text>
            <Text style={styles.notify}>We have sent you a verification OTP code to your email (this action may take a few minutes)</Text>
            <View style={styles.inputContainer}>
                {code.map((digit, index) => (
                    <TextInput
                        key={index}
                        style={styles.input}
                        keyboardType="numeric"
                        maxLength={1}
                        value={digit}
                        onChangeText={(text) => handleChange(text, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        ref={(ref) => {inputRefs.current[index] = ref;}}
                    />
                ))}
            </View>
            <View style={styles.submitContainer}>
                <CustomButton
                    customStyle={styles.button}
                    title={'Continue'}
                    onPress={handleSubmit} />
                <View style={styles.resendContainer}>
                    <Text style={styles.textResend}>Can not get the code? Resend here:</Text>
                    <TouchableOpacity style={styles.resend} onPress={handleResend}>
                        <FontAwesomeIcon
                            icon={faRotateRight}
                            size={20}
                            color={'#000'} />
                    </TouchableOpacity>
                </View>
                {error && <Text style={styles.error}>{error}</Text>}
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
    },
    title: {
        marginTop: verticalScale(50),
        fontSize: 30,
        marginBottom: 16,
        textAlign: 'left',
        color: '#000',
        fontWeight: 'bold',
    },
    notify: {
        color: '#000',
        fontSize: 15,
        marginBottom: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 16,
        alignSelf: 'center',
        alignItems: 'center',
    },
    input: {
        width: horizontalScale(45),
        height: horizontalScale(45),
        borderColor: 'gray',
        borderWidth: 1,
        textAlign: 'center',
        fontSize: 18,
        borderRadius: 12,
        color: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: horizontalScale(130),
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
    },
    submitContainer:{
        alignSelf: 'center',
        marginTop: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',   
        gap: 10,
        paddingHorizontal: 40,
    },
    resendContainer:{
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textResend:{
        color: '#000',
        fontSize: 16,
    },
    resend:{
        // position: 'absolute',
        right: 0,
        marginLeft: 10,
    },
    error: {
        color: 'red',
        fontSize: scaleFontSize(12),
        marginTop: verticalScale(5),
    },
});

export default VerificationScreen;
