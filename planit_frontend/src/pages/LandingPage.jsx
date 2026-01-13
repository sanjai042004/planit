import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { Navbar } from "../components/landing/Navbar";
import { Hero } from "../components/landing/Hero";
import { Features } from "../components/landing/Features";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const token = await user.getIdToken();

      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        })
      );

      localStorage.setItem("token", token);
      navigate("/home");
    } catch (error) {
      console.error("Google login failed:", error.message);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar onLogin={handleGoogleLogin} />
      <Hero onLogin={handleGoogleLogin} />
      <Features />
    </div>
  );
};
