import { createSlice, nanoid } from '@reduxjs/toolkit';

const stored = JSON.parse(localStorage.getItem('outfits')) || [];

const outfitSlice = createSlice({
  name: 'outfits',
  initialState: {
    items: stored,
  },
  reducers: {
    addOutfit: {
      reducer: (state, action) => {
        state.items.push(action.payload);
        localStorage.setItem('outfits', JSON.stringify(state.items));
      },
      prepare: (data) => ({
        payload: {
          id: nanoid(),
          status: 'Available',
          createdAt: new Date().toISOString(),
          ...data,
        },
      }),
    },
    updateOutfitStatus: (state, action) => {
      const { outfitId, status } = action.payload;

      const outfit = state.items.find((o) => o.id === outfitId);
      if (outfit) {
        outfit.status = status;
        localStorage.setItem('outfits', JSON.stringify(state.items));
      }
    },
    removeOutfit: (state, action) => {
      state.items = state.items.filter((o) => o.id !== action.payload);
      localStorage.setItem('outfits', JSON.stringify(state.items));
    },
  },
});

export const { addOutfit, updateOutfitStatus, removeOutfit } =
  outfitSlice.actions;

export default outfitSlice.reducer;
