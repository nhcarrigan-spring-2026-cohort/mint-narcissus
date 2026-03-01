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

    toggleAvailability: (state, action) => {
      const outfit = state.items.find((o) => o.id === action.payload);
      if (outfit) {
        outfit.status =
          outfit.status === 'Unavailable' ? 'Available' : 'Unavailable';
        localStorage.setItem('outfits', JSON.stringify(state.items));
      }
    },
  },
});

export const { addOutfit, updateOutfitStatus, toggleAvailability } =
  outfitSlice.actions;

export default outfitSlice.reducer;
