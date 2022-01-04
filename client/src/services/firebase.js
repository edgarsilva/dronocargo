// Firebase Imports
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";

// import { useAuthState } from "react-firebase-hooks/auth";
// import { useCollectionData } from "react-firebase-hooks/firestore";

// Firebase setup
!firebase.apps.length && firebase.initializeApp({
  apiKey: "AIzaSyAl0gOF_KoCSk9VQb_jqClM6H26fl_PABA",
  authDomain: "restoration-md.firebaseapp.com",
  databaseURL: "https://restoration-md.firebaseio.com",
  projectId: "restoration-md",
  storageBucket: "restoration-md.appspot.com",
  messagingSenderId: "705185549782",
  appId: "1:705185549782:web:0b73a05d1d8b700b17e877",
  measurementId: "G-PK6JGKS3KV"
});

// Auth
export const firebaseAuth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// DB
export const firestore = firebase.firestore();

// Storage
export const storageRef = firebase.storage().ref();
export const projectPhotosRef = storageRef.child("projectPhotos");

export default firebase;