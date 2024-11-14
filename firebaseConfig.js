import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import {
  initializeFirestore,
  setLogLevel,
  persistentLocalCache,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBOVVuZX8IKe-jCU9cnZmm4cxWoaB6ytNU",
  authDomain: "designnetapp-88e60.firebaseapp.com",
  projectId: "designnetapp-88e60",
  storageBucket: "designnetapp-88e60.appspot.com",
  messagingSenderId: "705777611257",
  appId: "1:705777611257:android:5632a15c03ece0d6908d28",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
  console.log("Firebase Auth initialized successfully");
} catch (error) {
  console.log("Error initializing Firebase Auth:");
}

const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  localCache: persistentLocalCache(),
});

setLogLevel("silent");

export { auth, db };
