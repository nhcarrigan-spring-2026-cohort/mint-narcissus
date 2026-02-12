import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import roleReducer from './roleSlice';

export const store = configureStore({
  reducer: { auth: authReducer, role: roleReducer },
});

export default store;
