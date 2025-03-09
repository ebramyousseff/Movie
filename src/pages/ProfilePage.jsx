import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { FaUserCircle } from "react-icons/fa";
import { signOut, updateProfile } from "firebase/auth";
import { app, auth } from "../firebase.config";
import { toast } from "react-toastify";
import { useState, useEffect, useRef } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const imageInput = useRef();
  const storage = getStorage(app);
  function ChangePhoto() {
    let file = imageInput.current.files[0];
    console.log(file.name);
    const storageRef = ref(storage, `/${file.name}`);
    const uploadFile = uploadBytesResumable(storageRef, file);
    uploadFile.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(prog);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadFile.snapshot.ref).then((url) => {
          updateProfile(user, { photoURL: url });
          setUser(url);
        });
      }
    );
  }

  useEffect(() => {
    auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        navigate("/signup");
      } else {
        let userData = JSON.parse(localStorage.getItem("user"));

        setUser(userData);
      }
    });
  }, [navigate]);

  console.log(user);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      ChangePhoto();
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      setUser(null);
      navigate("/");
    } catch (error) {
      toast.error("Error logging out. Please try again.");
    }
  };
  return (
    <div className="flex flex-col lg:flex-row xl:flex-row pt-72 xl:justify-between w-full px-24 xl:flex h-full">
      <div className="flex flex-col bg-[#060418] xl:w-80 lg:w-72 min-w-64 md:w-72 text-white border-4 border-[#0f2133] rounded-md lg:sticky top-20 h-[43rem] sm:justify-center sm:items-center ">
        <div className="text-center p-5 border-b border-[#abb7c43e]">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="h-28 w-28 rounded-full mx-auto mb-4 object-cover"
            />
          ) : (
            <FaUserCircle className="text-gray-400 text-7xl mx-auto mb-4" />
          )}

          <input
            ref={imageInput}
            type="file"
            accept="image/*"
            id="fileInput"
            className="hidden"
            onChange={handleImageChange}
          />
          <h2>{user?.email}</h2>
          <button
            className="text-white bg-red-500 px-5 py-3 rounded-full"
            onClick={() => document.getElementById("fileInput").click()}
          >
            Change Photo
          </button>
        </div>
        <div>
          <div className="flex flex-col p-5 gap-4 my-4">
            <h3 className=" text-gray-500 text-lg">Account Details</h3>
            <h3 className=" text-white hover:text-yellow-400 transition-all translate-300 cursor-pointer text-xl uppercase font-semibold">
              Profile
            </h3>
            <h3 className=" text-white hover:text-yellow-400 transition-all translate-300 cursor-pointer text-xl uppercase font-semibold">
              Favorite Movies
            </h3>
            <h3 className=" text-white hover:text-yellow-400 transition-all translate-300 cursor-pointer text-xl uppercase font-semibold">
              Rated Movies
            </h3>
          </div>
        </div>
        <div className="bg-gray-800 h-[1px] "></div>
        <div>
          <div className="flex flex-col p-5 gap-4 my-4">
            <h3 className=" text-gray-500 text-lg">Others</h3>
            <h3 className=" text-white hover:text-yellow-400 transition-all translate-300 cursor-pointer text-xl uppercase font-semibold">
              Change Password
            </h3>
            <h3
              className=" text-white hover:text-yellow-400 transition-all translate-300 cursor-pointer text-xl uppercase font-semibold"
              onClick={handleSignOut}
            >
              Log Out
            </h3>
          </div>
        </div>
      </div>
      <div className="lg:mx-44 flex flex-col xl:w-[49rem] sm:w-[35rem] md:w-[40rem] min-w-96">
        <h1 className="text-white font-bold text-4xl uppercase">Profile</h1>
        <div className="bg-[#091e33] border-4 mt-14 border-[#233a50] mb-24">
          <div className="p-5">
            <h3 className="text-white mb-5 text-lg uppercase">
              01.Profile Details
            </h3>
            <form className="flex flex-col mb-6">
              <label className="text-white text-xl uppercase ">USERName</label>

              <input
                name="name"
                type="text"
                placeholder="Enter Your First Name"
                className="bg-[#273b52] border-none my-4 text-[20px] border border-white h-[60px] rounded-md p-4 w-auto "
              />

              <label className="text-white text-xl uppercase mt-4">Email</label>
              <input
                name="email"
                type="email"
                placeholder={user?.email}
                className="bg-[#273b52] my-4 border-none text-[20px] border border-white  h-[60px] rounded-md p-4 w-auto"
              />
              <label className="text-white text-xl uppercase mt-4">
                FirstName
              </label>
              <input
                name="email"
                type="email"
                placeholder="Enter Your Email"
                className="bg-[#273b52] my-4 border-none text-[20px] border border-white  h-[60px] rounded-md p-4 w-auto"
              />
              <label className="text-white text-xl uppercase mt-4">
                LastName
              </label>
              <input
                name="email"
                type="email"
                placeholder="Enter Your Email"
                className="bg-[#273b52] my-4 border-none text-[20px] border border-white h-[60px] rounded-md p-4 w-auto"
              />
            </form>
          </div>
          <div className="mx-5 h-[2px] w-auto bg-[#abb7c43e] ">
            <span className=""></span>
          </div>
          <div className="bg-[#0f2133] border-4 p-5 border-[#0f2133]">
            <h3 className="text-white mb-4">02.Change Password</h3>
            <form className="flex flex-col mb-6">
              <label className="text-white text-xl uppercase ">
                Old Password
              </label>

              <input
                name="name"
                type="text"
                placeholder="Enter Your First Name"
                className="bg-[#273b52] my-4 border-none text-[20px] border border-white h-[60px] rounded-md p-4 w-auto"
              />

              <label className="text-white text-xl uppercase mt-4">
                New Password
              </label>
              <input
                name="email"
                type="email"
                placeholder="Enter Your Email"
                className="bg-[#273b52] my-4 border-none text-[20px] border border-white  h-[60px] rounded-md p-4 w-auto"
              />
              <label className="text-white text-xl uppercase mt-4">
                Confirm New Password
              </label>
              <input
                name="email"
                type="email"
                placeholder="Enter Your Email"
                className="bg-[#273b52] MY-4 border-none text-[20px] border border-white  h-[60px] rounded-md p-4 w-auto"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
