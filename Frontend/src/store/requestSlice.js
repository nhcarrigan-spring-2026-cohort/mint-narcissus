import { createSlice, nanoid } from '@reduxjs/toolkit';

const requestsFromStorage = JSON.parse(localStorage.getItem('requests')) || [];

const requestSlice = createSlice({
  name: 'requests',
  initialState: {
    items: requestsFromStorage,
  },
  reducers: {
    createRequest: {
      reducer: (state, action) => {
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
      prepare: (data) => ({
        payload: {
          id: nanoid(),
          status: 'Pending',
          createdAt: new Date().toISOString(),
          ...data,
        },
      }),
    },

    updateRequestStatus: (state, action) => {
      const { requestId, status } = action.payload;
      const request = state.items.find((r) => r.id === requestId);
      if (!request) return;

      request.status = status;

      if (status === 'Approved') {
        state.items.forEach((r) => {
          if (
            r.outfitId === request.outfitId &&
            r.id !== requestId &&
            r.status === 'Pending'
          ) {
            r.status = 'Declined';
          }
        });
      }

      localStorage.setItem('requests', JSON.stringify(state.items));
    },
  },
});

export const { createRequest, updateRequestStatus } = requestSlice.actions;
export default requestSlice.reducer;
