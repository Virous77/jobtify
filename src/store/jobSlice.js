import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../utils/axios";
import { toast } from "react-toastify";
import { HIDE_LOADING, SHOW_LOADING, getAllJobs } from "./allJobSlice";

const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobType: "full-time",
  status: "pending",
  isEditing: false,
  editJobId: "",
};

export const editJob = createAsyncThunk(
  "job/editJob",
  async ({ jobId, job }, thunkAPI) => {
    try {
      const res = await customFetch.patch(`/jobs/${jobId}`, job, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().users.user.token}`,
        },
      });

      thunkAPI.dispatch(CLEAR_VALUE());
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const deleteJob = createAsyncThunk(
  "job/deleteJob",
  async (jobId, thunkAPI) => {
    thunkAPI.dispatch(SHOW_LOADING());
    try {
      const res = await customFetch.delete(`jobs/${jobId}`, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().users.user.token}`,
        },
      });
      thunkAPI.dispatch(getAllJobs());
      return res.data.msg;
    } catch (error) {
      thunkAPI.dispatch(HIDE_LOADING());
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const createJob = createAsyncThunk(
  "job/createJob",
  async (job, thunkAPI) => {
    try {
      const res = await customFetch.post("/jobs", job, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().users.user.token}`,
        },
      });
      thunkAPI.dispatch(CLEAR_VALUE());
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const jobSlice = createSlice({
  name: "createJob",
  initialState,
  reducers: {
    HANDLE_CHANGE(state, action) {
      const { name, value } = action.payload;
      state[name] = value;
    },
    CLEAR_VALUE() {
      return {
        ...initialState,
        jobLocation: localStorage.getItem("jobtify")?.location,
      };
    },

    EDIT_JOB(state, { payload }) {
      return { ...state, isEditing: true, ...payload };
    },
  },

  extraReducers: {
    //Create Job
    [createJob.pending]: (state) => {
      state.isLoading = true;
    },

    [createJob.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success("Job Created!");
    },
    [createJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

    //Delete Job
    [deleteJob.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      toast.success(payload);
    },
    [deleteJob.rejected]: ({ payload }) => {
      toast.error(payload);
    },

    //edit job
    [editJob.pending]: (state) => {
      state.isLoading = true;
    },

    [editJob.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success("Job Modified!");
    },
    [editJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const { HANDLE_CHANGE, CLEAR_VALUE, EDIT_JOB } = jobSlice.actions;
export const selectJob = (state) => state.createJob;

export default jobSlice.reducer;
