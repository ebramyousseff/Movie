import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchAllTV = createAsyncThunk(
    "tv/fetchAllTV",
    async (currentPage = 1, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const apiKey = import.meta.env.VITE_APP_API_KEY;
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&page=${currentPage}`
        );
        console.log("response", response.data)
        return response.data;
      } catch (error) {
        console.log(error)

        return rejectWithValue(error.message);
      }
    }
  );




const initialState = {
    allTV: [],
    loading:false,
    error:null
};

const allTVSlice = createSlice({
    name: "allTV",
    initialState,
    reducers:{
        addAllTv:(state, action)=>{
            state.allTV = action.payload
        }
    }, extraReducers:(builder)=>{
        builder
        .addCase(fetchAllTV.pending,(state)=>{
            state.loading = true;
            state.error = null
        }).addCase(fetchAllTV.fulfilled, (state, action)=>{
          state.loading = false;  
            state.allTV = action.payload;
        }).addCase(fetchAllTV.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export const {addAllTv} = allTVSlice.actions
export default allTVSlice.reducer