import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import savedReducer from './savedSlice';

export const store = configureStore({
  reducer: { auth: authReducer, saved: savedReducer },
});

export default store;
