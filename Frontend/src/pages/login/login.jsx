import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import api from "../../api/axios";
import logo from "../../assets/logo.jpg";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);  
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      
      if(username === "admin" && password === "admin"){
        localStorage.setItem("registered", "true");  
        navigate("/AdminDashboard");       
      }
      else{
        alert("Invalid credentials");
        return;
      }

      // const res = await api.post("/auth/login", { username, password });
      // localStorage.setItem("token", res.data.token);

      //localStorage.removeItem("registered");
      
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div
      className={`flex items-center justify-center h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gradient-to-b from-indigo-900 to-purple-900 shadow-2xl"
      }`}
    >
      {/* Dark/Light Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium 
                   border shadow-md transition 
                   bg-white hover:bg-gray-100 dark:bg-gray-800 dark:text-white"
      >
        {darkMode ? "🌞" : "🌙"}
      </button>

      {/* Login Card */}
      <div
        className={`relative z-10 w-full max-w-md rounded-xl shadow-2xl p-8 transition-colors duration-300 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={logo}
            alt="Logo"
            className="w-20 h-20 object-cover mb-4 rounded-full shadow-md"
          />
          <h2 className="text-xl font-bold uppercase tracking-wide">
            abc school
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Username */}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="USERNAME"
            className="w-full border-b-2 border-gray-300 dark:border-gray-600 
                       focus:border-red-500 focus:outline-none py-3 px-2 
                       bg-transparent placeholder-gray-400 dark:placeholder-gray-500"
            required
          />

          {/* Password */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="PASSWORD"
            className="w-full border-b-2 border-gray-300 dark:border-gray-600 
                       focus:border-red-500 focus:outline-none py-3 px-2 
                       bg-transparent placeholder-gray-400 dark:placeholder-gray-500"
            required
          />

          {/* Remember Me */}
          <div className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-gray-600 dark:text-gray-300">
              Remember me
            </span>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold
                       hover:bg-red-700 transition"
          >
            SIGN IN
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <span className="flex-1 border-t border-gray-300 dark:border-gray-600"></span>
            <span className="text-xs text-gray-500 dark:text-gray-400">or</span>
            <span className="flex-1 border-t border-gray-300 dark:border-gray-600"></span>
          </div>

          <p className="text-sm text-center text-gray-600 mt-4">
            {" "}
            Don’t have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
            >
              {" "}
              Register{" "}
            </span>{" "}
          </p>
        </form>

        {/* Forgot Password */}
        <div className="mt-5 text-center">
          <span
            className="text-sm text-red-600 cursor-pointer hover:underline"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </span>
        </div>
      </div>
    </div>
  );
}
