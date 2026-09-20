import { useEffect, useRef, useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const googleButtonRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ==========================================
  // Google Login
  // ==========================================
  const handleGoogleLogin = async (response) => {
    try {
      setError("");
      setGoogleLoading(true);

      if (!response?.credential) {
        throw new Error("Google authentication failed.");
      }

      const result = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          credential: response.credential,
          mode: "login",
        }),
      });

      const data = await result.json();

      if (!result.ok) {
        throw new Error(data.message || "Google login failed.");
      }

      // Save authentication information
      localStorage.setItem("vigilToken", data.token);

      localStorage.setItem("vigilUser", JSON.stringify(data.user));

      // Go to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Google login error:", error);

      setError(error.message || "Google login failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  // ==========================================
  // Load Google Identity Services
  // ==========================================
  useEffect(() => {
    const initializeGoogle = () => {
      if (!window.google || !googleButtonRef.current) {
        return;
      }

      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

      if (!clientId) {
        console.error("VITE_GOOGLE_CLIENT_ID is missing.");
        return;
      }

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleLogin,
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

    document.head.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, []);

  // ==========================================
  // Handle Normal Login Input
  // ==========================================
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

  // ==========================================
  // Email + Password Login
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoginLoading(true);

    const { email, password } = formData;

    // Frontend validation
    if (!email || !password) {
      setError("Please enter your email and password.");
      setLoginLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password.");
      }

      // ==========================================
      // Save authentication information
      // ==========================================
      localStorage.setItem("vigilToken", data.token);

      localStorage.setItem("vigilUser", JSON.stringify(data.user));

      // ==========================================
      // Remember Me
      // ==========================================
      if (rememberMe) {
        localStorage.setItem("vigilRememberMe", "true");
      } else {
        localStorage.removeItem("vigilRememberMe");
      }

      // ==========================================
      // Redirect to Dashboard
      // ==========================================
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      setError(error.message || "Something went wrong while logging in.");
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 transition-colors sm:px-6 dark:bg-[#07110D] dark:text-white">
      {/* Back to Home */}
      <div className="mx-auto max-w-6xl">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
        >
          <ArrowLeft size={17} />
          Back to home
        </a>
      </div>

      {/* Main */}
      <main className="flex min-h-[calc(100vh-100px)] items-center justify-center py-10">
        <div className="w-full max-w-md">
          {/* Logo & Heading */}
          <div className="mb-8 text-center">
            <a
              href="/"
              className="mb-5 inline-flex items-center justify-center"
            >
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
                <Eye size={29} strokeWidth={2.1} />

                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-white" />
              </div>
            </a>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Sign in to your Vigil safety monitoring account.
            </p>
          </div>

          {/* Login Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 transition-colors dark:border-[#1C3027] dark:bg-[#0D1914] dark:shadow-black/20 sm:p-8">
            {/* Error Message */}
            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                    className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-[#294238] dark:bg-[#07110D] dark:text-white dark:placeholder:text-slate-500"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      alert("Password reset will be connected later.")
                    }
                    className="text-xs font-medium text-emerald-600 transition hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-12 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-[#294238] dark:bg-[#07110D] dark:text-white dark:placeholder:text-slate-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:text-slate-700 dark:hover:text-slate-200"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <label className="flex cursor-pointer items-center gap-3">
                <div className="relative h-4 w-4 shrink-0">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="peer absolute inset-0 z-10 h-4 w-4 cursor-pointer opacity-0"
                  />

                  <div className="flex h-4 w-4 items-center justify-center rounded border border-slate-300 bg-white transition peer-checked:border-emerald-600 peer-checked:bg-emerald-600 dark:border-[#345044] dark:bg-[#07110D]">
                    {rememberMe && (
                      <svg
                        className="h-3 w-3 text-white"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path d="M4 10l4 4 8-8" />
                      </svg>
                    )}
                  </div>
                </div>

                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Remember me
                </span>
              </label>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loginLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loginLoading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Google Login Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200 dark:bg-[#1C3027]" />

              <span className="text-xs font-semibold tracking-wider text-slate-400">
                OR
              </span>

              <div className="h-px flex-1 bg-slate-200 dark:bg-[#1C3027]" />
            </div>

            {/* Google Sign In */}
            <div className="flex min-h-[44px] justify-center">
              <div
                ref={googleButtonRef}
                className="flex min-h-[44px] justify-center overflow-hidden rounded-xl"
              />
            </div>

            {googleLoading && (
              <p className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">
                Signing in with Google...
              </p>
            )}

            {/* New to Vigil Divider */}
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200 dark:bg-[#1C3027]" />

              <span className="text-xs font-semibold tracking-wider text-slate-400">
                NEW TO VIGIL?
              </span>

              <div className="h-px flex-1 bg-slate-200 dark:bg-[#1C3027]" />
            </div>

            {/* Create Account */}
            <a
              href="/signup"
              className="flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white py-3 font-semibold text-slate-700 transition hover:border-emerald-500 hover:text-emerald-600 dark:border-[#294238] dark:bg-transparent dark:text-slate-200 dark:hover:border-emerald-500 dark:hover:text-emerald-400"
            >
              Create an account
            </a>
          </div>

          {/* Security Note */}
          <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-slate-500 dark:text-slate-500">
            <ShieldCheck size={15} className="text-emerald-600" />

            <span>Your safety monitoring data is protected.</span>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-slate-400 dark:text-slate-600">
            © {new Date().getFullYear()} Vigil · AI Safety Monitoring
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
