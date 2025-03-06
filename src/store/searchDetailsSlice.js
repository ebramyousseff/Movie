import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSearchResults = createAsyncThunk(
  'data/fetchData',
  async ({ query, page }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const apiKey = import.meta.env.VITE_APP_API_KEY; 
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${query}&page=${page}`
      );
      if (response.data && Array.isArray(response.data.results)) {
        return response.data.results;
      } else {
        return rejectWithValue('No results found');
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


const initialState = {

  searchResults: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {    filterByMediaType: (state, action) => {
    const mediaType = action.payload; 
    state.searchResults = state.searchResults.filter(
      (item) => item.media_type === mediaType
    );
  },

  
  clearSearchResults: (state) => {
    state.searchResults = [];
  },
},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = Array.isArray(action.payload)
          ? [state.searchResults, ...action.payload]
          : [];
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default searchSlice.reducer;
