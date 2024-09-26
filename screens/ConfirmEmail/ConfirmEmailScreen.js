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
import { checkEmail } from '../../actions/auth';

const ConfirmEmailScreen = () => {

// const ConfirmEmailScreen = ({ navigation }) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [accountError, setAccountError] = useState('');

    const handleSubmit = async () => {
        const data = {
            email,
        }; 
        if (!email) {
            setAccountError('Email is required');
            return;
        } else {
            setAccountError('');
            // Proceed with the email verification process
        }
        // handle check email here
        await dispatch(checkEmail(email));
        const storedData = await AsyncStorage.getItem(USER_KEY);
        if (!storedData)
            return;
        const res = JSON.parse(storedData);
        if (res?.message) {
            if (res?.message === 'User does not exist!')
                setAccountError('User does not exist!');
            else {
                await AsyncStorage.setItem('prevScreen', 'ForgotPassword');
                navigation.navigate('VerificationScreen');
                await dispatch(sendCode(email));
            }
        }
    };

    return (
        <View style={styles.submitContainer}>
            <Text style={styles.title}>Please input your email:</Text>
            <CustomInput
                customStyle={styles.email}
                placeholder="Email"
                onChangeText={setEmail}
                error={accountError}
            />
            <CustomButton
                customStyle={styles.button}
                title={'Continue to verify email'}
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
    email: {
        marginBottom: 16,
        width: '100%',
        padding: 10, // Adjust padding
    },
    button: {
        width: horizontalScale(200),
    },
});

export default ConfirmEmailScreen;
