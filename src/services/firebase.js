// Firebase initialization
// 1. Go to https://console.firebase.google.com → Create a project
// 2. Add a Web app (yes, even though this is React Native — Firebase JS SDK works fine with Expo)
// 3. Copy the config object it gives you and paste the values below
// 4. Enable: Authentication → Google sign-in provider, and Firestore Database (start in test mode for now)

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9lvgJvZs6yN_c-R-r7WzrhZiUE8_-2Gs",
  authDomain: "vice-c0fcf.firebaseapp.com",
  projectId: "vice-c0fcf",
  storageBucket: "vice-c0fcf.firebasestorage.app",
  messagingSenderId: "715541096682",
  appId: "1:715541096682:web:a8372acca8a5444fe3cf93",
  measurementId: "G-3DLN9VJYWP"
};

// Prevents re-initializing on hot reload
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;

//


