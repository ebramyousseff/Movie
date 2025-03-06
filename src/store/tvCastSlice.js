import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchCastData = createAsyncThunk("cast/fetchCastData", async (CastID, thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try{
        const apiKey = import.meta.env.VITE_APP_API_KEY;
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${CastID}/credits?api_key=${apiKey}`)
        return response.data
    }catch(error){
        rejectWithValue(error.message)
    }
})

const tvCastSlice = createSlice({
    name: "tvCast",
    initialState: {
      tvCast: [],
      loading: false,
      error: null,
    },
    reducers: {
        setCastData : (state, action)=>{
            state.tvCast = action.payload
        } 
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchCastData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchCastData.fulfilled, (state, action) => {
          state.loading = false;
          state.tvCast = action.payload;
        })
        .addCase(fetchCastData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  export const {setCastData} = tvCastSlice.actions;
  export default tvCastSlice.reducer;