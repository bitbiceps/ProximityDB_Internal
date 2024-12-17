import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Login async thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login", 
        credentials
      );
      console.log("response.data",response)
      return response.data; // assuming the response contains user data
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// Registration async thunk
export const submitRegistration = createAsyncThunk(
  "auth/submitRegistration",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login action
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handle registration action
      .addCase(submitRegistration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(submitRegistration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = authSlice.actions;

export default authSlice.reducer;
