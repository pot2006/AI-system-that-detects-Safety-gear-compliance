import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Video,
  Bell,
  BarChart3,
  Box,
  Settings,
  LogOut,
  Eye,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Live Monitoring",
    path: "/live-monitoring",
    icon: Video,
  },
  {
    name: "Alerts",
    path: "/alerts",
    icon: Bell,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    name: "3D View",
    path: "/3d-view",
    icon: Box,
  },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // =========================
  // Logout
  // =========================
  const handleLogout = () => {
    // Remove authentication data
    localStorage.removeItem("vigilToken");
    localStorage.removeItem("vigilUser");
    localStorage.removeItem("vigilRememberMe");

    // Notify other components that authentication changed
    window.dispatchEvent(new Event("authChanged"));

    // Redirect to login page
    navigate("/login");
  };

  return (
    <aside
      className="
        group fixed left-0 top-0 z-50 h-screen
        w-[76px] hover:w-[260px]
        overflow-hidden
        border-r border-slate-200
        bg-white
        transition-[width] duration-300 ease-in-out
        dark:border-[#1C3027]
        dark:bg-[#0D1914]
      "
    >
      {/* =========================
          LOGO
      ========================= */}
      <div className="flex h-20 items-center border-b border-slate-200 px-4 dark:border-[#1C3027]">
        <Link to="/" className="flex min-w-[225px] items-center gap-3">
          {/* Logo Icon */}
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
            <Eye size={23} strokeWidth={2.2} />

            {/* Status Dot */}
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-white dark:bg-[#07110D]" />
          </div>

          {/* Brand */}
          <div
            className="
              overflow-hidden whitespace-nowrap
              opacity-0
              transition-opacity duration-200
              group-hover:opacity-100
            "
          >
            <p className="text-base font-bold text-slate-900 dark:text-white">
              Vigil
            </p>

            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              AI Safety Monitoring
            </p>
          </div>
        </Link>
      </div>

      {/* =========================
          NAVIGATION
      ========================= */}
      <nav className="flex h-[calc(100vh-144px)] flex-col px-3 py-5">
        {/* Main Navigation */}
        <div className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  relative flex h-11 items-center
                  rounded-xl
                  transition-colors duration-200

                  ${
                    active
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-[#14251D] dark:hover:text-white"
                  }
                `}
              >
                {/* Active Indicator */}
                {active && (
                  <span className="absolute left-0 h-6 w-1 rounded-r-full bg-emerald-600 dark:bg-emerald-400" />
                )}

                {/* Icon */}
                <div className="flex w-[50px] shrink-0 items-center justify-center">
                  <Icon size={20} strokeWidth={2} />
                </div>

                {/* Label */}
                <span
                  className="
                    whitespace-nowrap text-sm font-medium
                    opacity-0
                    transition-opacity duration-200
                    group-hover:opacity-100
                  "
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* =========================
            SETTINGS + LOGOUT
        ========================= */}
        <div className="mt-auto border-t border-slate-200 pt-4 dark:border-[#1C3027]">
          {/* =========================
              SETTINGS
          ========================= */}
          <Link
            to="/settings"
            className={`
              relative flex h-11 items-center
              rounded-xl
              transition-colors duration-200

              ${
                location.pathname === "/settings"
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-[#14251D] dark:hover:text-white"
              }
            `}
          >
            {/* Active Indicator */}
            {location.pathname === "/settings" && (
              <span className="absolute left-0 h-6 w-1 rounded-r-full bg-emerald-600 dark:bg-emerald-400" />
            )}

            {/* Icon */}
            <div className="flex w-[50px] shrink-0 items-center justify-center">
              <Settings size={20} strokeWidth={2} />
            </div>

            {/* Label */}
            <span
              className="
                whitespace-nowrap text-sm font-medium
                opacity-0
                transition-opacity duration-200
                group-hover:opacity-100
              "
            >
              Settings
            </span>
          </Link>

          {/* =========================
              LOGOUT
          ========================= */}
          <button
            type="button"
            onClick={handleLogout}
            className="
              group/logout relative mt-2 flex h-11 w-full
              items-center rounded-xl
              text-left
              text-slate-600
              transition-colors duration-200
              hover:bg-red-50
              hover:text-red-600
              dark:text-slate-400
              dark:hover:bg-red-500/10
              dark:hover:text-red-400
            "
          >
            {/* Logout Icon */}
            <div className="flex w-[50px] shrink-0 items-center justify-center">
              <LogOut size={20} strokeWidth={2} />
            </div>

            {/* Logout Label */}
            <span
              className="
                whitespace-nowrap text-sm font-medium
                opacity-0
                transition-opacity duration-200
                group-hover:opacity-100
              "
            >
              Logout
            </span>
          </button>
        </div>
      </nav>

      {/* =========================
          SYSTEM STATUS
      ========================= */}
      <div className="absolute bottom-0 left-0 right-0 h-16 border-t border-slate-200 dark:border-[#1C3027]">
        <div className="flex h-full min-w-[225px] items-center gap-3 px-5">
          {/* Status Indicator */}
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.12)]" />

          {/* Status Text */}
          <span
            className="
              whitespace-nowrap text-xs font-medium
              text-slate-500 dark:text-slate-400
              opacity-0
              transition-opacity duration-200
              group-hover:opacity-100
            "
          >
            System Operational
          </span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
