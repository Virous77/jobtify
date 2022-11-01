import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../utils/axios";

const getLocalData = () => {
  const result = localStorage.getItem("jobtify");
  const res = result ? JSON.parse(result) : null;

  return res;
};

const initialState = {
  user: getLocalData(),
  isLoading: false,
  isSidebarOpen: false,
};

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.patch("/auth/updateUser", user, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().users.user.token}`,
        },
      });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/register", user);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/login", user);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    TOGGLE_SIDEBAR(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },

    LOGOUT_USER(state) {
      state.user = null;
      state.isSidebarOpen = false;
      localStorage.removeItem("jobtify");
    },
  },
  extraReducers: {
    //Register
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      localStorage.setItem("jobtify", JSON.stringify(user));
      toast.success(`Hello There ${user.name}`);
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

    //Login
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      localStorage.setItem("jobtify", JSON.stringify(user));
      toast.success(`Welcome Back ${user.name}`);
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

    //Update user
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      localStorage.setItem("jobtify", JSON.stringify(user));
      toast.success(`Profile data updated!`);
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const { TOGGLE_SIDEBAR, LOGOUT_USER } = userSlice.actions;

export const selectIsSidebarOpen = (state) => state.users.isSidebarOpen;

export const selectUser = (state) => state.users.user;
export const selectIsLoading = (state) => state.users.isLoading;

export default userSlice.reducer;
