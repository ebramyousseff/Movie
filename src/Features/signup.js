import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase.config";
import { toast } from "react-toastify";
import { useLocalStorage } from "../components/LocalStorage";



export default async function signUp(e ,navigate) {
e.preventDefault()
const data = new FormData(e.target)

try {
  const userCredential = await createUserWithEmailAndPassword(auth, data.get("email") ,data.get("password"));
  await updateProfile(auth.currentUser , {displayName : `${data.get("firstName")} ${data.get("lastName")}` })
  localStorage.setItem("user", JSON.stringify({
    email: userCredential.user.email,
    displayName: userCredential.user.displayName,
  }))
  toast.success("You are signed in!");
  navigate("/profile");
} catch (error) {
  if (error.code === "auth/email-already-in-use") {
    toast.error("This email is already in use!");
  } else {
    toast.error("Something went wrong. Please try again.");
  }
  console.error("Error signing up:", error.message);
}
};
