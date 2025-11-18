import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {Conversation, Message} from '../types';
import {MOCK_MESSAGES} from '../data/chats';
import UserInfoSheet from '../components/UserInfoSheet';

type ChatScreenProps = {
  conversation: Conversation;
  onBack: () => void;
};

const ChatScreen: React.FC<ChatScreenProps> = ({conversation, onBack}) => {
  const [messages, setMessages] = useState<Message[]>(
    MOCK_MESSAGES[conversation.id] || [],
  );
  const [inputText, setInputText] = useState('');
  const [showUserInfo, setShowUserInfo] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const handleSend = () => {
    if (inputText.trim().length === 0) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      senderId: 'me',
      timestamp: new Date(),
      status: 'sent',
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // Simulate message status updates
    setTimeout(() => {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === newMessage.id ? {...msg, status: 'delivered'} : msg,
        ),
      );
    }, 1000);
  };

  const renderMessage = ({item}: {item: Message}) => {
    const isMe = item.senderId === 'me';

    return (
      <View
        style={[
          styles.messageContainer,
          isMe ? styles.messageContainerMe : styles.messageContainerOther,
        ]}>
        {!isMe && (
          <Image
            source={{uri: conversation.avatar}}
            style={styles.messageAvatar}
          />
        )}
        <View
          style={[
            styles.messageBubble,
            isMe ? styles.messageBubbleMe : styles.messageBubbleOther,
          ]}>
          <Text
            style={[
              styles.messageText,
              isMe ? styles.messageTextMe : styles.messageTextOther,
            ]}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}>
        {/* Header */}
        <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={onBack}
            style={styles.backButton}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Icon name="chevron-back" size={28} color="#262626" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerInfoTouchable}
            onPress={() => setShowUserInfo(true)}
            activeOpacity={0.7}>
            <Image source={{uri: conversation.avatar}} style={styles.headerAvatar} />
            <View style={styles.headerInfo}>
              <Text style={styles.headerUsername}>{conversation.username}</Text>
              {conversation.isOnline && (
                <Text style={styles.headerStatus}>Active now</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.headerButton}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Icon name="call-outline" size={24} color="#262626" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Icon name="videocam-outline" size={26} color="#262626" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Icon name="information-circle-outline" size={24} color="#262626" />
          </TouchableOpacity>
        </View>
      </View>

        {/* Messages List */}
        <FlatList
          ref={flatListRef}
          data={[...messages].reverse()}
          keyExtractor={item => item.id}
          renderItem={renderMessage}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messagesList}
          inverted
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
        />

        {/* Input Bar */}
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Icon name="camera-outline" size={26} color="#262626" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Icon name="image-outline" size={24} color="#262626" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Icon name="mic-outline" size={24} color="#262626" />
          </TouchableOpacity>

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Message..."
              placeholderTextColor="#8e8e8e"
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={500}
            />
            {inputText.trim().length === 0 ? (
              <TouchableOpacity
                style={styles.emojiButton}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                <Icon name="happy-outline" size={24} color="#262626" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleSend}
                style={styles.sendButton}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* User Info Sheet */}
      <UserInfoSheet
        visible={showUserInfo}
        onClose={() => setShowUserInfo(false)}
        conversation={conversation}
        onViewProfile={() => {
          setShowUserInfo(false);
          Alert.alert('View Profile', `Opening ${conversation.username}'s profile`);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dbdbdb',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: 8,
  },
  headerInfoTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  headerInfo: {
    flex: 1,
  },
  headerUsername: {
    fontSize: 16,
    fontWeight: '600',
    color: '#262626',
  },
  headerStatus: {
    fontSize: 12,
    color: '#8e8e8e',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    marginLeft: 16,
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 4,
    alignItems: 'flex-end',
  },
  messageContainerMe: {
    justifyContent: 'flex-end',
  },
  messageContainerOther: {
    justifyContent: 'flex-start',
  },
  messageAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: '70%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  messageBubbleMe: {
    backgroundColor: '#0095f6',
    borderBottomRightRadius: 4,
  },
  messageBubbleOther: {
    backgroundColor: '#efefef',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  messageTextMe: {
    color: '#fff',
  },
  messageTextOther: {
    color: '#262626',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#dbdbdb',
    backgroundColor: '#fff',
  },
  iconButton: {
    marginRight: 12,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#efefef',
    borderRadius: 20,
    paddingHorizontal: 12,
    minHeight: 36,
    maxHeight: 100,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#262626',
    paddingVertical: 8,
    paddingRight: 8,
  },
  emojiButton: {
    marginLeft: 4,
  },
  sendButton: {
    marginLeft: 4,
  },
  sendButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0095f6',
  },
});

export default ChatScreen;
