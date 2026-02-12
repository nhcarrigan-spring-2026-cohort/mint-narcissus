import { createSlice } from '@reduxjs/toolkit';

const savedRole = localStorage.getItem('activeRole');

const initialState = {
  activeRole: savedRole || 'borrower',
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    switchRole: (state, action) => {
      state.activeRole = action.payload;
      localStorage.setItem('activeRole', action.payload);
    },
  },
});

export const { switchRole } = roleSlice.actions;
export default roleSlice.reducer;
