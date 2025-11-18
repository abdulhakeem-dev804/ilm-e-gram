import React, {useState, useRef, useCallback} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  ViewToken,
  ViewabilityConfig,
  RefreshControl,
  Alert,
} from 'react-native';
import VideoPlayer from '../components/VideoPlayer';
import {videos} from '../data/videos';

const {height} = Dimensions.get('window');

const VideoFeed: React.FC = () => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const viewabilityConfig = useRef<ViewabilityConfig>({
    itemVisiblePercentThreshold: 50,
  }).current;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate fetching new reels from server
    setTimeout(() => {
      setRefreshing(false);
      // In a real app, you would fetch new reels here
      Alert.alert('Reels Updated', 'Showing latest reels');
    }, 1500);
  }, []);

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      if (viewableItems.length > 0) {
        const visibleItem = viewableItems[0];
        if (visibleItem.index !== null) {
          setActiveVideoIndex(visibleItem.index);
        }
      }
    },
  ).current;

  const renderItem = useCallback(
    ({item, index}: {item: any; index: number}) => {
      return <VideoPlayer video={item} isActive={index === activeVideoIndex} />;
    },
    [activeVideoIndex],
  );

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: height,
      offset: height * index,
      index,
    }),
    [],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate="fast"
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
        getItemLayout={getItemLayout}
        removeClippedSubviews
        maxToRenderPerBatch={2}
        windowSize={3}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#fff"
            colors={['#fff']}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default VideoFeed;
