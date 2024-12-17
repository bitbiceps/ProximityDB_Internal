import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  isHovered: false,
  isMobileOpen: false, // New state for mobile
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setHovered(state, action) {
      state.isHovered = action.payload;
    },
    toggleMobileOpen(state) {
      state.isMobileOpen = !state.isMobileOpen; // Toggle the mobile state
    },
    setMobileOpen(state, action) {
      state.isMobileOpen = action.payload; // Set mobile state directly
    },
  },
});

// Export actions and reducer
export const { setHovered, toggleMobileOpen, setMobileOpen } = sidebarSlice.actions;
export default sidebarSlice.reducer;
