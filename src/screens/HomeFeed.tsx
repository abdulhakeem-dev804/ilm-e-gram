import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');

type HomePost = {
  id: string;
  username: string;
  avatar: string;
  image?: string;
  caption: string;
  likes: number;
  time: string;
};

type Story = {
  id: string;
  username: string;
  avatar: string;
  hasStory: boolean;
  isYourStory?: boolean;
};

const MOCK_POSTS: HomePost[] = [
  {
    id: '1',
    username: 'ilm_hub',
    avatar: 'https://i.pravatar.cc/150?img=32',
    image: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg',
    caption: 'Knowledge shared is knowledge multiplied. 📚',
    likes: 234,
    time: '2 h',
  },
  {
    id: '2',
    username: 'daily_reflections',
    avatar: 'https://i.pravatar.cc/150?img=12',
    image: 'https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg',
    caption: 'Take a moment to pause, reflect, and realign. ✨',
    likes: 1023,
    time: '5 h',
  },
  {
    id: '3',
    username: 'text_notes',
    avatar: 'https://i.pravatar.cc/150?img=18',
    caption:
      'Soon this will show text-only posts, carousels, and mixed content just like Instagram home.',
    likes: 87,
    time: '1 d',
  },
  {
    id: '4',
    username: 'visual_learning',
    avatar: 'https://i.pravatar.cc/150?img=24',
    image: 'https://images.pexels.com/photos/196667/pexels-photo-196667.jpeg',
    caption: 'Visual explanations make hard topics feel simple. 🎨',
    likes: 541,
    time: '1 d',
  },
];

const MOCK_STORIES: Story[] = [
  {
    id: '0',
    username: 'Your story',
    avatar: 'https://i.pravatar.cc/150?img=33',
    hasStory: false,
    isYourStory: true,
  },
  {
    id: '1',
    username: 'ilm_hub',
    avatar: 'https://i.pravatar.cc/150?img=32',
    hasStory: true,
  },
  {
    id: '2',
    username: 'daily_reflections',
    avatar: 'https://i.pravatar.cc/150?img=12',
    hasStory: true,
  },
  {
    id: '3',
    username: 'text_notes',
    avatar: 'https://i.pravatar.cc/150?img=18',
    hasStory: true,
  },
  {
    id: '4',
    username: 'visual_learning',
    avatar: 'https://i.pravatar.cc/150?img=24',
    hasStory: true,
  },
  {
    id: '5',
    username: 'code_academy',
    avatar: 'https://i.pravatar.cc/150?img=8',
    hasStory: true,
  },
  {
    id: '6',
    username: 'design_pro',
    avatar: 'https://i.pravatar.cc/150?img=15',
    hasStory: true,
  },
];

const HomeFeed: React.FC = () => {
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());

  const onLikePress = (post: HomePost) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(post.id)) {
        newSet.delete(post.id);
      } else {
        newSet.add(post.id);
      }
      return newSet;
    });
  };

  const onCommentPress = (post: HomePost) => {
    Alert.alert('Comments', `Open comments for post ${post.id} (placeholder).`);
  };

  const onSharePress = (post: HomePost) => {
    Alert.alert('Share', `Share post ${post.id} (placeholder).`);
  };

  const onSavePress = (post: HomePost) => {
    setSavedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(post.id)) {
        newSet.delete(post.id);
      } else {
        newSet.add(post.id);
      }
      return newSet;
    });
  };

  const renderItem = ({item}: {item: HomePost}) => {
    const hasImage = !!item.image;
    const isLiked = likedPosts.has(item.id);
    const isSaved = savedPosts.has(item.id);

    return (
      <View style={styles.postContainer}>
        {/* Header */}
        <View style={styles.postHeader}>
          <View style={styles.userInfo}>
            <View style={styles.avatarContainer}>
              <Image source={{uri: item.avatar}} style={styles.avatar} />
            </View>
            <Text style={styles.username}>{item.username}</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                'Post options',
                'Report / Not interested / Copy link (placeholder).',
              )
            }
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Icon name="ellipsis-vertical" size={20} color="#262626" />
          </TouchableOpacity>
        </View>

        {/* Image / content */}
        {hasImage && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => onLikePress(item)}
            delayLongPress={200}>
            <Image
              source={{uri: item.image!}}
              style={styles.postImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}

        {/* Actions */}
        <View style={styles.actionRow}>
          <View style={styles.leftActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => onLikePress(item)}
              activeOpacity={0.6}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
              <Icon
                name={isLiked ? 'heart' : 'heart-outline'}
                size={26}
                color={isLiked ? '#ed4956' : '#262626'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => onCommentPress(item)}
              activeOpacity={0.6}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
              <Icon
                name="chatbubble-outline"
                size={25}
                color="#262626"
                style={{transform: [{scaleX: -1}]}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => onSharePress(item)}
              activeOpacity={0.6}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
              <Icon name="paper-plane-outline" size={24} color="#262626" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onSavePress(item)}
            activeOpacity={0.6}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Icon
              name={isSaved ? 'bookmark' : 'bookmark-outline'}
              size={24}
              color="#262626"
            />
          </TouchableOpacity>
        </View>

        {/* Meta */}
        <TouchableOpacity
          onPress={() => Alert.alert('Likes', 'Show liked by list (placeholder)')}
          activeOpacity={0.7}>
          <Text style={styles.likesText}>
            {(isLiked ? item.likes + 1 : item.likes).toLocaleString()} likes
          </Text>
        </TouchableOpacity>

        {/* Caption */}
        <View style={styles.captionRow}>
          <Text style={styles.captionUsername}>{item.username} </Text>
          <Text style={styles.captionText}>{item.caption}</Text>
        </View>

        <TouchableOpacity
          onPress={() => onCommentPress(item)}
          style={styles.viewCommentsRow}
          activeOpacity={0.7}>
          <Text style={styles.viewCommentsText}>
            View all 47 comments
          </Text>
        </TouchableOpacity>

        <Text style={styles.timeText}>{item.time.toUpperCase()}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header - Instagram style */}
      <View style={styles.topHeader}>
        <Text style={styles.logoText}>Ilm-e-gram</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity
            onPress={() => Alert.alert('Notifications', 'Notifications screen (placeholder)')}
            style={styles.headerButton}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Icon name="heart-outline" size={26} color="#262626" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Alert.alert('Messages', 'Direct messages screen (placeholder)')}
            style={styles.headerButton}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <MaterialIcon name="facebook-messenger" size={24} color="#262626" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stories Row */}
      <View style={styles.storiesContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.storiesContent}>
          {MOCK_STORIES.map(story => (
            <TouchableOpacity
              key={story.id}
              style={styles.storyItem}
              onPress={() =>
                Alert.alert(
                  'Story',
                  story.isYourStory
                    ? 'Add to your story (placeholder)'
                    : `View ${story.username}'s story (placeholder)`,
                )
              }
              activeOpacity={0.7}>
              <View
                style={[
                  styles.storyAvatarContainer,
                  story.hasStory && styles.storyAvatarWithStory,
                  story.isYourStory && styles.storyAvatarYourStory,
                ]}>
                <Image source={{uri: story.avatar}} style={styles.storyAvatar} />
                {story.isYourStory && (
                  <View style={styles.addStoryButton}>
                    <Icon name="add" size={16} color="#fff" />
                  </View>
                )}
              </View>
              <Text style={styles.storyUsername} numberOfLines={1}>
                {story.username}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={MOCK_POSTS}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dbdbdb',
  },
  logoText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    fontFamily: 'serif',
    letterSpacing: -0.5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    marginLeft: 20,
  },
  storiesContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dbdbdb',
    backgroundColor: '#fff',
  },
  storiesContent: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  storyItem: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 72,
  },
  storyAvatarContainer: {
    width: 66,
    height: 66,
    borderRadius: 33,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  storyAvatarWithStory: {
    borderWidth: 2,
    borderColor: '#c13584',
    background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
  },
  storyAvatarYourStory: {
    borderWidth: 1,
    borderColor: '#dbdbdb',
  },
  storyAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#fff',
  },
  addStoryButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0095f6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  storyUsername: {
    fontSize: 12,
    color: '#262626',
    marginTop: 4,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 60,
  },
  postContainer: {
    marginBottom: 12,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    padding: 2,
    borderRadius: 20,
    marginRight: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  username: {
    fontWeight: '600',
    color: '#000',
    fontSize: 13,
  },
  postImage: {
    width,
    aspectRatio: 1,
    backgroundColor: '#fafafa',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 4,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  likesText: {
    paddingHorizontal: 16,
    paddingTop: 4,
    fontWeight: '600',
    fontSize: 14,
    color: '#262626',
  },
  captionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  captionUsername: {
    fontWeight: '600',
    fontSize: 14,
    color: '#262626',
  },
  captionText: {
    fontSize: 14,
    color: '#262626',
    lineHeight: 18,
  },
  viewCommentsRow: {
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  viewCommentsText: {
    fontSize: 14,
    color: '#8e8e8e',
  },
  timeText: {
    paddingHorizontal: 16,
    paddingTop: 8,
    fontSize: 10,
    color: '#8e8e8e',
    letterSpacing: 0.2,
  },
});

export default HomeFeed;


