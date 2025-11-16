# Quick Start Guide - Ilm-e-gram

## 🚀 Getting Started

### Step 1: Start Metro Bundler

Open a terminal in the project directory and run:

```bash
npm start
```

This will start the Metro bundler. Keep this terminal running.

### Step 2: Run the App

Open a **new terminal** in the project directory and run:

#### For Android:
```bash
npm run android
```

**Prerequisites for Android:**
- Android Studio installed
- Android SDK configured
- Android emulator running OR physical device connected via USB with USB debugging enabled

#### For iOS (macOS only):
```bash
npm run ios
```

**Prerequisites for iOS:**
- Xcode installed (macOS only)
- CocoaPods installed (`sudo gem install cocoapods`)
- Run `cd ios && pod install && cd ..` before running the app

## 📱 How to Use the App

Once the app is running:

1. **Swipe Up/Down** - Navigate through videos
2. **Tap Video** - Pause/Play
3. **Tap ❤️** - Like the video
4. **Tap 💬** - View and add comments
5. **Tap 🔄** - Share the video

## 🐛 Troubleshooting

### Metro Bundler Not Starting
```bash
npx react-native start --reset-cache
```

### Android App Not Installing
```bash
cd android
gradlew clean
cd ..
npm run android
```

### Clear All Cache
```bash
npm start -- --reset-cache
```

### Port Already in Use
```bash
npx react-native start --port 8082
```

## 📝 Customizing Videos

Edit `src/data/videos.ts` to add your own video URLs. You can use:
- Local video files
- Remote video URLs (must be accessible)
- Public video hosting services

## 🎨 Customizing the UI

- **VideoPlayer styles**: Edit `src/components/VideoPlayer.tsx`
- **Feed layout**: Edit `src/screens/VideoFeed.tsx`
- **Colors and theme**: Modify the `styles` objects in each component

## 🔧 Development Tips

### Enable Fast Refresh
Fast Refresh is enabled by default. Just save your files and see changes instantly!

### Debug Menu
- **Android**: Press `Ctrl + M` or shake device
- **iOS**: Press `Cmd + D` or shake device

### Check Logs
```bash
# Android
npx react-native log-android

# iOS
npx react-native log-ios
```

## 📦 Project Structure

```
ilm-e-gram/
├── src/
│   ├── components/
│   │   └── VideoPlayer.tsx    # Video player with interactions
│   ├── screens/
│   │   └── VideoFeed.tsx       # Main scrolling feed
│   └── data/
│       └── videos.ts           # Video data
├── App.tsx                     # Main app entry
├── package.json
└── README_ILM_E_GRAM.md       # Full documentation
```

## ✅ Features Implemented

- ✅ Vertical video scrolling
- ✅ Like/Unlike functionality
- ✅ Comments with modal
- ✅ Share button
- ✅ Auto-play/pause based on visibility
- ✅ Tap to pause/play
- ✅ User avatars and descriptions
- ✅ Optimized performance

## 🎯 Next Steps

1. Replace sample videos with your own content
2. Add authentication
3. Connect to a backend API
4. Add video upload functionality
5. Implement user profiles

---

Need help? Check README_ILM_E_GRAM.md for detailed documentation!
