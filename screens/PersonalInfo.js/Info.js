import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomTitle from '../../component/customTitle';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';
import CustomInput from '../../component/customInput';
import CustomDateInput from '../../component/customDateInput';
import CustomButton from '../../component/customButton';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPencil} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {setProfileImage} from '../../reducers/slices/profileImage';
import {setName} from '../../reducers/slices/userSlice';

const Info = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const profileImage = useSelector(state => state.image.profileImage);
  const [localImage, setLocalImage] = useState(profileImage);
  const [email, setEmail] = useState(user.email);
  const [fullName, setFullName] = useState(user.name);
  const [dob, setDob] = useState(user.dob);

  const handleSave = () => {
    if (localImage !== profileImage) {
      dispatch(setProfileImage(localImage));
    }

    if (fullName !== user.name) {
      dispatch(setName(fullName));
    }
    navigation.navigate('Personal');
  };

  const imagePick = () => {
    ImagePicker.openPicker({
      width: 3060,
      height: 3060,
      cropping: true,
      cropperCircleOverlay: true,
      compressImageMaxWidth: 3060,
      compressImageMaxHeight: 3060,
      compressImageQuality: 1,
    }).then(image => {
      setLocalImage(image.path);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <View style={styles.userContainer}>
        <CustomTitle goBack={true} title="Information" />
        <ScrollView
          // eslint-disable-next-line react-native/no-inline-styles
          style={{width: '100%'}}
          showsVerticalScrollIndicator={false}>
          {/* eslint-disable-next-line react-native/no-inline-styles*/}
          <View style={{alignItems: 'center'}}>
            <View style={styles.avatarContainer}>
              <Image
                style={styles.avatar}
                source={
                  localImage
                    ? typeof localImage === 'string'
                      ? {uri: localImage}
                      : localImage
                    : typeof profileImage === 'string'
                    ? {uri: profileImage}
                    : profileImage
                }
                resizeMode="cover"
              />
              <View style={styles.edit}>
                <TouchableOpacity onPress={imagePick}>
                  <FontAwesomeIcon icon={faPencil} size={scaleFontSize(15)} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.cateContainer}>
              <CustomInput
                style={styles.input}
                label="Full Name"
                placeholder="Full Name"
                value={user.name}
                onChangeText={setFullName}
              />
              <CustomInput
                style={styles.input}
                label="Email"
                placeholder="Email"
                value={email}
                editable={false}
                onChangeText={setEmail}
              />
              <CustomDateInput
                style={styles.input}
                label="Date of Birth"
                placeholder="Date of Birth"
                value={dob}
                onChangeText={setDob}
              />
            </View>
            <CustomButton
              customStyle={styles.button}
              title="Save Change"
              onPress={handleSave}
              textColor={'white'}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  userContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    marginHorizontal: horizontalScale(30),
  },
  avatar: {
    width: horizontalScale(140),
    height: horizontalScale(140),
    borderRadius: horizontalScale(70),
  },
  avatarContainer: {
    marginTop: verticalScale(31),
    backgroundColor: '#FFDF99',
    borderRadius: horizontalScale(70),
  },
  cateContainer: {
    width: '100%',
    marginTop: verticalScale(50),
    paddingHorizontal: horizontalScale(25),
    justifyContent: 'space-between',
    height: verticalScale(200),
  },
  input: {
    width: '100%',
    marginTop: verticalScale(20),
  },
  button: {
    width: '85%',
    marginTop: verticalScale(120),
    backgroundColor: '#FF8533',
  },
  edit: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});

export default Info;
