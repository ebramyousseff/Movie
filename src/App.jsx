import Navbar from "./components/Navbar"
import './App.css'
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import MovieDetails from "./pages/movieDetails/movieDetails"
import SearchResults from "./pages/SearchResults"
import AllMovies from "./pages/AllMovies"
import SignupPage from "./pages/SignupPage"
import { ToastContainer } from "react-toastify";
import AllTV from "./pages/AllTV"
import TVCategory from "./components/TVCategory"
import TVDetails from "./pages/tvDetails/TVDetails"
import ProfilePage from "./pages/ProfilePage"
import { useState } from "react"

function App() {
  const [profileImage, setProfileImage] = useState(null);

  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
    <Navbar className="bg-[#2d2d9d]"/>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path='/movie/:movieID' element={<MovieDetails />} />
        <Route path='/tv/:tvID' element={<TVDetails />} />
        <Route path='/search' element={<SearchResults />} />
        <Route path="/movie" element={<AllMovies/>}/>
        <Route path="/tv" element={<AllTV/>}/>
        <Route path="/profile" element={<ProfilePage profileImage={profileImage} setProfileImage={setProfileImage} />} />
        
        
      </Routes>
    </>
  )
}

export default App
