import { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login submitted:", {
      ...formData,
      rememberMe,
    });

    alert("Login will be connected to the backend soon.");
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
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 active:scale-[0.99]"
              >
                Sign in
                <ArrowRight size={18} />
              </button>
            </form>

            {/* Divider */}
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
