import { configureStore } from "@reduxjs/toolkit";
import authAdminReducer from "../features/authSliceAdmin.js";

export const store = configureStore({
  reducer: {
    authAdmin: authAdminReducer,
  },
});
