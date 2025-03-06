import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import signUp from "../Features/signup";

const SignupPage = () => {
  const navigate = useNavigate();   

  return (
    <div className="mx-44 h-[100vh] flex flex-col py-52">
      <div className="h-full w-full flex flex-col items-center">
        <form className="flex flex-col mb-6" onSubmit={(e)=>{
          signUp(e , navigate)
        }}>
          <label className="text-white text-xl uppercase">Name</label>
          <div className="flex gap-7">
            <input
            name="name"
              type="text"
              placeholder="Enter Your First Name"
              className="text-white text-[20px] bg-transparent border border-white w-[29rem] h-[60px] rounded-md p-4"
            />
            <input
            name="name"
              type="text"
              placeholder="Enter Your Last Name"
              className="text-white text-[20px] bg-transparent border border-white w-[29rem] h-[60px] rounded-md p-4"
            />
          </div>
          <label className="text-white text-xl uppercase mt-4">Email</label>
          <input
          name="email"  
            type="email"
            placeholder="Enter Your Email"
            className="text-white text-[20px] bg-transparent border border-white w-[60rem] h-[60px] rounded-md p-4"
          />
          <label className="text-white text-xl uppercase mt-4">Password</label>
          <input
          name="password"
            type="password"
            placeholder="Enter Your Password"
            className="text-white text-[20px] bg-transparent border border-white w-[60rem] h-[60px] rounded-md p-4"
            
          />
          <div className="flex items-center w-3/5 justify-between pb-9 mt-6">
            <Link to="/login">
              <button className="text-[#dd003f] text-2xl font-bold hover:underline">
                Already have an account?
              </button>
            </Link>
            <button
              type="submit"
              className="text-black border bg-[#dcf836] border-none w-[100px] h-14 font-bold text-2xl rounded-full uppercase"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
