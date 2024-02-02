import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  admin: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
export const LoginAdmin = createAsyncThunk(
  "admin/LoginAdmin",
  async (admin, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:5000/adminlogin", {
        email: admin.email,
        password: admin.password,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);
export const AdminMe = createAsyncThunk(
  "admin/AdminMe",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:5000/adminme");
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const LogoutAdmin = createAsyncThunk("admin/LogoutAdmin", async () => {
  await axios.delete("http://localhost:5000/adminlogout");
});

export const authSliceAdmin = createSlice({
  name: "authAdmin",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(LoginAdmin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.admin = action.payload;
    });
    builder.addCase(LoginAdmin.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // data login
    builder.addCase(AdminMe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(AdminMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.admin = action.payload;
    });
    builder.addCase(AdminMe.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});
export const { reset } = authSliceAdmin.actions;
export default authSliceAdmin.reducer;
