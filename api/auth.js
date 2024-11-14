import { auth } from "../firebaseConfig";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";

const db = getFirestore();

// Signup function
export const signup = async (name, email, mobile, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    try {
      const token = await user.getIdToken();
      await AsyncStorage.setItem("authToken", token);
      await AsyncStorage.setItem("userId", user.uid);
    } catch (error) {
      return error.message;
    }

    try {
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        mobile: mobile,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      return error.message;
    }
    return user;
  } catch (error) {
    return error.message;
  }
};

// Login function
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    try {
      const token = await user.getIdToken();
      await AsyncStorage.setItem("authToken", token);
      await AsyncStorage.setItem("userId", user.uid);
    } catch (error) {
      return error.message;
    }

    return user;
  } catch (error) {
    return error.message;
  }
};

// Get current user
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      } else {
        console.log("No user is currently logged in.");
        reject(null);
      }
    });
  });
};

// Get user from Firestore
export const getUserFromFirestore = async (userId) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.log("User not found in Firestore.");
      return null;
    }
  } catch (error) {
    console.log("Error fetching user from Firestore:");
    return null;
  }
};

// Reset password function
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return "Password reset email sent!";
  } catch (error) {
    return error.message;
  }
};
