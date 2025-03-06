import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTVDetails = createAsyncThunk(
  "tvdetails/fetchTVDetails",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const apiKey = import.meta.env.VITE_APP_API_KEY;
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const tvDetailsSlice = createSlice({
  name: "tvDetails",
  initialState: {
    loading: "idle",
    tvDetails: {},
    imageURL: "",
    error: null,
  },
  reducers: {
    setTvDetails : (state, action)=>{
      state.tvDetails = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTVDetails.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchTVDetails.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.tvDetails = action.payload;
      })
      .addCase(fetchTVDetails.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});
export const { setTvDetails } = tvDetailsSlice.actions;

export default tvDetailsSlice.reducer;
