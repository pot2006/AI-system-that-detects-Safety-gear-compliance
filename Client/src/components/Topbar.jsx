import { Bell, ChevronDown, Search, Settings, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";

const Topbar = ({ darkMode, setDarkMode }) => {
  return (
    <header className="fixed left-[68px] right-0 top-0 z-40 h-[82px] border-b border-slate-200 bg-white/90 backdrop-blur-xl dark:border-[#1C3027] dark:bg-[#07110D]/90">
      <div className="flex h-full items-center justify-between gap-4 px-5 sm:px-8">
        {/* SEARCH */}

        <div className="relative w-full max-w-xl">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search cameras, alerts..."
            className="
              h-11 w-full rounded-xl
              border border-slate-200
              bg-slate-50
              pl-11 pr-4
              text-sm text-slate-900
              outline-none
              transition
              placeholder:text-slate-400
              focus:border-emerald-500
              focus:ring-2 focus:ring-emerald-500/10
              dark:border-[#1C3027]
              dark:bg-[#0D1914]
              dark:text-white
              dark:placeholder:text-slate-500
            "
          />
        </div>

        {/* RIGHT SIDE */}

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* THEME */}

          <button
            type="button"
            onClick={() => setDarkMode((prev) => !prev)}
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-xl
              border border-slate-200
              bg-white
              text-slate-500
              transition
              hover:border-emerald-500
              hover:bg-emerald-50
              hover:text-emerald-600
              dark:border-[#294238]
              dark:bg-[#0D1914]
              dark:text-slate-400
              dark:hover:bg-emerald-500/10
              dark:hover:text-emerald-400
            "
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <Moon size={19} strokeWidth={2.2} />
            ) : (
              <Sun size={19} strokeWidth={2.2} />
            )}
          </button>

          {/* ALERTS */}

          <Link
            to="/alerts"
            className="
              relative flex h-10 w-10
              items-center justify-center
              rounded-xl
              border border-slate-200
              bg-white
              text-slate-500
              transition
              hover:border-emerald-500
              hover:text-emerald-600
              dark:border-[#294238]
              dark:bg-[#0D1914]
              dark:text-slate-400
              dark:hover:text-emerald-400
            "
            title="Alerts"
          >
            <Bell size={19} />

            {/* Notification dot */}

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-red-500 dark:border-[#0D1914]" />
          </Link>

          {/* SETTINGS */}

          <Link
            to="/settings"
            className="
              hidden h-10 w-10
              items-center justify-center
              rounded-xl
              border border-slate-200
              bg-white
              text-slate-500
              transition
              hover:border-emerald-500
              hover:text-emerald-600
              sm:flex
              dark:border-[#294238]
              dark:bg-[#0D1914]
              dark:text-slate-400
              dark:hover:text-emerald-400
            "
            title="Settings"
          >
            <Settings size={19} />
          </Link>

          {/* PROFILE */}

          <button
            type="button"
            className="
              flex items-center gap-2
              rounded-xl
              px-1.5 py-1.5
              transition
              hover:bg-slate-100
              dark:hover:bg-white/5
            "
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
              HP
            </div>

            <div className="hidden text-left lg:block">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                Admin
              </p>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Safety Manager
              </p>
            </div>

            <ChevronDown size={16} className="hidden text-slate-400 lg:block" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
