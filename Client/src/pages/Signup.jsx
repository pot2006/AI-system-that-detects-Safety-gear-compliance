import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Building2,
  Lock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();

  const googleButtonRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);

  // =========================
  // Load Google Identity Services
  // =========================
  useEffect(() => {
    const initializeGoogle = () => {
      if (!window.google || !googleButtonRef.current) {
        return;
      }

      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

      if (!clientId) {
        console.error("VITE_GOOGLE_CLIENT_ID is missing");
        return;
      }

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleSignup,
        auto_select: false,
      });

      googleButtonRef.current.innerHTML = "";

      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: "outline",
        size: "large",
        width: 360,
        text: "continue_with",
        shape: "rectangular",
        logo_alignment: "left",
      });
    };

    if (window.google) {
      initializeGoogle();
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://accounts.google.com/gsi/client"]',
    );

    if (existingScript) {
      existingScript.addEventListener("load", initializeGoogle);

      return () => {
        existingScript.removeEventListener("load", initializeGoogle);
      };
    }

    const script = document.createElement("script");

    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = initializeGoogle;

    document.body.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, []);

  // =========================
  // Handle input changes
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  // =========================
  // Normal Signup
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const { name, email, organization, password, confirmPassword } = formData;

    // Organization is optional
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          organization,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to create account.");
      }

      // Save authentication data
      localStorage.setItem("vigilToken", data.token);

      localStorage.setItem("vigilUser", JSON.stringify(data.user));

      // Go to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);

      setError(
        error.message || "Something went wrong while creating your account.",
      );
    }
  };

  // =========================
  // Google Signup
  // =========================
  const handleGoogleSignup = async (response) => {
    try {
      setError("");
      setGoogleLoading(true);

      if (!response?.credential) {
        throw new Error("Google authentication failed.");
      }

      const serverResponse = await fetch(
        "http://localhost:5000/api/auth/google",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            credential: response.credential,
            mode: "signup",
          }),
        },
      );

      const data = await serverResponse.json();

      if (!serverResponse.ok) {
        throw new Error(data.message || "Google signup failed.");
      }

      // Save authentication data
      localStorage.setItem("vigilToken", data.token);

      localStorage.setItem("vigilUser", JSON.stringify(data.user));

      // Go to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Google signup error:", error);

      setError(error.message || "Unable to sign up with Google.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FAF8] dark:bg-[#07110D] flex items-center justify-center px-4 py-10 transition-colors duration-300">
      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-emerald-600 flex items-center justify-center shadow-sm">
              <ShieldCheck size={25} className="text-white" />
            </div>

            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Vigil
            </span>
          </Link>

          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Create your account
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Start monitoring your workplace safety with Vigil.
          </p>
        </div>

        {/* Signup Card */}
        <div className="bg-white dark:bg-[#0D1914] border border-[#DDE7E2] dark:border-[#1C3027] rounded-2xl shadow-sm p-6 sm:p-8">
          {/* Error */}
          {error && (
            <div className="mb-5 rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20 px-4 py-3 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          {/* Google Signup */}
          <div className="flex justify-center min-h-[40px]">
            <div ref={googleButtonRef}></div>
          </div>

          {googleLoading && (
            <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2">
              Creating your Vigil account...
            </p>
          )}

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[#DDE7E2] dark:bg-[#1C3027]" />

            <span className="text-xs text-slate-400 dark:text-slate-500">
              OR
            </span>

            <div className="flex-1 h-px bg-[#DDE7E2] dark:bg-[#1C3027]" />
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >
                Full Name
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full h-11 rounded-lg border border-[#DDE7E2] dark:border-[#1C3027] bg-white dark:bg-[#07110D] text-slate-900 dark:text-white placeholder:text-slate-400 pl-10 pr-4 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full h-11 rounded-lg border border-[#DDE7E2] dark:border-[#1C3027] bg-white dark:bg-[#07110D] text-slate-900 dark:text-white placeholder:text-slate-400 pl-10 pr-4 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition"
                />
              </div>
            </div>

            {/* Organization */}
            <div>
              <label
                htmlFor="organization"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >
                Organization{" "}
                <span className="text-slate-400 font-normal">(Optional)</span>
              </label>

              <div className="relative">
                <Building2
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="organization"
                  name="organization"
                  type="text"
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder="Company or factory name"
                  className="w-full h-11 rounded-lg border border-[#DDE7E2] dark:border-[#1C3027] bg-white dark:bg-[#07110D] text-slate-900 dark:text-white placeholder:text-slate-400 pl-10 pr-4 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full h-11 rounded-lg border border-[#DDE7E2] dark:border-[#1C3027] bg-white dark:bg-[#07110D] text-slate-900 dark:text-white placeholder:text-slate-400 pl-10 pr-11 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >
                Confirm Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full h-11 rounded-lg border border-[#DDE7E2] dark:border-[#1C3027] bg-white dark:bg-[#07110D] text-slate-900 dark:text-white placeholder:text-slate-400 pl-10 pr-11 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Create Account */}
            <button
              type="submit"
              className="w-full h-11 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center justify-center gap-2 transition shadow-sm"
            >
              Create Account
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Login */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-sm text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
