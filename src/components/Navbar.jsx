import Logo from "../images/logo1.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import { useEffect, useState } from "react";
import { auth } from "../firebase.config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${searchQuery}`);
      setIsMenuOpen(false); 
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); 
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      setUser(null);
    } catch (error) {
      toast.error("Error logging out. Please try again.");
    }
  };

  return (
    <nav>
    <div className="bg-[#0f2133] fixed top-0 w-full px-8 py-4 flex items-center gap-5 z-50">
      <div>
        <Link to="/">
          <img src={Logo} alt="logo" className="min-w-36 h-16 mr-3" />
        </Link>
      </div>

      <div className="flex items-center justify-between w-full">
        <div className="hidden xl:flex items-center justify-between w-full">
          <ul className="flex font-semibold gap-12 text-xl uppercase">
            <Link to={"/"}><li className="text-white cursor-pointer">Home</li></Link>
            <Link to="/movie"><li><a href="#" className="text-white cursor-pointer">Movies</a></li></Link>
            <Link to="/tv"><li><a href="#" className="text-white cursor-pointer">Celebrities</a></li></Link>
            
          </ul>
        </div>

        <div className="hidden xl:flex items-center justify-between gap-8">
          <form className="relative flex items-center" onSubmit={(e) => {
            e.preventDefault();
            if (searchQuery.trim() !== "") {
              navigate(`/search?query=${searchQuery}`);
              setIsMenuOpen(false);
            }
          }}>
            <input
              type="text"
              placeholder="Search..."
              className="border-2 border-white w-64 h-10 px-4 text-xl rounded-md bg-transparent text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">
              <FaSearch className="text-white cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-xl" />
            </button>
          </form>

          <div className="flex items-center justify-center gap-3">
            {user ? (
              <>
                <h3 onClick={handleSignOut} className="cursor-pointer text-white text-xl uppercase">Logout</h3>
                <button 
                  onClick={handleSignOut} 
                  className="text-white text-xl cursor-pointer border  bg-red-600 border-none rounded-3xl w-24 text-center flex justify-center items-center h-12">
                  SignOut
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <h3 className="uppercase cursor-pointer text-white text-xl">Login</h3>
                </Link>
                <Link to="/signup">
                  <h3 className="text-white text-xl cursor-pointer border bg-[#dd003f] border-none rounded-3xl w-24 text-center flex justify-center items-center h-12">
                    SignUp
                  </h3>
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="xl:hidden flex ml-auto">
          <IoIosMenu 
            className="text-white text-3xl cursor-pointer" 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
          />
        </div>
      </div>
    </div>

    {isMenuOpen && (
      <div className="xl:hidden absolute top-20 w-full bg-[#0f2133] text-white text-xl p-4 z-50">
        <ul className="flex flex-col gap-6 uppercase justify-center items-center">
          <li><Link to="/" className="cursor-pointer">Home</Link></li>
          <li><a href="#" className="cursor-pointer">Movies</a></li>
          <li><a href="#" className="cursor-pointer">Celebrities</a></li>
          <li><a href="#" className="cursor-pointer">News</a></li>
          <li><a href="#" className="cursor-pointer">Community</a></li>
        </ul>

        <form className="relative flex items-center justify-center mt-4" onSubmit={(e) => {
          e.preventDefault();
          if (searchQuery.trim() !== "") {
            navigate(`/search?query=${searchQuery}`);
            setIsMenuOpen(false);
          }
        }}>
          <input
            type="text"
            placeholder="Search..."
            className="border-2 border-white w-64 h-10 px-4 text-xl rounded-md bg-transparent text-white relative"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            <FaSearch className="text-white cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-xl" />
          </button>
        </form>

        <div className="flex justify-center items-center gap-3 mt-4">
          {user ? (
            <>
              <h3 onClick={handleSignOut} className="cursor-pointer text-white text-xl">Logout</h3>
              <button 
                onClick={handleSignOut} 
                className="text-white text-xl cursor-pointer border bg-red-600 border-none rounded-3xl w-24 text-center flex justify-center items-center h-12">
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <h3 className="uppercase cursor-pointer text-white text-xl">Log in</h3>
              </Link>
              <Link to="/signup">
                <h3 className="text-white text-xl cursor-pointer border bg-[#dd003f] border-none rounded-3xl w-24 text-center flex justify-center items-center h-12">
                  SignUp
                </h3>
              </Link>
            </>
          )}
        </div>
      </div>
    )}
  </nav>
  );
};

export default Navbar;
