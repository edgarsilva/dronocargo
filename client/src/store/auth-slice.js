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

export default authSlice.reducer;