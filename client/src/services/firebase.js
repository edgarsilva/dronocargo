// Firebase Imports
import { initializeApp } from "firebase/app";

// Import the functions you need from the SDKs you need
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";

// Firebase app configuration setup
const firebaseConfig = {
  apiKey: "AIzaSyC8FuK9Xfa8XVDHFNij8BQOmVnMyA3I6yc",
  authDomain: "dronocargo.firebaseapp.com",
  projectId: "dronocargo",
  storageBucket: "dronocargo.appspot.com",
  messagingSenderId: "524601128296",
  appId: "1:524601128296:web:d2d3c3ba332267ea8712dd",
  databaseURL: "https://dronocargo.firebaseio.com",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth();

// DB
export const db = getFirestore(app);
// export const auth = getAuth();

export default app;