import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDetails = createAsyncThunk(
  "details/fetchDetails",
  async (details, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const apiKey = import.meta.env.VITE_APP_API_KEY;
      const response = await axios.get(
        `https://api.themoviedb.org/3/${details.kind}/${details.id}?api_key=${apiKey}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const movieDetailsSlice = createSlice({
  name: "details",
  initialState: {
    loading: "idle",
    details: {},
    imageURL: "",
    error: null,
  },
  reducers: {
    setMovieDetails : (state, action)=>{
      state.details = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetails.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchDetails.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.details = action.payload;
      })
      .addCase(fetchDetails.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});
export const { setMovieDetails } = movieDetailsSlice.actions;

export default movieDetailsSlice.reducer;
