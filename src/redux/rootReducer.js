import { combineReducers } from "@reduxjs/toolkit";
import sidebarReducer from "./slices/sidebarSlice";
import authReducer from "./slices/authSlice"; 

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  auth: authReducer, 
});

export default rootReducer;
