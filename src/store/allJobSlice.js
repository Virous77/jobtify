import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../utils/axios";

const initialFilterState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplication: [],
  ...initialFilterState,
};

export const showStats = createAsyncThunk(
  "allJobs/showStats",
  async (_, thunkAPI) => {
    try {
      const res = await customFetch.get("jobs/stats", {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().users.user.token}`,
        },
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const getAllJobs = createAsyncThunk(
  "allJobs/getJobs",
  async (_, thunkAPI) => {
    const { page, search, searchStatus, searchType, sort } =
      thunkAPI.getState().allJobs;
    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;

    if (search) {
      url = url + `&search=${search}`;
    }

    try {
      const res = await customFetch.get(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().users.user.token}`,
        },
      });

      console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const allJobSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    SHOW_LOADING(state) {
      state.isLoading = true;
    },

    HIDE_LOADING(state) {
      state.isLoading = false;
    },

    HANDLECHANGE(state, action) {
      const { name, value } = action.payload;
      state.page = 1;
      state[name] = value;
    },

    CLEAR_FILTERS(state) {
      return { ...state, ...initialFilterState };
    },

    CHANGE_PAGE(state, { payload }) {
      state.page = payload;
    },
  },
  extraReducers: {
    //Get all jobs
    [getAllJobs.pending]: (state) => {
      state.isLoading = true;
    },

    [getAllJobs.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.jobs = payload.jobs;
      state.numOfPages = payload.numOfPages;
      state.totalJobs = payload.totalJobs;
    },

    [getAllJobs.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

    // Get all the Stats
    [showStats.pending]: (state) => {
      state.isLoading = true;
    },

    [showStats.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.stats = payload.defaultStats;
      console.log(payload);
      state.monthlyApplication = payload.monthlyApplications;
    },

    [showStats.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const {
  SHOW_LOADING,
  HIDE_LOADING,
  HANDLECHANGE,
  CLEAR_FILTERS,
  CHANGE_PAGE,
} = allJobSlice.actions;
export const selectJobs = (state) => state.allJobs.jobs;
export const selectIsLoading = (state) => state.allJobs.isLoading;
export const selectMonthlyApplication = (state) =>
  state.allJobs.monthlyApplication;
export const selectStats = (state) => state.allJobs.stats;

export default allJobSlice.reducer;
