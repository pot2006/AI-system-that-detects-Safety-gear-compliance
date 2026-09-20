import { useEffect, useState } from "react";
import { Sun, Moon, Menu, X, ArrowRight, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [mobileMenu, setMobileMenu] = useState(false);

  // =========================
  // Authentication State
  // =========================
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return Boolean(localStorage.getItem("vigilToken"));
  });

  // Apply theme
  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  // =========================
  // Check Authentication
  // =========================
  useEffect(() => {
    const checkAuthentication = () => {
      setIsLoggedIn(Boolean(localStorage.getItem("vigilToken")));
    };

    // Check when the page becomes visible again
    window.addEventListener("focus", checkAuthentication);

    // Check localStorage changes from another tab
    window.addEventListener("storage", checkAuthentication);

    // Check login/logout changes in the same tab
    window.addEventListener("authChanged", checkAuthentication);

    return () => {
      window.removeEventListener("focus", checkAuthentication);
      window.removeEventListener("storage", checkAuthentication);
      window.removeEventListener("authChanged", checkAuthentication);
    };
  }, []);

  // Navigation
  const scrollToSection = (id) => {
    setMobileMenu(false);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <header
      className="
        fixed inset-x-0 top-0 z-50
        border-b border-slate-200/80
        bg-white/85 backdrop-blur-xl
        transition-colors duration-300
        dark:border-white/10
        dark:bg-[#07110D]/85
      "
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        {/* ================= LOGO ================= */}

        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="group flex items-center gap-3"
        >
          {/* Vigil Logo */}
          <div
            className="
              relative flex h-10 w-10 items-center justify-center
              rounded-xl
              bg-emerald-600
              text-white
              shadow-sm
              transition-all duration-300
              group-hover:scale-105
              group-hover:bg-emerald-700
              group-hover:shadow-md
              dark:bg-emerald-500
              dark:text-[#07110D]
              dark:group-hover:bg-emerald-400
            "
          >
            <Eye size={23} strokeWidth={2.2} />

            {/* Camera status dot */}
            <span
              className="
                absolute right-1.5 top-1.5
                h-1.5 w-1.5
                rounded-full
                bg-white
                dark:bg-[#07110D]
              "
            />
          </div>

          {/* Brand */}
          <div className="text-left">
            <span
              className="
                block text-xl font-bold tracking-tight
                text-slate-900
                dark:text-white
              "
            >
              Vigil
            </span>

            <span
              className="
                hidden text-[10px] font-medium
                uppercase tracking-[0.16em]
                text-slate-500
                sm:block
                dark:text-slate-400
              "
            >
              AI Safety
            </span>
          </div>
        </button>

        {/* ================= DESKTOP NAV ================= */}

        <div className="hidden items-center gap-8 md:flex">
          <button
            onClick={() => scrollToSection("features")}
            className="
              text-sm font-medium
              text-slate-600
              transition-colors
              hover:text-emerald-600
              dark:text-slate-300
              dark:hover:text-emerald-400
            "
          >
            Features
          </button>

          <button
            onClick={() => scrollToSection("how-it-works")}
            className="
              text-sm font-medium
              text-slate-600
              transition-colors
              hover:text-emerald-600
              dark:text-slate-300
              dark:hover:text-emerald-400
            "
          >
            How It Works
          </button>

          <button
            onClick={() => scrollToSection("use-cases")}
            className="
              text-sm font-medium
              text-slate-600
              transition-colors
              hover:text-emerald-600
              dark:text-slate-300
              dark:hover:text-emerald-400
            "
          >
            Use Cases
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="
              text-sm font-medium
              text-slate-600
              transition-colors
              hover:text-emerald-600
              dark:text-slate-300
              dark:hover:text-emerald-400
            "
          >
            Contact
          </button>
        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="hidden items-center gap-3 md:flex">
          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode((previous) => !previous)}
            aria-label="Toggle dark mode"
            className="
              flex h-10 w-10 items-center justify-center
              rounded-xl
              border border-slate-200
              bg-white
              text-slate-600
              transition-all duration-200

              hover:border-emerald-300
              hover:bg-emerald-50
              hover:text-emerald-600

              dark:border-white/10
              dark:bg-white/5
              dark:text-slate-300

              dark:hover:border-emerald-700
              dark:hover:bg-emerald-950
              dark:hover:text-emerald-400
            "
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* =========================
              LOGGED IN
          ========================= */}
          {isLoggedIn ? (
            <Link
              to="/dashboard"
              className="
                group inline-flex items-center gap-2
                rounded-xl
                bg-emerald-600
                px-5 py-2.5
                text-sm font-semibold
                text-white
                transition
                hover:bg-emerald-700
              "
            >
              Dashboard
              <ArrowRight
                size={16}
                className="
                  transition-transform
                  group-hover:translate-x-1
                "
              />
            </Link>
          ) : (
            <>
              {/* Login */}
              <Link
                to="/login"
                className="
                  rounded-xl
                  border border-slate-300
                  px-5 py-2.5
                  text-sm font-semibold
                  text-slate-700
                  transition
                  hover:border-emerald-500
                  hover:text-emerald-600
                  dark:border-[#263C31]
                  dark:text-slate-300
                  dark:hover:border-emerald-500
                  dark:hover:text-emerald-400
                "
              >
                Login
              </Link>

              {/* Get Started */}
              <Link
                to="/signup"
                className="
                  group inline-flex items-center gap-2
                  rounded-xl
                  bg-emerald-600
                  px-5 py-2.5
                  text-sm font-semibold
                  text-white
                  transition
                  hover:bg-emerald-700
                "
              >
                Get Started
                <ArrowRight
                  size={16}
                  className="
                    transition-transform
                    group-hover:translate-x-1
                  "
                />
              </Link>
            </>
          )}
        </div>

        {/* ================= MOBILE BUTTONS ================= */}

        <div className="flex items-center gap-2 md:hidden">
          {/* Mobile Theme */}
          <button
            onClick={() => setDarkMode((previous) => !previous)}
            aria-label="Toggle dark mode"
            className="
              flex h-10 w-10 items-center justify-center
              rounded-xl
              border border-slate-200
              bg-white
              text-slate-600

              dark:border-white/10
              dark:bg-white/5
              dark:text-slate-300
            "
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile Menu */}
          <button
            onClick={() => setMobileMenu((previous) => !previous)}
            aria-label="Open menu"
            className="
              flex h-10 w-10 items-center justify-center
              rounded-xl
              border border-slate-200
              bg-white
              text-slate-700

              dark:border-white/10
              dark:bg-white/5
              dark:text-slate-200
            "
          >
            {mobileMenu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}

      {mobileMenu && (
        <div
          className="
            border-t border-slate-200
            bg-white
            px-5 py-5
            md:hidden

            dark:border-white/10
            dark:bg-[#07110D]
          "
        >
          <div className="flex flex-col gap-2">
            {/* Features */}
            <button
              onClick={() => scrollToSection("features")}
              className="
                rounded-xl px-4 py-3 text-left text-sm font-medium
                text-slate-700
                hover:bg-emerald-50
                hover:text-emerald-600

                dark:text-slate-300
                dark:hover:bg-emerald-950
                dark:hover:text-emerald-400
              "
            >
              Features
            </button>

            {/* How It Works */}
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="
                rounded-xl px-4 py-3 text-left text-sm font-medium
                text-slate-700
                hover:bg-emerald-50
                hover:text-emerald-600

                dark:text-slate-300
                dark:hover:bg-emerald-950
                dark:hover:text-emerald-400
              "
            >
              How It Works
            </button>

            {/* Use Cases */}
            <button
              onClick={() => scrollToSection("use-cases")}
              className="
                rounded-xl px-4 py-3 text-left text-sm font-medium
                text-slate-700
                hover:bg-emerald-50
                hover:text-emerald-600

                dark:text-slate-300
                dark:hover:bg-emerald-950
                dark:hover:text-emerald-400
              "
            >
              Use Cases
            </button>

            {/* Contact */}
            <button
              onClick={() => scrollToSection("contact")}
              className="
                rounded-xl px-4 py-3 text-left text-sm font-medium
                text-slate-700
                hover:bg-emerald-50
                hover:text-emerald-600

                dark:text-slate-300
                dark:hover:bg-emerald-950
                dark:hover:text-emerald-400
              "
            >
              Contact
            </button>

            <div className="my-2 border-t border-slate-200 dark:border-white/10" />

            {/* =========================
                MOBILE AUTH BUTTON
            ========================= */}

            {isLoggedIn ? (
              <Link
                to="/dashboard"
                onClick={() => setMobileMenu(false)}
                className="
                  flex items-center justify-center gap-2
                  rounded-xl
                  bg-emerald-600
                  px-4 py-3
                  text-sm font-semibold
                  text-white
                  hover:bg-emerald-700
                "
              >
                Dashboard
                <ArrowRight size={16} />
              </Link>
            ) : (
              <>
                {/* Mobile Login */}
                <Link
                  to="/login"
                  onClick={() => setMobileMenu(false)}
                  className="
                    rounded-xl
                    border border-slate-300
                    px-4 py-3
                    text-center
                    text-sm font-semibold
                    text-slate-700

                    dark:border-white/15
                    dark:text-slate-200
                  "
                >
                  Login
                </Link>

                {/* Mobile Get Started */}
                <Link
                  to="/signup"
                  onClick={() => setMobileMenu(false)}
                  className="
                    rounded-xl
                    bg-emerald-600
                    px-4 py-3
                    text-center
                    text-sm font-semibold
                    text-white
                    hover:bg-emerald-700
                  "
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
