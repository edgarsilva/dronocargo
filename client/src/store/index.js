// import { createStore, applyMiddleware } from 'redux';
import { configureStore } from "@reduxjs/toolkit";
// import reduxThunk from 'redux-thunk';
// import reducers from '../reducers';
import authSlice from "./auth-slice";

const store = configureStore({
  reducer: {
    auth: authSlice
  }
});

export default store;