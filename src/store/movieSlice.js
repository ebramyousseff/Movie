import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMovie = createAsyncThunk(
  "movie/fetchMovie",
  async (category, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const apiKey = import.meta.env.VITE_APP_API_KEY;
      const response = await axios.get(
        `https://api.themoviedb.org/3/${category}?api_key=${apiKey}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    loading: "idle",
    movies: {},
    imageURL: "",
    error: null,
  },
  reducers: {
    setmovieData: (state, action) => {
      state.bannerData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovie.pending, (state) => {
        state.loading = "idle";
        state.loading = null;
      })
      .addCase(fetchMovie.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.movies = action.payload.results;
            })
      .addCase(fetchMovie.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});
export const { setBannerData, setImageURL } = movieSlice.actions;

export default movieSlice.reducer;
