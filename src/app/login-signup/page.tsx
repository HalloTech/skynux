import React from "react";

const LoginSignup: React.FC = () => {
  return (
    <div className="h-screen w-screen relative flex items-center justify-center overflow-hidden mt-20">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/night-sky.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

      {/* Form Container */}
      <div className="relative w-full max-w-md p-6 rounded-lg shadow-xl border-2 border-white text-white bg-black bg-opacity-40">
        <div className="relative mt-6 w-full h-96 overflow-hidden">
          {/* Alpine.js should be handled separately in pure React */}
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-2 border-2 border-white text-white bg-transparent rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-2 border-2 border-white text-white bg-transparent rounded-md"
          />
          <div className="flex justify-between items-center mb-2">
            <button className="border-2 border-white text-white py-2 px-4 rounded-md hover:bg-white hover:text-black transition">
              Login
            </button>
            <a href="#" className="text-blue-300 hover:underline">
              Forgot Password?
            </a>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <button className="px-4 py-2 font-semibold transition-all duration-300 rounded-md border-2 border-white text-white bg-transparent">
            Login
          </button>
          <button className="px-4 py-2 font-semibold transition-all duration-300 rounded-md border-2 border-white text-white bg-transparent">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
