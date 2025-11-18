export interface Video {
  id: string;
  uri: string;
  username: string;
  description: string;
  likes: number;
  comments: number;
  shares: number;
  userAvatar: string;
}

// Sample video data - Replace these URLs with your actual video URLs
export const videos: Video[] = [
  {
    id: '1',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    username: 'user_one',
    description: 'Amazing video content #ilmegram #viral',
    likes: 1234,
    comments: 89,
    shares: 45,
    userAvatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    username: 'creative_user',
    description: 'Check out this amazing content! 🔥',
    likes: 5678,
    comments: 234,
    shares: 123,
    userAvatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    username: 'content_creator',
    description: 'New video alert! Like and share ❤️',
    likes: 9876,
    comments: 456,
    shares: 234,
    userAvatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: '4',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    username: 'explorer_life',
    description: 'Living my best life 🌟 #travel #adventure',
    likes: 3456,
    comments: 178,
    shares: 67,
    userAvatar: 'https://i.pravatar.cc/150?img=4',
  },
  {
    id: '5',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    username: 'fun_times',
    description: 'Having so much fun! 🎉',
    likes: 7890,
    comments: 345,
    shares: 189,
    userAvatar: 'https://i.pravatar.cc/150?img=5',
  },
];
