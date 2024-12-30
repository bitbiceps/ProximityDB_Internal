// redux/analyticsSlice.js

import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  selectedProject: null, // Renaming to selectedProject
};

// Create slice
const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload; // Store the selected project data
    },
    clearSelectedProject: (state) => {
      state.selectedProject = null; // Optionally clear the selected project
    },
  },
});

// Export the actions
export const { setSelectedProject, clearSelectedProject } = analyticsSlice.actions;

// Export the reducer
export default analyticsSlice.reducer;
