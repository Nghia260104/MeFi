import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Alert, Pressable} from 'react-native';
import CustomTitle from '../../component/customTitle';
import CustomPost from '../../component/Community/customPost';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPaperPlane} from '@fortawesome/free-regular-svg-icons';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {getFontFamily} from '../../assets/fonts/helper';

const backendURL = 'http://192.168.1.14:5000';

const Post = () => {
  const route = useRoute();
  const {post} = route.params;
  const user_id = useSelector(state => state.user._id);
  const user_name = useSelector(state => state.user.name);
  const [comment, setComment] = useState(''); // State to handle comment input
  const [likes, setLikes] = useState(post.likes || []); // Manage likes locally
  const [commentsList, setCommentsList] = useState(post.comments_list || []); // Manage comments locally

  // Function to submit comment
  const handleSubmitComment = async () => {
    if (!comment.trim()) {
      return;
    } // Prevent empty comments

    try {
      // Send comment to the backend
      const response = await fetch(`${backendURL}/comment/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          blog_id: post._id,
          creator: user_id,
          content: comment,
          name: user_name,
          type: false,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Clear the comment input field
      setComment('');

      // Update comments list locally
      setCommentsList(prevComments => [...prevComments, data.comment]);
    } catch (error) {
      console.error('Error submitting comment:', error);
      Alert.alert('Error', 'Failed to submit comment. Please try again.');
    }
  };

  // Handle like/unlike functionality
  const handleLike = async (postId, isLiked) => {
    try {
      const response = await fetch(`${backendURL}/community/blogs/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({blog_id: postId}),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Update the likes locally
      setLikes(data.likes);
    } catch (error) {
      console.error('Error liking/unliking post:', error);
      Alert.alert('Error', 'Failed to like/unlike post. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <CustomTitle goBack={true} title="Community" />

      {/* Pass the updated likes and comments list to CustomPost */}
      <CustomPost
        id={post._id}
        creator={post.creator}
        content={post.content}
        createdAt={post.createdAt}
        name={post.name}
        likes={likes} // Pass the updated likes
        comments_list={commentsList} // Pass the updated comments list
        onLike={handleLike} // Handle like functionality
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          multiline
          placeholder="Add a comment..."
          value={comment}
          onChangeText={setComment}
        />
        <Pressable onPress={handleSubmitComment}>
          <FontAwesomeIcon icon={faPaperPlane} size={16} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  inputContainer: {
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    borderRadius: 20,
    elevation: 5,
    backgroundColor: '#faf9f9',
  },
  input: {
    width: '80%',
    borderRadius: 20,
    numberOfLines: 3,
    color: '#333',
    fontFamily: getFontFamily(400, ''),
  },
});

export default Post;
