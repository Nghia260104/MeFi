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

const Info = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const profileImage = useSelector(state => state.image.profileImage);
  const [localImage, setLocalImage] = useState(null);

  const handleSave = () => {
    if (localImage !== profileImage) {
      dispatch(setProfileImage(localImage));
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

  const getImageSource = () => {
    if (localImage) {
      return {uri: localImage};
    } else if (profileImage) {
      return typeof profileImage === 'string'
        ? {uri: profileImage}
        : profileImage;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <View style={styles.userContainer}>
        <CustomTitle title="Information" />
        <ScrollView
          style={{width: '100%'}}
          showsVerticalScrollIndicator={false}>
          <View style={{alignItems: 'center'}}>
            <View style={styles.avatarContainer}>
              <Image
                style={styles.avatar}
                source={
                  localImage
                    ? {uri: localImage}
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
              />
              <CustomInput
                style={styles.input}
                label="Email"
                placeholder="Email"
              />
              <CustomDateInput
                style={styles.input}
                label="Date of Birth"
                placeholder="Date of Birth"
              />
            </View>
            <CustomButton
              customStyle={styles.button}
              title="Save Change"
              onPress={handleSave}
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
  },
  edit: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});

export default Info;
