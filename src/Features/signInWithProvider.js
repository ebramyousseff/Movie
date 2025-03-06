import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../firebase.config";

export default async function signInWithProvider(providerType ,navigate ){

    let provider;

    if (providerType === "facebook") {
      provider = new FacebookAuthProvider();
    } else if (providerType === "google") {
      provider = new GoogleAuthProvider();
    } else {
      console.error("Unsupported provider");
      return;
    }

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      toast.success(`Logged in with ${providerType.toUpperCase()}!`);
      navigate("/");

      let credential, accessToken;
      if (providerType === "facebook") {
        credential = FacebookAuthProvider.credentialFromResult(result);
        accessToken = credential?.accessToken;
      } else if (providerType === "google") {
        credential = GoogleAuthProvider.credentialFromResult(result);
        accessToken = credential?.accessToken;
      }
    } catch (error) {
        console.error(error)
      console.error("Error logging in with provider:", error);
      toast.error("Login failed. Please try again.");
    }
  };