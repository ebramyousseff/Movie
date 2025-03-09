import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../firebase.config";

export default async function loginFeature (e , navigate ) {
    e.preventDefault();
    const data = new FormData(e.target)
    console.log(auth)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.get("email") ,data.get("password") );
      console.log("User logged in:", userCredential.user);
      localStorage.setItem("user" , JSON.stringify({
        email: userCredential.user.email ,
        displayName: userCredential.user.displayName ,
      }))
      toast.success("Login successful!"); 
      navigate("/profile"); 
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password. Please try again."); 
      } else if (error.code === "auth/user-not-found") {
        toast.error("No account found with this email."); 
      } else {
        toast.error("Something went wrong. Please try again."); 
      }
      console.error("Error logging in:", error.message);
    }
  };