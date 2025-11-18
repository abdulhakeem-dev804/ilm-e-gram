import {Conversation, Message} from '../types';

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    username: 'ilm_hub',
    avatar: 'https://i.pravatar.cc/150?img=32',
    lastMessage: 'Thanks for sharing that article!',
    timestamp: '2m',
    unread: true,
    isOnline: true,
  },
  {
    id: '2',
    username: 'daily_reflections',
    avatar: 'https://i.pravatar.cc/150?img=12',
    lastMessage: 'See you tomorrow ✨',
    timestamp: '1h',
    unread: false,
    isOnline: true,
  },
  {
    id: '3',
    username: 'text_notes',
    avatar: 'https://i.pravatar.cc/150?img=18',
    lastMessage: 'You: Got it, will check it out',
    timestamp: '3h',
    unread: false,
    isOnline: false,
  },
  {
    id: '4',
    username: 'visual_learning',
    avatar: 'https://i.pravatar.cc/150?img=24',
    lastMessage: 'That design looks amazing! 🎨',
    timestamp: '1d',
    unread: true,
    isOnline: false,
  },
  {
    id: '5',
    username: 'code_academy',
    avatar: 'https://i.pravatar.cc/150?img=8',
    lastMessage: 'You: Thanks! Let me know if you need help',
    timestamp: '2d',
    unread: false,
    isOnline: false,
  },
  {
    id: '6',
    username: 'design_pro',
    avatar: 'https://i.pravatar.cc/150?img=15',
    lastMessage: 'The new UI update is live!',
    timestamp: '3d',
    unread: false,
    isOnline: true,
  },
];

// Mock messages for individual conversations
export const MOCK_MESSAGES: Record<string, Message[]> = {
  '1': [
    {
      id: '1',
      text: 'Hey! Did you see the latest post?',
      senderId: '1',
      timestamp: new Date(Date.now() - 3600000),
      status: 'read',
    },
    {
      id: '2',
      text: 'Yes! It was really insightful',
      senderId: 'me',
      timestamp: new Date(Date.now() - 3500000),
      status: 'read',
    },
    {
      id: '3',
      text: 'I thought you might like it. Check out this article too',
      senderId: '1',
      timestamp: new Date(Date.now() - 3400000),
      status: 'read',
    },
    {
      id: '4',
      text: 'Thanks for sharing that article!',
      senderId: '1',
      timestamp: new Date(Date.now() - 120000),
      status: 'delivered',
    },
  ],
  '2': [
    {
      id: '1',
      text: 'Morning! Ready for today?',
      senderId: '2',
      timestamp: new Date(Date.now() - 7200000),
      status: 'read',
    },
    {
      id: '2',
      text: 'Yes! Feeling motivated ✨',
      senderId: 'me',
      timestamp: new Date(Date.now() - 7100000),
      status: 'read',
    },
    {
      id: '3',
      text: 'That is great to hear!',
      senderId: '2',
      timestamp: new Date(Date.now() - 7000000),
      status: 'read',
    },
    {
      id: '4',
      text: 'See you tomorrow ✨',
      senderId: '2',
      timestamp: new Date(Date.now() - 3600000),
      status: 'read',
    },
  ],
};
