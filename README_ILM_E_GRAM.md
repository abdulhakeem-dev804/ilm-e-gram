# Ilm-e-gram

An Instagram-like video scrolling application built with React Native, featuring vertical video feed with social interactions.

## Features

✨ **Core Features:**
- 📹 Vertical video scrolling (like Instagram Reels/TikTok)
- ❤️ Like/Unlike videos
- 💬 Comment on videos
- 🔄 Share/Retweet functionality
- 👤 User profiles with avatars
- ⏯️ Tap to pause/play videos
- 📱 Full-screen immersive video experience

## Tech Stack

- **React Native** - Cross-platform mobile framework
- **react-native-video** - Video playback component
- **react-native-gesture-handler** - Gesture handling
- **react-native-reanimated** - Smooth animations
- **TypeScript** - Type safety

## Project Structure

```
ilm-e-gram/
├── src/
│   ├── components/
│   │   └── VideoPlayer.tsx      # Video player with interactions
│   ├── screens/
│   │   └── VideoFeed.tsx         # Main vertical scrolling feed
│   └── data/
│       └── videos.ts             # Sample video data
├── App.tsx                       # Main app component
└── package.json
```

## Setup and Installation

### Prerequisites

- Node.js (v16 or higher)
- React Native development environment setup
  - For Android: Android Studio and Android SDK
  - For iOS: Xcode (macOS only)
- Java Development Kit (JDK)

### Installation Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **For Android:**
   ```bash
   npx react-native run-android
   ```

3. **For iOS (macOS only):**
   ```bash
   cd ios && pod install && cd ..
   npx react-native run-ios
   ```

## How to Use

1. **Scroll Videos**: Swipe up or down to navigate through videos
2. **Like**: Tap the heart icon to like/unlike a video
3. **Comment**: Tap the comment icon to open comments and add your own
4. **Share**: Tap the share icon to share the video
5. **Pause/Play**: Tap anywhere on the video to pause or resume playback

## Customization

### Adding Your Own Videos

Edit `src/data/videos.ts` to add your own video URLs:

```typescript
{
  id: 'unique_id',
  uri: 'your_video_url.mp4',
  username: 'username',
  description: 'Video description',
  likes: 0,
  comments: 0,
  shares: 0,
  userAvatar: 'avatar_url',
}
```

### Styling

All styles are contained within each component using StyleSheet. Modify the styles object in:
- `VideoPlayer.tsx` for video player UI
- `VideoFeed.tsx` for feed layout

## Key Components

### VideoPlayer
- Handles individual video playback
- Manages like, comment, and share interactions
- Displays user information and video description
- Includes a modal for comments

### VideoFeed
- Manages vertical scrolling
- Tracks active video for playback
- Optimized for performance with FlatList

## Troubleshooting

### Metro Bundler Issues
```bash
npx react-native start --reset-cache
```

### Android Build Issues
```bash
cd android
./gradlew clean
cd ..
npx react-native run-android
```

### iOS Build Issues
```bash
cd ios
pod deintegrate
pod install
cd ..
npx react-native run-ios
```

## Future Enhancements

- [ ] User authentication
- [ ] Video recording and upload
- [ ] Follow/unfollow users
- [ ] Notifications
- [ ] Direct messaging
- [ ] Video filters and effects
- [ ] Search functionality
- [ ] User profile pages
- [ ] Trending/Discover page

## Performance Tips

- Videos are loaded on-demand using pagination
- Only 3 videos are rendered at a time (current, previous, next)
- Videos automatically pause when not in view
- Optimized with `removeClippedSubviews` for better performance

## License

MIT License - Feel free to use this project for learning and development.

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

---

**Built with ❤️ using React Native**
