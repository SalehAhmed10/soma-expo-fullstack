# Soma Mobile Auth

A React Native mobile application built with Expo for audio/video content management.

## Features
- User authentication (email/password, social login preparation)
- Live session browsing and joining
- Playlist creation and management
- Session categorization
- Audio/video playback
- User profile management

## Tech Stack
- React Native with Expo
- TypeScript
- Zustand for state management
- Expo Router for navigation
- NativeWind for styling
- Axios for API communication

## Prerequisites
- Node.js 18+
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development - Mac required)

## Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npx expo start`

## Building
- Android: `npx expo build:android` or `eas build --platform android`
- iOS: `npx expo build:ios` or `eas build --platform ios` (requires Mac)

## API Configuration
- Development: `http://localhost:3000/api/somamobileapis`
- Production: `https://soma-nextjs.vercel.app/api/somamobileapis`

## Project Structure