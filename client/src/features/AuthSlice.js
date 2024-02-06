import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Login User
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: user.email,
        password: user.password,
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

// Login Admin
export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
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

// Me User
export const meUser = createAsyncThunk("auth/meUser", async (_, thunkAPI) => {
  try {
    const response = await axios.get("http://localhost:5000/me");
    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
});

// Me Admin
export const meAdmin = createAsyncThunk("auth/meAdmin", async (_, thunkAPI) => {
  try {
    const response = await axios.get("http://localhost:5000/adminme");
    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
});

// Logout User
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await axios.delete("http://localhost:5000/logout");
});

// Logout Admin
export const logoutAdmin = createAsyncThunk("auth/logoutAdmin", async () => {
  await axios.delete("http://localhost:5000/adminlogout");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    // User
    builder.addCase(loginUser.pending, (state) => {
      state.user = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = true;
      state.message = "";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.message = "";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.user = null;
      state.isError = true;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = action.payload;
    });
    builder.addCase(meUser.pending, (state) => {
      state.user = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = true;
      state.message = "";
    });
    builder.addCase(meUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.message = "";
    });
    builder.addCase(meUser.rejected, (state, action) => {
      state.user = null;
      state.isError = true;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = action.payload;
    });

    // Admin
    builder.addCase(loginAdmin.pending, (state) => {
      state.user = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = true;
      state.message = "";
    });
    builder.addCase(loginAdmin.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.message = "";
    });
    builder.addCase(loginAdmin.rejected, (state, action) => {
      state.user = null;
      state.isError = true;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = action.payload;
    });
    builder.addCase(meAdmin.pending, (state) => {
      state.user = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = true;
      state.message = "";
    });
    builder.addCase(meAdmin.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.message = "";
    });
    builder.addCase(meAdmin.rejected, (state, action) => {
      state.user = null;
      state.isError = true;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = action.payload;
    });
  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
