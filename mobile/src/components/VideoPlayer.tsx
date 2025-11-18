import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Video as VideoType} from '../data/videos';

const {width, height} = Dimensions.get('window');

interface VideoPlayerProps {
  video: VideoType;
  isActive: boolean;
}

interface Comment {
  id: string;
  username: string;
  text: string;
  avatar: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({video, isActive}) => {
  const [paused, setPaused] = useState(!isActive);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likes);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      username: 'sample_user',
      text: 'Amazing content! 🔥',
      avatar: 'https://i.pravatar.cc/150?img=10',
    },
    {
      id: '2',
      username: 'another_user',
      text: 'Love this! Keep it up',
      avatar: 'https://i.pravatar.cc/150?img=11',
    },
  ]);

  const videoRef = useRef(null);

  useEffect(() => {
    setPaused(!isActive);
  }, [isActive]);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount(likeCount - 1);
    } else {
      setLiked(true);
      setLikeCount(likeCount + 1);
    }
  };

  const handleShare = () => {
    // Implement share functionality
    console.log('Share video:', video.id);
    Alert.alert('Share', 'Share functionality - integrate with Share API');
  };

  const handleSave = () => {
    setSaved(prev => !prev);
    Alert.alert(
      'Save',
      !saved ? 'Saved to your collection (placeholder).' : 'Removed from collection (placeholder).',
    );
  };

  const handleOptions = () => {
    Alert.alert(
      'More options',
      'Report / Not interested / Copy link etc. will be implemented here.',
    );
  };

  const handleComment = () => {
    setShowComments(true);
  };

  const submitComment = () => {
    if (commentText.trim()) {
      const newComment: Comment = {
        id: Date.now().toString(),
        username: 'current_user',
        text: commentText,
        avatar: 'https://i.pravatar.cc/150?img=12',
      };
      setComments([newComment, ...comments]);
      setCommentText('');
    }
  };

  const formatCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.videoContainer}
        activeOpacity={1}
        onPress={() => setPaused(!paused)}>
        <Video
          ref={videoRef}
          source={{uri: video.uri}}
          style={styles.video}
          resizeMode="cover"
          repeat
          paused={paused}
          onError={error => console.log('Video Error:', error)}
        />
      </TouchableOpacity>

      {/* Top header (Instagram Reels-style) */}
      <View style={styles.topHeader}>
        <Text style={styles.reelsTitle}>Reels</Text>
        <TouchableOpacity
          onPress={() =>
            Alert.alert('Camera', 'Open camera to create reel (placeholder)')
          }
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <Icon name="camera-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* User Info and Description */}
      <View style={styles.bottomSection}>
        <View style={styles.userInfoRow}>
          <Image source={{uri: video.userAvatar}} style={styles.avatar} />
          <Text style={styles.username}>{video.username}</Text>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>Follow</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {video.description}
        </Text>

        <View style={styles.audioRow}>
          <Icon name="musical-notes" size={14} color="#fff" style={{marginRight: 6}} />
          <Text style={styles.audioText} numberOfLines={1}>
            Original audio · {video.username}
          </Text>
        </View>
      </View>

      {/* Action Buttons (right column like Instagram Reels) */}
      <View style={styles.rightActions}>
        {/* Like */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleLike}
          activeOpacity={0.7}>
          <Icon
            name={liked ? 'heart' : 'heart-outline'}
            size={32}
            color={liked ? '#ff3b5c' : '#fff'}
            style={styles.actionIconShadow}
          />
          <Text style={styles.actionText}>{formatCount(likeCount)}</Text>
        </TouchableOpacity>

        {/* Comment */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleComment}
          activeOpacity={0.7}>
          <Icon
            name="chatbubble-outline"
            size={30}
            color="#fff"
            style={[styles.actionIconShadow, {transform: [{scaleX: -1}]}]}
          />
          <Text style={styles.actionText}>{formatCount(video.comments)}</Text>
        </TouchableOpacity>

        {/* Share */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleShare}
          activeOpacity={0.7}>
          <Icon
            name="paper-plane-outline"
            size={28}
            color="#fff"
            style={styles.actionIconShadow}
          />
          <Text style={styles.actionText}>{formatCount(video.shares)}</Text>
        </TouchableOpacity>

        {/* More options */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleOptions}
          activeOpacity={0.7}>
          <Icon
            name="ellipsis-vertical"
            size={28}
            color="#fff"
            style={styles.actionIconShadow}
          />
        </TouchableOpacity>

        {/* Audio/Profile disc at bottom */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            Alert.alert('Profile', 'Open creator profile screen (placeholder).')
          }
          activeOpacity={0.7}>
          <View style={styles.audioDisc}>
            <Image source={{uri: video.userAvatar}} style={styles.audioDiscImage} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Comments Modal */}
      <Modal
        visible={showComments}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowComments(false)}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContainer}>
          <View style={styles.commentsContainer}>
            <View style={styles.commentsHeader}>
              <View style={styles.commentsDragHandle} />
              <Text style={styles.commentsTitle}>Comments</Text>
              <TouchableOpacity
                onPress={() => setShowComments(false)}
                style={styles.closeButton}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                <Icon name="close" size={28} color="#262626" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={comments}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <View style={styles.commentItem}>
                  <Image
                    source={{uri: item.avatar}}
                    style={styles.commentAvatar}
                  />
                  <View style={styles.commentContent}>
                    <Text style={styles.commentUsername}>{item.username}</Text>
                    <Text style={styles.commentText}>{item.text}</Text>
                  </View>
                </View>
              )}
            />

            <View style={styles.commentInputContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Add a comment..."
                placeholderTextColor="#999"
                value={commentText}
                onChangeText={setCommentText}
              />
              <TouchableOpacity
                style={styles.sendButton}
                onPress={submitComment}>
                <Text style={styles.sendButtonText}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: '#000',
  },
  videoContainer: {
    width,
    height,
  },
  video: {
    width,
    height,
  },
  topHeader: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    zIndex: 10,
  },
  reelsTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  bottomSection: {
    position: 'absolute',
    bottom: 70,
    left: 12,
    right: 70,
    paddingHorizontal: 4,
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#fff',
    marginRight: 8,
  },
  username: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  followButton: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  followButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  description: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 8,
  },
  audioRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  audioText: {
    color: '#fff',
    fontSize: 13,
    flex: 1,
  },
  rightActions: {
    position: 'absolute',
    right: 12,
    bottom: 70,
  },
  actionButton: {
    alignItems: 'center',
    marginBottom: 24,
  },
  actionIconShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 4,
  },
  actionText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 3,
  },
  audioDisc: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#262626',
  },
  audioDiscImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  commentsContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: '75%',
    paddingTop: 8,
  },
  commentsHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dbdbdb',
    position: 'relative',
  },
  commentsDragHandle: {
    position: 'absolute',
    top: 8,
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#dbdbdb',
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#262626',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
  },
  commentItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentUsername: {
    fontWeight: '600',
    color: '#262626',
    fontSize: 13,
    marginBottom: 2,
  },
  commentText: {
    color: '#262626',
    fontSize: 14,
    lineHeight: 18,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#dbdbdb',
    backgroundColor: '#fff',
  },
  commentInput: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    color: '#262626',
    fontSize: 14,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  sendButtonText: {
    color: '#0095f6',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default VideoPlayer;
