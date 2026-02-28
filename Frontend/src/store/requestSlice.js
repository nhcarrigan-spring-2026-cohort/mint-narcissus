import { createSlice } from '@reduxjs/toolkit';

const requestsFromStorage = JSON.parse(localStorage.getItem('requests')) || [];

const requestSlice = createSlice({
  name: 'requests',
  initialState: {
    items: requestsFromStorage,
  },
  reducers: {
    createRequest: (state, action) => {
      const { outfitId, borrowerId } = action.payload;
      const existing = state.items.find(
        (r) =>
          r.outfitId === outfitId &&
          r.borrowerId === borrowerId &&
          r.status !== 'rejected',
      );
      if (existing) {
        return;
      }
      state.items.push(action.payload);
      localStorage.setItem('requests', JSON.stringify(state.items));
    },
    updateRequestStatus: (state, action) => {
      const { requestId, status } = action.payload;

      const request = state.items.find((r) => r.id === requestId);
      if (request) {
        request.status = status;
        localStorage.setItem('requests', JSON.stringify(state.items));
      }
    },
  },
});

export const { createRequest, updateRequestStatus } = requestSlice.actions;
export default requestSlice.reducer;
