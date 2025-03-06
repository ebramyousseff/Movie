import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";
import tvReducer from './tvSlice'
import movieDetailsReducer from './movieDetailsSlice'
import searchDetailsReducer from "./searchDetailsSlice";
import movieCastReducer from './movieCastSlice'
import searchReducer from './searchDetailsSlice'
import allMovieReducer from './discoverMovieSlice'
import allTVReducer from './discoverTVSlice'
import tvCastReducer from './tvCastSlice'
import tvDetailsReducer from './tvDetails'

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    tv:tvReducer,
    details : movieDetailsReducer,
    tvDetails : tvDetailsReducer,
    data: searchDetailsReducer,
    movieCast: movieCastReducer,
    tvCast:tvCastReducer,
    search: searchReducer,
    allMovies:allMovieReducer,
    allTV : allTVReducer
  },
});
