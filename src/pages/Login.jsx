
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { auth } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import loginFeature from "../Features/login";
import signInWithProvider from "../Features/signInWithProvider";

const Login = () => {
  const  navigate = useNavigate()

  return (
    <div className="mx-44 h-[100vh] flex flex-col py-52">
      <div className="h-full w-full flex flex-col items-center ">
        <form
          className="flex flex-col mb-6"
          onSubmit={(e)=>{
            loginFeature(e , navigate)
          }}
        >
          <label className="text-white text-xl uppercase">Email</label>
          <input
            name="email"
            type="text"
            placeholder="Enter Your Email"
            className="text-white text-[20px] bg-transparent border border-white w-[60rem] h-[60px] rounded-md p-4"          />
          <label className="text-white text-xl uppercase mt-6">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter Your Password"
            className="text-white text-[20px] bg-transparent border border-white w-[60rem] h-[60px] rounded-md p-4"
          />
          <div className="flex items-center w-[50vw] justify-between pb-9 mt-6">
            <button type="button" className="text-[#dd003f] text-2xl font-bold">
              Forget password?
            </button>
            <div className="uppercase ">
              <button
                type="submit"
                className="text-black border bg-[#dcf836] border-none w-[100px] h-14 font-bold text-2xl rounded-full"
              >
                Log In
              </button>
              <button
                type="button"
                className="text-white uppercase text-2xl ml-4"
              >
                Logout
              </button>
            </div>
          </div>
        </form>

        <div className="flex flex-col justify-center items-center">
          <h3 className="text-white uppercase text-xl mb-7">
            You Can Login with:
          </h3>
          <div className="flex justify-between gap-[4rem]">
            <button onClick={() => signInWithProvider("google" , navigate , auth)}><FaGoogle className="text-red-600 text-5xl" /></button>
            <button onClick={() => signInWithProvider("facebook" , navigate , auth)}><FaFacebook className="text-blue-600 text-5xl" /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
