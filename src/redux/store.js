import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  blacklist: [""], // Exclude auth slice from persisting
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"], // Ignore redux-persist actions
        ignoredPaths: ['someReducer.someNonSerializableValue']
      },
    }),
});

// Create a persistor
const persistor = persistStore(store);

export { persistor };
export default store;
