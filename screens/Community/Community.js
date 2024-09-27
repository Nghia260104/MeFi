// Community.js
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  FlatList,
  Text,
  Alert,
} from 'react-native';
import {horizontalScale, verticalScale} from '../../assets/styles/scaling';
import {useSelector} from 'react-redux';
import {getFontFamily} from '../../assets/fonts/helper';
import io from 'socket.io-client';
import {useNavigation} from '@react-navigation/native'; // Add navigation hook

import CustomButton from '../../component/customButton';
import CustomPost from '../../component/Community/customPost';
import CustomTitle from '../../component/customTitle';

import Notification from '../../assets/images/Community/Notification.svg';
import ImagePost from '../../assets/images/Community/ImagePost.svg';
import Link from '../../assets/images/Community/Link.svg';

const backendURL = 'http://192.168.1.14:5000';

const socket = io(backendURL, {
  transports: ['websocket'],
});

const Community = () => {
  const profileImage = useSelector(state => state.image.profileImage);
  const [post, setPost] = useState('');
  const [posts, setPosts] = useState([]);
  const userId = useSelector(state => state.user._id);
  const user = useSelector(state => state.user.name);
  const navigation = useNavigation(); // Get navigation instance

  useEffect(() => {
    fetchPosts();

    socket.on('new_blog', newPost => {
      setPosts(prevPosts => [newPost, ...prevPosts]);
    });

    socket.on('delete_blog', deletedPostId => {
      setPosts(prevPosts =>
        prevPosts.filter(post => post._id !== deletedPostId),
      );
    });

    socket.on('like_blog', update => {
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === update.blog_id ? {...post, likes: update.likes} : post,
        ),
      );
    });

    return () => {
      socket.off('new_blog');
      socket.off('delete_blog');
      socket.off('like_blog');
    };
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${backendURL}/community/blogs/get`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPosts(data.blogs);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      Alert.alert(
        'Error',
        'Failed to fetch posts. Please check your connection and try again.',
      );
    }
  };

  const handlePost = async () => {
    if (!post) return;

    try {
      const response = await fetch(`${backendURL}/community/blogs/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({creator: userId, content: post, name: user}),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPost('');
    } catch (error) {
      console.error('Error creating post:', error);
      Alert.alert('Error', 'Failed to create post. Please try again.');
    }
  };

  const handleLike = async (postId, isLiked) => {
    try {
      const response = await fetch(`${backendURL}/community/blogs/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user: userId, blog_id: postId}),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      setPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId ? {...post, likes: data.likes} : post,
        ),
      );
    } catch (error) {
      console.error('Error liking/unliking post:', error);
      Alert.alert('Error', 'Failed to like/unlike post. Please try again.');
    }
  };

  const renderPost = ({item}) => (
    <CustomPost
      id={item._id}
      name={item.name}
      content={item.content}
      createdAt={item.createdAt}
      likes={item.likes}
      comments_list={item.comments_list}
      gender={item.creator.gender || true}
      currentUserId={userId}
      onLike={handleLike}
      onPress={() =>
        navigation.navigate('Post', {
          post: item,
          gender: item.creator.gender || true,
        })
      } // Pass post data
    />
  );

  return (
    <View style={styles.container}>
      <CustomTitle
        title="Community"
        icon={<Notification width={24} height={24} />}
      />

      <View style={styles.newPostContainer}>
        <View style={{flexDirection: 'row', gap: horizontalScale(10)}}>
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
            textColor="black"
            onPress={handlePost}
          />
        </View>
      </View>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item._id}
        contentContainerStyle={{paddingBottom: verticalScale(20)}}
        ListEmptyComponent={
          <Text style={styles.noPostsText}>No posts available.</Text>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  noPostsText: {
    textAlign: 'center',
    marginTop: verticalScale(20),
    color: '#888',
    fontSize: horizontalScale(14),
    fontFamily: getFontFamily(400, ''),
  },
});

export default Community;
