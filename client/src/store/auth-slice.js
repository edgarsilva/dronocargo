import axios from 'axios';
import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: null, creds: {}};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    fetchUser(state, action) {
      state.user = action.payload.user;
    },
    updateCreds(state, action) {
      state.creds = { ...state.creds, ...action.payload }
    },
    updateAuth(state, action) {
      return { ...state, ...action.payload };
    }
  }
});

export const authActions = authSlice.actions;

export const fetchUser = (arg1) => async (dispatch) => {
  console.log("Arg1 ==>", arg1);
  try {
    const response = await axios.get('auth/fetch-user');

    dispatch(authActions.fetchUser({
      user: response.data.user,
      creds: null
    }));
  } catch (error) {
    dispatch(authActions.fetchUser({
      user: null,
      creds: null
    }));
  }
};

export const signIn = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post('/auth/sign-in', { username: email, password: password || "****" });

    dispatch(authActions.fetchUser({
      user: response.data.user,
      creds: null
    }));
  } catch (error) {
    dispatch(authActions.fetchUser({
      user: null,
      creds: null
    }));
  }
};

export const signOut = () => async (dispatch) => {
  try {
    await axios.delete('/auth/sign-out');

    dispatch(authActions.fetchUser({
      user: null,
    }));
  } catch (error) {
    dispatch(authActions.fetchUser({
      user: null,
      creds: null
    }));
  }
};


export default authSlice.reducer;