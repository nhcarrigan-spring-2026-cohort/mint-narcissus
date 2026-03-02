import { createSlice } from '@reduxjs/toolkit';

const savedFromStorage = JSON.parse(localStorage.getItem('saved')) || [];

const savedSlice = createSlice({
  name: 'saved',
  initialState: {
    items: savedFromStorage,
  },
  reducers: {
    toggleSave: (state, action) => {
      const outfit = action.payload;
      const exists = state.items.find((item) => item.id === outfit.id);

      if (exists) {
        state.items = state.items.filter((item) => item.id !== outfit.id);
      } else {
        state.items.push(outfit);
      }

      localStorage.setItem('saved', JSON.stringify(state.items));
    },
    clearSaved: (state) => {
      state.items = [];
      localStorage.removeItem('saved');
    },
  },
});

export const { toggleSave, clearSaved } = savedSlice.actions;
export default savedSlice.reducer;
