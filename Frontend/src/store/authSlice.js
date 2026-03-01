import { createSlice } from '@reduxjs/toolkit';

const savedUser = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: savedUser || null,
  isAuthenticated: !!savedUser,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },

    completeProfile: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
        profileCompleted: true,
      };
      localStorage.setItem('user', JSON.stringify(state.user));
    },

    switchRole: (state, action) => {
      state.user.activeRole = action.payload;
      localStorage.setItem('user', JSON.stringify(state.user));
    },

    verifyLinkedIn: (state) => {
      state.user.isVerified = true;
      localStorage.setItem('user', JSON.stringify(state.user));
    },
  },
});

export const { login, logout, completeProfile, switchRole, verifyLinkedIn } =
  authSlice.actions;
export default authSlice.reducer;
