// Firebase Imports
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";

// import { useAuthState } from "react-firebase-hooks/auth";
// import { useCollectionData } from "react-firebase-hooks/firestore";

// Firebase setup
!firebase.apps.length && firebase.initializeApp({

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