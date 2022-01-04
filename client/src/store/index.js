// import { createStore, applyMiddleware, combineReducers } from 'redux';
import { configureStore } from "@reduxjs/toolkit";
// import reduxThunk from 'redux-thunk';
// import reducers from '../reducers';
import authSlice from "./auth-slice";
import deliveriesSlice from "./deliveries-slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    deliveries: deliveriesSlice,
  }
  // middleware: [reduxThunk]
});

export default store;