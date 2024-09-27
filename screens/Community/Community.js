import React, {useState} from 'react';
import {View, StyleSheet, Pressable, Image, TextInput} from 'react-native';
import {horizontalScale, verticalScale} from '../../assets/styles/scaling';
import {useSelector} from 'react-redux';
import {getFontFamily} from '../../assets/fonts/helper';

import CustomButton from '../../component/customButton';
import CustomPost from '../../component/Community/customPost';
import CustomTitle from '../../component/customTitle';

import Save from '../../assets/images/Community/Save.svg';
import Notification from '../../assets/images/Community/Notification.svg';
import ImagePost from '../../assets/images/Community/ImagePost.svg';
import Link from '../../assets/images/Community/Link.svg';

const Community = () => {
  const profileImage = useSelector(state => state.image.profileImage);
  const [post, setPost] = useState('');

  return (
    <View style={styles.container}>
      <CustomTitle
        title="Community"
        icon={
          <View style={styles.buttonContainer}>
            <Notification width={24} height={24} />
            <Pressable onPress={() => console.log('Save')}>
              <Save width={20} height={20} />
            </Pressable>
          </View>
        }
      />
      <View style={styles.newPostContainer}>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            flexDirection: 'row',
            gap: horizontalScale(10),
          }}>
          <Image
            source={
              typeof profileImage === 'string'
                ? {uri: profileImage}
                : profileImage
            }
            style={styles.image}
          />
          <TextInput
            placeholder="What's on your mind?"
            style={styles.input}
            value={post}
            onChangeText={setPost}
            multiline
            textAlignVertical="top"
          />
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.adding}>
            <Pressable>
              <ImagePost
                width={horizontalScale(40)}
                height={horizontalScale(40)}
              />
            </Pressable>
            <Pressable>
              <Link
                width={horizontalScale(40)}
                height={horizontalScale(38.6)}
              />
            </Pressable>
          </View>
          <CustomButton
            customStyle={styles.button}
            title="Post"
            textColor={'black'}
          />
        </View>
      </View>
      <CustomPost />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: horizontalScale(10),
  },
  image: {
    width: horizontalScale(40),
    height: horizontalScale(40),
    borderRadius: horizontalScale(50),
  },
  newPostContainer: {
    padding: horizontalScale(20),
    borderBottomWidth: 1,
    borderColor: '#D9D9D9',
  },
  input: {
    flex: 1,
    fontSize: horizontalScale(14),
    fontFamily: getFontFamily(400, ''),
    height: verticalScale(100),
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(10),
  },
  adding: {
    flexDirection: 'row',
    gap: horizontalScale(10),
  },
  button: {
    width: horizontalScale(100),
    height: verticalScale(40),
    borderRadius: horizontalScale(30),
    backgroundColor: '#FFDF99',
  },
});

export default Community;
