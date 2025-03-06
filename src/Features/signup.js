import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";
import { toast } from "react-toastify";



export default async function signUp(e ,navigate) {
e.preventDefault()
const data = new FormData(e.target)

try {
  const userCredential = await createUserWithEmailAndPassword(auth, data.get("email") ,data.get("password"));
  toast.success("You are signed in!");
  navigate("/");
} catch (error) {
  if (error.code === "auth/email-already-in-use") {
    toast.error("This email is already in use!");
  } else {
    toast.error("Something went wrong. Please try again.");
  }
  console.error("Error signing up:", error.message);
}
};
