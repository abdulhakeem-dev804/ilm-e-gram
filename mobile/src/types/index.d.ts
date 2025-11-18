declare module 'react-native-video' {
  import {Component} from 'react';
  import {ViewStyle} from 'react-native';

  export interface VideoProperties {
    source: {uri: string} | number;
    style?: ViewStyle;
    resizeMode?: 'contain' | 'cover' | 'stretch';
    repeat?: boolean;
    paused?: boolean;
    muted?: boolean;
    volume?: number;
    rate?: number;
    onLoad?: (data: any) => void;
    onProgress?: (data: any) => void;
    onEnd?: () => void;
    onError?: (error: any) => void;
    onBuffer?: (data: any) => void;
  }

  export default class Video extends Component<VideoProperties> {}
}

// Chat & Messaging Types
export type Message = {
  id: string;
  text: string;
  senderId: string;
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'read';
};

export type Conversation = {
  id: string;
  username: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  isOnline?: boolean;
};
