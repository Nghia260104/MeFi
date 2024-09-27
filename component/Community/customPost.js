import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import defaultFemale from '../../assets/images/defaultFemale.png';
import defaultMale from '../../assets/images/defaultMale.png';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';
import {getFontFamily} from '../../assets/fonts/helper';
import Like from '../../assets/images/Community/Like.svg';
import Comment from '../../assets/images/Community/Comment.svg';
import Unlike from '../../assets/images/Community/Unlike.svg';

const CustomPost = ({
  id,
  content,
  createdAt,
  likes = [],
  comments_list = [],
  gender,
  name,
  currentUserId,
  onLike,
  onPress,
}) => {
  const [isLiked, setIsLiked] = useState(likes.includes(currentUserId));
  const [likeCount, setLikeCount] = useState(likes.length);

  useEffect(() => {
    setIsLiked(likes.includes(currentUserId));
    setLikeCount(likes.length);
  }, [likes, currentUserId]);

  const handleLike = () => {
    const newLikeStatus = !isLiked;
    setIsLiked(newLikeStatus);
    setLikeCount(prevCount => (newLikeStatus ? prevCount + 1 : prevCount - 1));
    onLike(id, newLikeStatus);
  };

  // Utility function to calculate the time difference between now and createdAt
  // eslint-disable-next-line no-shadow
  const getTimeDifference = createdAt => {
    const now = new Date();
    const postDate = new Date(createdAt);
    const differenceInSeconds = Math.floor((now - postDate) / 1000);

    if (differenceInSeconds < 60) {
      return `${differenceInSeconds} seconds ago`;
    } else if (differenceInSeconds < 3600) {
      const minutes = Math.floor(differenceInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (differenceInSeconds < 86400) {
      const hours = Math.floor(differenceInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (differenceInSeconds < 604800) {
      const days = Math.floor(differenceInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
      const weeks = Math.floor(differenceInSeconds / 604800);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }
  };

  // Get the time difference between now and createdAt
  const timeAgo = getTimeDifference(createdAt);

  return (
    <View style={styles.container}>
      {/* eslint-disable-next-line react-native/no-inline-styles*/}
      <View style={{flexDirection: 'row', gap: horizontalScale(10)}}>
        <Image
          source={gender ? defaultFemale : defaultMale}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.creator}>{name ? name : 'Anonymous'}</Text>
          <Text style={styles.time}>{timeAgo}</Text>
        </View>
      </View>

      <Text style={styles.content}>
        {content || 'Lorem ipsum dolor sit amet, consectetur'}
      </Text>

      <View style={styles.interactions}>
        <View style={styles.likes}>
          <Pressable onPress={handleLike}>
            {isLiked ? (
              <Like width={horizontalScale(24)} height={horizontalScale(24)} />
            ) : (
              <Unlike
                width={horizontalScale(24)}
                height={horizontalScale(24)}
              />
            )}
          </Pressable>
          <Text>{likeCount}</Text>
        </View>
        <View style={styles.comments}>
          <Pressable onPress={onPress}>
            <Comment width={horizontalScale(24)} height={horizontalScale(24)} />
          </Pressable>
          <Text>{comments_list.length}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    padding: horizontalScale(20),
    borderColor: '#D9D9D9',
    width: '100%',
  },
  avatar: {
    width: horizontalScale(50),
    height: horizontalScale(50),
  },
  creator: {
    fontFamily: getFontFamily(600, ''),
    fontSize: horizontalScale(13),
    color: '#1B141F',
  },
  time: {
    fontFamily: getFontFamily(400, ''),
    fontSize: scaleFontSize(10),
    color: '#8B8B8B',
  },
  content: {
    fontSize: horizontalScale(14),
    fontFamily: getFontFamily(400, ''),
    marginTop: verticalScale(15),
    lineHeight: verticalScale(20),
    color: '#1B141F',
  },
  interactions: {
    flexDirection: 'row',
    marginTop: verticalScale(30),
    gap: horizontalScale(50),
    alignItems: 'center',
  },
  likes: {
    flexDirection: 'row',
    gap: horizontalScale(8),
  },
  comments: {
    flexDirection: 'row',
    gap: horizontalScale(8),
  },
});

export default CustomPost;
