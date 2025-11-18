/**
 * Ilm-e-gram - Instagram-like Video Scrolling App
 * @format
 */

import React, {useState} from 'react';
import {StatusBar, StyleSheet, View, Text, TouchableOpacity, Alert, Image} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import VideoFeed from './src/screens/VideoFeed';
import HomeFeed from './src/screens/HomeFeed';
import MessagesScreen from './src/screens/MessagesScreen';
import ChatScreen from './src/screens/ChatScreen';
import {Conversation} from './src/types';

type Screen = 'home' | 'search' | 'create' | 'reels' | 'profile' | 'messages' | 'chat';

function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'create' | 'reels' | 'profile'>('home');
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  // Determine status bar style based on active tab and screen
  const isLightScreen = currentScreen === 'home' || currentScreen === 'messages' || currentScreen === 'chat';
  const statusBarStyle = isLightScreen ? 'dark-content' : 'light-content';
  const statusBarBg = isLightScreen ? '#fff' : '#000';

  const handleOpenMessages = () => {
    setCurrentScreen('messages');
  };

  const handleBackFromMessages = () => {
    setCurrentScreen('home');
    setActiveTab('home');
  };

  const handleConversationPress = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setCurrentScreen('chat');
  };

  const handleBackFromChat = () => {
    setCurrentScreen('messages');
    setSelectedConversation(null);
  };

  const renderPlaceholder = (tabName: string) => (
    <View style={[styles.placeholderScreen, activeTab === 'home' && styles.placeholderLight]}>
      <Text style={[styles.placeholderText, activeTab === 'home' && styles.placeholderTextLight]}>
        {tabName}
      </Text>
      <Text style={[styles.placeholderSubtext, activeTab === 'home' && styles.placeholderSubtextLight]}>
        Coming soon
      </Text>
    </View>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <StatusBar barStyle={statusBarStyle} backgroundColor={statusBarBg} />
        <View style={styles.appContainer}>
          {/* Render screens based on currentScreen */}
          {currentScreen === 'messages' && (
            <MessagesScreen
              onBack={handleBackFromMessages}
              onConversationPress={handleConversationPress}
            />
          )}
          {currentScreen === 'chat' && selectedConversation && (
            <ChatScreen
              conversation={selectedConversation}
              onBack={handleBackFromChat}
            />
          )}
          {currentScreen === 'home' && activeTab === 'home' && (
            <HomeFeed onOpenMessages={handleOpenMessages} />
          )}
          {currentScreen === 'home' && activeTab === 'search' && renderPlaceholder('Search')}
          {currentScreen === 'home' && activeTab === 'create' && renderPlaceholder('Create')}
          {currentScreen === 'home' && activeTab === 'reels' && <VideoFeed />}
          {currentScreen === 'home' && activeTab === 'profile' && renderPlaceholder('Profile')}

          {/* Bottom navigation bar - Instagram style - Hide on messages/chat screens */}
          {currentScreen === 'home' && (
            <View style={[styles.bottomNav, activeTab === 'home' && styles.bottomNavLight]}>
              <TouchableOpacity
                style={styles.navItem}
                onPress={() => {
                  setActiveTab('home');
                  setCurrentScreen('home');
                }}
                activeOpacity={0.7}>
                <Icon
                  name={activeTab === 'home' ? 'home' : 'home-outline'}
                  size={28}
                  color={activeTab === 'home' ? '#000' : (activeTab === 'home' ? '#000' : '#fff')}
                />
              </TouchableOpacity>

            <TouchableOpacity
              style={styles.navItem}
              onPress={() => setActiveTab('search')}
              activeOpacity={0.7}>
              <Icon
                name={activeTab === 'search' ? 'search' : 'search-outline'}
                size={28}
                color={activeTab === 'home' ? '#000' : '#fff'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navItem}
              onPress={() => {
                setActiveTab('create');
                Alert.alert('Create', 'Create/upload flow coming soon.');
              }}
              activeOpacity={0.7}>
              <Icon
                name="add-circle-outline"
                size={32}
                color={activeTab === 'home' ? '#000' : '#fff'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navItem}
              onPress={() => setActiveTab('reels')}
              activeOpacity={0.7}>
              <Icon
                name={activeTab === 'reels' ? 'play-circle' : 'play-circle-outline'}
                size={28}
                color={activeTab === 'home' ? '#000' : '#fff'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navItem}
              onPress={() => setActiveTab('profile')}
              activeOpacity={0.7}>
              <View style={[
                styles.profileIconContainer,
                activeTab === 'profile' && styles.profileIconActive,
              ]}>
                <Image
                  source={{uri: 'https://i.pravatar.cc/150?img=33'}}
                  style={styles.profileIcon}
                />
              </View>
            </TouchableOpacity>
          </View>
          )}
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  appContainer: {
    flex: 1,
  },
  placeholderScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  placeholderLight: {
    backgroundColor: '#fff',
  },
  placeholderText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  placeholderTextLight: {
    color: '#000',
  },
  placeholderSubtext: {
    color: '#888',
    fontSize: 15,
  },
  placeholderSubtextLight: {
    color: '#999',
  },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingBottom: 0,
  },
  bottomNavLight: {
    backgroundColor: '#fff',
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
  },
  profileIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  profileIconActive: {
    borderColor: '#262626',
    borderWidth: 2,
  },
  profileIcon: {
    width: '100%',
    height: '100%',
  },
});

export default App;
