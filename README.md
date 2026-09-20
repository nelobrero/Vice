# Vice — Job Application Tracker

A mobile app for tracking job applications — company, position, date applied, salary, and status (On Going / Rejected / Hired) — with Google sign-in and a roadmap toward automatic status updates by reading Gmail notifications.

## Features

- **Google Sign-In** via Firebase Authentication
- **Track applications** — company, position, date applied, salary
- **Status tracking** — On Going, Rejected, Hired — grouped and color-coded on the dashboard
- **Swipeable header carousel** — greeting, application count, and logout, with auto-advance and dot indicators
- **Congratulations screen** — a celebratory animated screen shown when an application is marked Hired
- **Real-time sync** — powered by Firestore's live listeners, so the list updates instantly across devices
- **Welcome/onboarding screen** shown on first launch

## Planned

- Automatic status detection by reading Gmail notification emails (rejection/offer emails) via the Gmail API, matching them to existing applications and updating status without manual input
- Push notifications for status changes
- Filtering on the dashboard

## Tech Stack

- **React Native** (Expo, managed workflow)
- **React Navigation** (native stack)
- **Firebase** — Authentication (Google provider) and Firestore (database)
- **expo-auth-session** — Google OAuth flow
- **EAS Build** — development client builds for Android/iOS
- **Bebas Neue** (via `@expo-google-fonts`) — display typography

## Project Structure

```
src/
├── components/       # Reusable UI components (e.g. HeaderCarousel)
├── context/          # AuthContext — tracks Firebase auth state app-wide
├── navigation/        # AppNavigator — auth-aware screen stack
├── screens/           # Welcome, Login, Dashboard, AddEditApplication,
│                       # ApplicationDetail, Congratulations
├── services/           # firebase.js (config), applications.js (Firestore CRUD)
└── utils/              # Small shared helpers (confirm dialogs, grouping logic)
```

## Setup

### 1. Install dependencies
```
npm install
```

### 2. Firebase configuration
This project expects a `src/services/firebase.js` file (not tracked in git) exporting an initialized Firebase `auth` and `db`. Create one using your own Firebase project's config:

```js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Platform } from "react-native";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth =
  Platform.OS === "web"
    ? getAuth(app)
    : initializeAuth(app, { persistence: getReactNativePersistence(ReactNativeAsyncStorage) });

export const db = getFirestore(app);
export default app;
```

You'll need a Firebase project with **Authentication → Google** enabled and a **Firestore database** created, plus matching **OAuth client IDs** (Web and iOS) configured in Google Cloud Console with the appropriate redirect URIs.

### 3. Run on web (fastest for iteration)
```
npx expo start
```
then press `w`.

### 4. Run on a device
This project requires a custom **EAS development build** (not Expo Go) since Google Sign-In needs a real app URL scheme.

```
npx eas-cli build --profile development --platform android
```
Install the resulting `.apk` on your device, then:
```
npx expo start --dev-client
```

iOS device builds require an Apple Developer Program membership.

## Firestore Security

Current rules require the requester to be signed in:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```
This should be tightened to scope access to each user's own documents (`resource.data.userId == request.auth.uid`) before any real users are onboarded.
