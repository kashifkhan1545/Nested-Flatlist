// src/slices/dataSlice.js

import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    expandedItems: [],
  },
  reducers: {
    setExpandedItems: (state, action) => {
      // Ensure the payload is always an array of serializable values
      const payloadArray = Array.isArray(action.payload)
        ? action.payload.filter(item => typeof item !== 'function')  // Filter out functions
        : [];

      // Update the expandedItems property with the filtered payload array
      state.expandedItems = [...payloadArray];
    },
  },
});

export const { setExpandedItems } = dataSlice.actions;
export default dataSlice.reducer;
