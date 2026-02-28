import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import savedReducer from './savedSlice';
import requestsReducer from './requestSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    saved: savedReducer,
    requests: requestsReducer,
  },
});

export default store;
