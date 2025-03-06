import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios' 

export const fetchCastData = createAsyncThunk("cast/fetchCastData", async (details, thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try{
        const apiKey = import.meta.env.VITE_APP_API_KEY;
        const response = await axios.get(`https://api.themoviedb.org/3/${details.kind}/${details.id}/credits?api_key=${apiKey}`)
        console.log("cast", response.data)
        return response.data.cast
    }catch(error){
       return rejectWithValue(error.message)
        
    }
})

const movieCastSlice = createSlice({
    name: "movieCast",
    initialState: {
      cast: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchCastData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchCastData.fulfilled, (state, action) => {
          state.loading = false;
          state.movieCast = action.payload.cast || action.payload;
        })
        .addCase(fetchCastData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export default movieCastSlice.reducer;