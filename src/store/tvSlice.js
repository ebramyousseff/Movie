import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTv = createAsyncThunk(
  "tv/fetchTv",
  async (category, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const apiKey = import.meta.env.VITE_APP_API_KEY;
      const response = await axios.get(
        `https://api.themoviedb.org/3/${category}?api_key=${apiKey}`
      );
      return response.data.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const tvSlice = createSlice({
  name: "tv",
  initialState: {
    loading: "idle",
    movies: [], 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTv.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchTv.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchTv.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      });
  },
});

export default tvSlice.reducer;
