import React from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "@/lib/firebase";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate("/home");
    } catch (error) {
      alert("Login failed: " + (error as Error).message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign in to Tipverse</h2>
        <button
          onClick={handleGoogleLogin}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
