/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';

import defaultFemale from '../../assets/images/defaultFemale.png';
import defaultMale from '../../assets/images/defaultMale.png';
import {horizontalScale, verticalScale} from '../../assets/styles/scaling';
import {getFontFamily} from '../../assets/fonts/helper';

import Like from '../../assets/images/Community/Like.svg';
import Comment from '../../assets/images/Community/Comment.svg';
import Unlike from '../../assets/images/Community/Unlike.svg';
import Unsave from '../../assets/images/Community/Unsave.svg';
import Save from '../../assets/images/Community/Save1.svg';

const CustomPost = item => {
  const [like, setLike] = React.useState(false);
  const [save, setSave] = React.useState(false);

  return (
    <View style={styles.container}>
      <Image
        source={item.gender ? defaultFemale : defaultMale}
        style={styles.avatar}
      />
      <Text style={styles.content}>
        The menstrual cycle lasting 16, 18, or 20 days – is there anything wrong
        with that?{/*item.text*/}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          marginTop: verticalScale(30),
          gap: horizontalScale(50),
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', gap: horizontalScale(8)}}>
          <Pressable
            onPress={() => {
              setLike(!like);
            }}>
            {like ? (
              <Like width={horizontalScale(24)} height={horizontalScale(24)} />
            ) : (
              <Unlike
                width={horizontalScale(24)}
                height={horizontalScale(24)}
              />
            )}
          </Pressable>
          <Text>{item.numberOfLike ? item.numberOfLike : 0}</Text>
        </View>
        <View style={{flexDirection: 'row', gap: horizontalScale(8)}}>
          <Pressable>
            <Comment width={horizontalScale(24)} height={horizontalScale(24)} />
          </Pressable>
          <Text>{item.numberOfCmt ? item.numberOfCmt : 0}</Text>
        </View>
        <Pressable
          onPress={() => {
            setSave(!save);
          }}>
          {save ? (
            <Save width={horizontalScale(24)} height={horizontalScale(24)} />
          ) : (
            <Unsave width={horizontalScale(24)} height={horizontalScale(24)} />
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    padding: horizontalScale(20),
    borderColor: '#D9D9D9',
  },
  avatar: {
    width: horizontalScale(50),
    height: horizontalScale(50),
  },
  content: {
    fontSize: horizontalScale(14),
    fontFamily: getFontFamily(400, ''),
    marginTop: verticalScale(15),
    lineHeight: verticalScale(20),
    color: '#1B141F',
  },
});

export default CustomPost;
