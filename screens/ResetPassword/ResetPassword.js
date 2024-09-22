import React, { useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { sendCode, verify } from '../../actions/auth';
import { USER_KEY } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../component/customButton';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import PeriodTrackerCalendar from '../Calendar/Calendar';
import CustomInput from '../../component/customInput';
import { resetPassword } from '../../actions/auth';

const ResetPassword = () => {

// const ResetPassword = ({ navigation }) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [accountError, setAccountError] = useState('');

    const handleSubmit = async () => {
        const encryptedLoadedData = await AsyncStorage.getItem(USER_KEY);
        const loadedData = JSON.parse(encryptedLoadedData);
        const email = loadedData.user.email;
        console.log('Email:', email);
        console.log('Password:', password);
        await dispatch(resetPassword(email, password));
        const storedData = await AsyncStorage.getItem('ForgotPassword');
        if (!storedData) {
            console.log('No stored data');
            return;
        }
        const res = JSON.parse(storedData);
        if (res?.message) {
            console.log('Message:', res.message);
            if (res?.message === 'User not found!')
                setAccountError('User not found!');
            else {
                console.log('Password:', password);
                navigation.navigate(LogIn);
            }
        }
        else {
            console.log('Message is null?');
        }
        console.log('Stored data: pass');
    };

    return (
        <View style={styles.submitContainer}>
            <Text style={styles.title}>Input your new password:</Text>
            <CustomInput
                customStyle={styles.password}
                placeholder="New Password"
                onChangeText={setPassword}
                error={accountError}
            />
            <CustomButton
                customStyle={styles.button}
                title={'Reset password and back to Log In'}
                onPress={handleSubmit} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    submitContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 16,
        paddingHorizontal: horizontalScale(30),
        // marginHorizontal: horizontalScale(20),
    },
    title: {
        marginTop: verticalScale(70),
        // marginTop: verticalScale(50),
        color: '#000',
        fontSize: scaleFontSize(24),
        marginBottom: verticalScale(16),
        fontWeight: 'bold',
        textAlign: 'left',
    },
    password: {
        marginBottom: 16,
        width: '100%',
        padding: 10, // Adjust padding
    },
    button: {
        width: horizontalScale(180),
    },
});

export default ResetPassword;
