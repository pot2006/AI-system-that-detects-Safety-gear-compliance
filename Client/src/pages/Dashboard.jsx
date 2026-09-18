import { useEffect, useState } from "react";
import {
  Camera,
  AlertTriangle,
  ShieldAlert,
  Flame,
  HardHat,
  MapPin,
  ArrowRight,
  Maximize2,
  Volume2,
} from "lucide-react";

import { Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const Dashboard = () => {
  // =========================================================
  // THEME
  // =========================================================

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

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

  // =========================================================
  // RECENT ALERTS
  // =========================================================

  const alerts = [
    {
      title: "No Helmet Detected",
      camera: "CAM-04",
      location: "Production Area",
      time: "2 minutes ago",
      severity: "High",
      icon: HardHat,
    },
    {
      title: "Smoke Detected",
      camera: "CAM-07",
      location: "Loading Bay",
      time: "18 minutes ago",
      severity: "High",
      icon: Flame,
    },
    {
      title: "Unauthorized Access",
      camera: "CAM-02",
      location: "Storage Area",
      time: "1 hour ago",
      severity: "Medium",
      icon: ShieldAlert,
    },
    {
      title: "PPE Violation",
      camera: "CAM-01",
      location: "Entry Gate",
      time: "2 hours ago",
      severity: "Medium",
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-[#07110D] dark:text-white">
      {/* =====================================================
          SHARED SIDEBAR
      ===================================================== */}

      <Sidebar />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="min-h-screen pl-[68px]">
        {/* ===================================================
            SHARED TOPBAR
        =================================================== */}

        <Topbar darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* ===================================================
            DASHBOARD CONTENT
        =================================================== */}

        <main className="min-h-[calc(100vh-82px)] bg-slate-50 px-5 pt-[110px] pb-8 transition-colors sm:px-8 dark:bg-[#07110D]">
          <div className="mx-auto max-w-[1600px]">
            {/* =================================================
                GREETING
            ================================================= */}

            <section className="relative mb-7 overflow-hidden rounded-2xl border border-slate-200 bg-white px-6 py-7 dark:border-[#1C3027] dark:bg-[#0D1914] sm:px-8">
              {/* Background decoration */}

              <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-emerald-500/5 blur-3xl" />

              <div className="relative">
                <p className="mb-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                  Good evening,
                </p>

                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                  Himansu Panda{" "}
                  <span className="inline-block text-2xl sm:text-3xl">👋</span>
                </h1>

                <div className="mt-3 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Here's what's happening at your factory today.
                </div>
              </div>
            </section>

            {/* =================================================
                KPI CARDS
            ================================================= */}

            <section className="mb-7 grid gap-5 md:grid-cols-2">
              {/* TOTAL CAMERAS */}

              <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/40 dark:border-[#1C3027] dark:bg-[#0D1914] dark:hover:shadow-black/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                      <Camera size={26} strokeWidth={2} />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Total Cameras
                      </p>

                      <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                        12
                      </p>
                    </div>
                  </div>

                  <div className="hidden h-16 w-28 items-end gap-1 sm:flex">
                    <span className="h-5 w-2 rounded-full bg-emerald-200 dark:bg-emerald-900" />
                    <span className="h-8 w-2 rounded-full bg-emerald-300 dark:bg-emerald-800" />
                    <span className="h-6 w-2 rounded-full bg-emerald-300 dark:bg-emerald-800" />
                    <span className="h-11 w-2 rounded-full bg-emerald-400 dark:bg-emerald-700" />
                    <span className="h-9 w-2 rounded-full bg-emerald-500" />
                    <span className="h-14 w-2 rounded-full bg-emerald-500" />
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2 text-sm">
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    ↑ 2
                  </span>

                  <span className="text-slate-500 dark:text-slate-500">
                    from last week
                  </span>
                </div>
              </div>

              {/* ACTIVE ALERTS */}

              <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/40 dark:border-[#1C3027] dark:bg-[#0D1914] dark:hover:shadow-black/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400">
                      <AlertTriangle size={26} strokeWidth={2} />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Active Alerts
                      </p>

                      <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                        3
                      </p>
                    </div>
                  </div>

                  <div className="hidden h-16 w-28 items-end gap-1 sm:flex">
                    <span className="h-8 w-2 rounded-full bg-red-200 dark:bg-red-950" />
                    <span className="h-11 w-2 rounded-full bg-red-300 dark:bg-red-900" />
                    <span className="h-7 w-2 rounded-full bg-red-300 dark:bg-red-900" />
                    <span className="h-14 w-2 rounded-full bg-red-400 dark:bg-red-800" />
                    <span className="h-10 w-2 rounded-full bg-red-500" />
                    <span className="h-8 w-2 rounded-full bg-red-400 dark:bg-red-800" />
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2 text-sm">
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    ↓ 40%
                  </span>

                  <span className="text-slate-500 dark:text-slate-500">
                    from last week
                  </span>
                </div>
              </div>
            </section>

            {/* =================================================
                MAIN MONITORING AREA
            ================================================= */}

            <section className="grid gap-5 xl:grid-cols-[1.65fr_1fr]">
              {/* =================================================
                  LIVE MONITORING
              ================================================= */}

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-[#1C3027] dark:bg-[#0D1914]">
                {/* HEADER */}

                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-[#1C3027] sm:px-6">
                  <div className="flex items-center gap-3">
                    <h2 className="text-base font-bold text-slate-900 dark:text-white">
                      Live Monitoring
                    </h2>

                    <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                      Live
                    </div>
                  </div>

                  <Link
                    to="/live-monitoring"
                    className="group/link flex items-center gap-1 text-sm font-medium text-emerald-600 transition hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                  >
                    View all cameras
                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover/link:translate-x-0.5"
                    />
                  </Link>
                </div>

                {/* CAMERA */}

                <div className="p-4 sm:p-5">
                  <div className="relative aspect-video overflow-hidden rounded-xl bg-[#17231F]">
                    {/* FACTORY SIMULATION */}

                    <div className="absolute inset-0">
                      {/* Ceiling */}

                      <div className="absolute left-0 right-0 top-0 h-[15%] bg-gradient-to-b from-[#273934] to-[#1b2824]" />

                      {/* Factory floor */}

                      <div className="absolute bottom-0 left-0 right-0 h-[58%] bg-gradient-to-t from-[#303a37] via-[#48514e] to-[#56605d]" />

                      {/* Perspective floor lines */}

                      <div className="absolute bottom-0 left-[20%] h-[55%] w-px rotate-[17deg] bg-yellow-400/70" />

                      <div className="absolute bottom-0 left-[47%] h-[58%] w-px rotate-[3deg] bg-yellow-400/70" />

                      <div className="absolute bottom-0 right-[25%] h-[55%] w-px -rotate-[13deg] bg-yellow-400/70" />

                      {/* Machine 1 */}

                      <div className="absolute bottom-[28%] left-[5%] h-[25%] w-[17%] rounded bg-[#202a27] shadow-xl">
                        <div className="absolute left-2 top-3 h-2 w-12 rounded bg-slate-500" />

                        <div className="absolute bottom-3 left-3 right-3 h-1 rounded bg-yellow-500/50" />
                      </div>

                      {/* Machine 2 */}

                      <div className="absolute bottom-[31%] right-[7%] h-[27%] w-[20%] rounded bg-[#202a27] shadow-xl">
                        <div className="absolute left-3 top-3 h-2 w-14 rounded bg-slate-500" />

                        <div className="absolute bottom-3 left-3 right-3 h-1 rounded bg-yellow-500/50" />
                      </div>

                      {/* Worker 1 */}

                      <div className="absolute bottom-[14%] left-[42%] flex flex-col items-center">
                        <div className="mb-1 h-5 w-5 rounded-full bg-yellow-400" />

                        <div className="h-16 w-9 rounded-t-lg bg-emerald-500 shadow-lg" />

                        <div className="flex gap-1">
                          <div className="h-9 w-3 bg-[#202a27]" />
                          <div className="h-9 w-3 bg-[#202a27]" />
                        </div>
                      </div>

                      {/* Worker 2 */}

                      <div className="absolute bottom-[17%] left-[18%] flex scale-75 flex-col items-center">
                        <div className="mb-1 h-5 w-5 rounded-full bg-yellow-400" />

                        <div className="h-14 w-8 rounded-t-lg bg-emerald-500" />

                        <div className="flex gap-1">
                          <div className="h-8 w-3 bg-[#202a27]" />
                          <div className="h-8 w-3 bg-[#202a27]" />
                        </div>
                      </div>

                      {/* Worker 3 */}

                      <div className="absolute bottom-[19%] right-[18%] flex scale-75 flex-col items-center">
                        <div className="mb-1 h-5 w-5 rounded-full bg-yellow-400" />

                        <div className="h-14 w-8 rounded-t-lg bg-emerald-500" />

                        <div className="flex gap-1">
                          <div className="h-8 w-3 bg-[#202a27]" />
                          <div className="h-8 w-3 bg-[#202a27]" />
                        </div>
                      </div>
                    </div>

                    {/* CAMERA OVERLAY */}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

                    {/* CAMERA ID */}

                    <div className="absolute left-4 top-4 flex items-center gap-2 rounded-lg bg-black/55 px-3 py-2 text-xs font-medium text-white backdrop-blur-md">
                      <Camera size={14} />
                      CAM-04
                      <span className="text-white/40">|</span>
                      Production Area
                    </div>

                    {/* LIVE */}

                    <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-lg bg-red-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      LIVE
                    </div>

                    {/* DETECTION BOX */}

                    <div className="absolute bottom-[30%] left-[38%] h-[28%] w-[13%] rounded border-2 border-red-400">
                      <div className="absolute -top-6 left-0 rounded bg-red-500 px-2 py-1 text-[9px] font-bold text-white">
                        PERSON 97%
                      </div>
                    </div>

                    {/* BOTTOM CAMERA INFO */}

                    <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-4 text-white">
                      <div>
                        <p className="text-xs text-white/60">Camera Status</p>

                        <div className="mt-1 flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-emerald-400" />

                          <span className="text-sm font-medium">
                            Monitoring
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-black/50 backdrop-blur-md transition hover:bg-black/70"
                          title="Mute"
                        >
                          <Volume2 size={16} />
                        </button>

                        <button
                          type="button"
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-black/50 backdrop-blur-md transition hover:bg-black/70"
                          title="Fullscreen"
                        >
                          <Maximize2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================================
                  RECENT ALERTS
              ================================================= */}

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-[#1C3027] dark:bg-[#0D1914]">
                {/* HEADER */}

                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-[#1C3027] sm:px-6">
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    Recent Alerts
                  </h2>

                  <Link
                    to="/alerts"
                    className="group/link flex items-center gap-1 text-sm font-medium text-emerald-600 transition hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                  >
                    View all
                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover/link:translate-x-0.5"
                    />
                  </Link>
                </div>

                {/* ALERT LIST */}

                <div className="divide-y divide-slate-100 dark:divide-[#1C3027]">
                  {alerts.map((alert) => {
                    const Icon = alert.icon;

                    return (
                      <div
                        key={`${alert.title}-${alert.camera}`}
                        className="group flex items-center gap-3 px-5 py-4 transition hover:bg-slate-50 dark:hover:bg-white/[0.02] sm:px-6"
                      >
                        {/* ALERT ICON */}

                        <div
                          className={`
                            flex h-11 w-11 shrink-0
                            items-center justify-center
                            rounded-xl
                            ${
                              alert.severity === "High"
                                ? "bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400"
                                : "bg-amber-50 text-amber-500 dark:bg-amber-500/10 dark:text-amber-400"
                            }
                          `}
                        >
                          <Icon size={19} />
                        </div>

                        {/* ALERT INFO */}

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                            {alert.title}
                          </p>

                          <div className="mt-1 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-500">
                            <span>{alert.camera}</span>

                            <span>•</span>

                            <MapPin size={11} />

                            <span className="truncate">{alert.location}</span>
                          </div>

                          <p className="mt-1 text-xs text-slate-400 dark:text-slate-600">
                            {alert.time}
                          </p>
                        </div>

                        {/* SEVERITY */}

                        <span
                          className={`
                            shrink-0 rounded-full
                            px-3 py-1.5
                            text-[11px] font-semibold
                            ${
                              alert.severity === "High"
                                ? "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                                : "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
                            }
                          `}
                        >
                          {alert.severity}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* ALERT FOOTER */}

                <div className="border-t border-slate-100 px-5 py-4 dark:border-[#1C3027] sm:px-6">
                  <Link
                    to="/alerts"
                    className="flex items-center justify-center gap-2 text-sm font-medium text-slate-500 transition hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
                  >
                    Open alert center
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </section>

            {/* =================================================
                FUTURE DASHBOARD SPACE
            ================================================= */}

            <section className="min-h-[300px]">
              {/*
                Future dashboard content will go here.

                Planned:
                - Factory overview
                - Safety statistics
                - AI detection summary
                - Camera status
                - Analytics
              */}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
