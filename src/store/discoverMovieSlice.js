import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllMovies = createAsyncThunk(
  "movies/fetchAllMovies",
  async (currentPage = 1, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
    
      const apiKey = import.meta.env.VITE_APP_API_KEY;
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=${currentPage}`
        );
        console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const initialState = {
    movies: [],
    loading: false,
    error: null,
  };



const allMovieSlice = createSlice({
    name: 'allMovies',
    initialState,
    reducers: { addAllMovies:(state, action)=>{
      state.allTV = action.payload
  }},
    extraReducers: (builder) => {
        builder
          .addCase(fetchAllMovies.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchAllMovies.fulfilled, (state, action) => {
            state.loading = false;
            state.movies = action.payload;
          })
          .addCase(fetchAllMovies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });

}})
export const {addAllMovies} = allMovieSlice.actions

export default allMovieSlice.reducer;