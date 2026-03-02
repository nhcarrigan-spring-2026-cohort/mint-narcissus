import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import savedReducer from './savedSlice';
import requestsReducer from './requestSlice';
import outfitReducer from './outfitSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    saved: savedReducer,
    requests: requestsReducer,
    outfits: outfitReducer,
  },
});

export default store;
