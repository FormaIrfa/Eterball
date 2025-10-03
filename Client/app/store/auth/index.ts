
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice"; 
// Création du store
export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

// 🔥 Types automatiques pour ton projet
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
