"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authApi } from "@/app/utils/api";
import { signIn, useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast"; // Import toast



type category = "freelancer" | "recruiter";

const LoginSignupPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginEmail, setLoginEmail] = useState(""); 
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [category, setcategory] = useState<category>("freelancer");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const router = useRouter();

  const validateLogin = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!loginEmail.match(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)) {
      newErrors.loginEmail = "Enter a valid email";
    }
    if (loginPassword.length < 6) {
      newErrors.loginPassword = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const validateSignup = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (signupName.trim() === "") {
      newErrors.signupName = "Full name is required";
    }
    if (!signupEmail.match(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)) {
      newErrors.signupEmail = "Enter a valid email";
    }
    if (signupPassword.length < 6) {
      newErrors.signupPassword = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleLoginSubmit = async (e: React.FormEvent) => { 
    e.preventDefault();
    setGlobalError("");
    
    if (!validateLogin()) return;
  
    setLoading(true);
  
    try {
      // Use NextAuth's signIn instead of direct API call
      const result = await signIn('credentials', {
        email: loginEmail,
        password: loginPassword,
        redirect: false,
      });
  
      if (result?.error) {
        setGlobalError(result.error || 'Login failed');
        return;
      }
      toast.success("Login successful! Redirecting...")
  
      // If successful, redirect to profile
      router.push("/user-profile");
      router.refresh(); // Ensure the session is updated
    } catch (err) {
      console.error("Login Error:", err);
      toast.error("Login failed. Please try again.");
      setGlobalError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  
  
  
  
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError(""); // Reset global error
    if (!validateSignup()) return;
  
    setLoading(true);
    try {
      const { data, error } = await authApi.register({
        name: signupName,
        email: signupEmail,
        password: signupPassword,
        category,
        
      });
      if (error) {
        toast.error(error.message || "Registration failed");
        setGlobalError(error.message || "An error occurred");
        return;
      }
  
      if (data?.message) {
        toast.success("Registration successful!");
        router.push("/user-profile");
      }
    } catch (err) {
      console.error("Signup Error:", err); // Log error for debugging
      toast.error("Registration failed. Please try again.");
      setGlobalError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  

  const resetForm = () => {
    setLoginEmail("");
    setLoginPassword("");
    setSignupName("");
    setSignupEmail("");
    setSignupPassword("");
    setErrors({});
    setGlobalError("");
  };

  const toggleAuthMode = () => {
    resetForm();
    setIsLogin(!isLogin);
  };

  return (
    <div className="h-screen w-screen relative flex items-center justify-center overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/video/night-sky.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

      <div className="relative w-full max-w-md p-6 rounded-lg shadow-xl border-2 border-white text-white bg-black bg-opacity-40 backdrop-blur-sm">
        <div className="relative mt-6 w-full min-h-[400px]">
          {/* Login Form */}
          <form
            onSubmit={handleLoginSubmit}
            className={`transition-all duration-300 ${isLogin ? "block" : "hidden"}`}
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>

            {globalError && (
              <div className="mb-4 p-2 bg-red-500/20 border border-red-500 rounded-md text-center">
                {globalError}
              </div>
            )}

            <div className="mb-4">
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-3 border-2 border-white/50 text-white bg-black/30 rounded-md focus:border-white focus:outline-none transition"
              />
              {errors.loginEmail && (
                <p className="mt-1 text-red-400 text-sm">{errors.loginEmail}</p>
              )}
            </div>

            <div className="mb-6">
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-3 border-2 border-white/50 text-white bg-black/30 rounded-md focus:border-white focus:outline-none transition"
              />
              {errors.loginPassword && (
                <p className="mt-1 text-red-400 text-sm">{errors.loginPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-3 rounded-md font-medium hover:bg-white/90 transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block h-4 w-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => alert("Password reset functionality")}
                className="text-blue-300 hover:underline text-sm"
              >
                Forgot Password?
              </button>
            </div>
          </form>

          {/* Signup Form */}
          <form
            onSubmit={handleSignupSubmit}
            className={`transition-all duration-300 ${!isLogin ? "block" : "hidden"}`}
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

            {globalError && (
              <div className="mb-4 p-2 bg-red-500/20 border border-red-500 rounded-md text-center">
                {globalError}
              </div>
            )}

            <div className="mb-4">
              <input
                type="text"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                placeholder="Full Name"
                className="w-full p-3 border-2 border-white/50 text-white bg-black/30 rounded-md focus:border-white focus:outline-none transition"
              />
              {errors.signupName && (
                <p className="mt-1 text-red-400 text-sm">{errors.signupName}</p>
              )}
            </div>

            <div className="mb-4">
              <input
                type="email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-3 border-2 border-white/50 text-white bg-black/30 rounded-md focus:border-white focus:outline-none transition"
              />
              {errors.signupEmail && (
                <p className="mt-1 text-red-400 text-sm">{errors.signupEmail}</p>
              )}
            </div>

            <div className="mb-6">
              <input
                type="password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-3 border-2 border-white/50 text-white bg-black/30 rounded-md focus:border-white focus:outline-none transition"
              />
              {errors.signupPassword && (
                <p className="mt-1 text-red-400 text-sm">{errors.signupPassword}</p>
              )}
            </div>

            <div className="mb-6 flex justify-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value="freelancer"
                  checked={category === "freelancer"}
                  onChange={() => setcategory("freelancer")}
                  className="h-4 w-4 text-white focus:ring-white"
                />
                <span>Freelancer</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value="recruiter"
                  checked={category === "recruiter"}
                  onChange={() => setcategory("recruiter")}
                  className="h-4 w-4 text-white focus:ring-white"
                />
                <span>Recruiter</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-3 rounded-md font-medium hover:bg-white/90 transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block h-4 w-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                  Signing up...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
        </div>

        {/* Toggle Link */}
        <div className="mt-6 text-center">
          <p className="text-white/80">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={toggleAuthMode}
              className="ml-2 text-white font-medium hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupPage;
