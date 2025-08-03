import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "@/lib/firebase";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate("/home");
    } catch (error) {
      alert("Login failed: " + (error as Error).message);
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] transition-opacity duration-700 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <img
        src="/logo.png" // <-- Replace with your actual logo path
        alt="TipVerse Logo"
        className={`mb-10 w-56 h-auto transition-all duration-700 ${
          visible ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
        style={{
          filter:
            "drop-shadow(0 0 80px rgba(255,255,255,0.55)) drop-shadow(0 0 40px #3b82f6)",
        }}
      />
      <h2
        className={`text-4xl font-extrabold mb-10 text-center text-white tracking-tight transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        Welcome to TipVerse
      </h2>
      <button
        onClick={handleGoogleLogin}
        className={`w-full max-w-xs py-3 px-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition font-semibold shadow-lg text-lg transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
