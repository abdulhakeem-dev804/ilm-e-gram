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
