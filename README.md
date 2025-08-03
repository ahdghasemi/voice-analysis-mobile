# Voice Analysis App - Expo Build

This is a complete React Native voice analysis app that records audio and predicts demographic characteristics using AI.

## Features
- Voice recording with microphone permissions
- Real-time audio visualization
- AI-powered demographic analysis (gender, age, ethnicity)
- Confidence scores for all predictions
- iOS-inspired design with proper UX
- Privacy-focused (local processing)

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Install Expo CLI globally:
```bash
npm install -g @expo/cli eas-cli
```

3. Login to Expo:
```bash
npx expo login
```

4. Build APK:
```bash
npx eas build --platform android --profile preview
```

## Build Configuration
- `app.json` - App settings and permissions
- `eas.json` - Build profiles for development/production
- `package.json` - Dependencies and scripts

## Download APK
After build completes, download from: https://expo.dev/builds

The APK will be ready to install on any Android device.