import axios from 'axios';
import { authActions } from "./auth-slice";

// Firebase Imports
// import firebase, { firebaseAuth, firestore } from "../firebase";

export const firebaseSignIn = (user) => async (dispatch) => {
  try {
    dispatch(authActions.updateAuth({
      user: user.uid ? { id: user.uid, uid: user.uid, displayName: user.displayName, photoURL: user.photoURL } : null,
      creds: {}
    }));
  } catch (error) {
    dispatch(authActions.updateAuth({
      user: null,
      creds: {}
    }));
  }
};

// export const fetchUser = () => async (dispatch) => {
//   try {
//     const response = await axios.get('/auth/fetch-user');

//     dispatch(authActions.updateUser(response.data.user || {}));
//   } catch (error) {
//     dispatch(authActions.updateUser({}));
//   }
// };

// export const signIn = (email, password) => async (dispatch) => {
//   try {
//     const response = await axios.post('/auth/sign-in', { username: email, password: password || "****" });

//     dispatch(authActions.updateAuth({
//       user: response.data.user,
//       creds: {}
//     }));
//   } catch (error) {
//     dispatch(authActions.updateAuth({
//       user: null,
//       creds: {}
//     }));
//   }
// };

export const signOut = () => async (dispatch) => {
  try {
    // await axios.delete('/auth/sign-out');
    dispatch(authActions.updateAuth({
      user: null,
      creds: {}
    }));
  } catch (error) {
    dispatch(authActions.updateAuth({
      user: null,
      creds: {}
    }));
  }
};