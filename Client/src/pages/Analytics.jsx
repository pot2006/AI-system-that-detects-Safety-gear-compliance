import { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  ShieldCheck,
  Flame,
  Camera,
  Activity,
  TrendingUp,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const analyticsData = {
  "Last 7 days": {
    total: 148,
    ppe: 112,
    smoke: 21,
    fire: 15,
    cameras: 5,

    trend: [
      { day: "13 Sep", value: 18 },
      { day: "14 Sep", value: 23 },
      { day: "15 Sep", value: 15 },
      { day: "16 Sep", value: 28 },
      { day: "17 Sep", value: 21 },
      { day: "18 Sep", value: 25 },
      { day: "19 Sep", value: 18 },
    ],
  },

  "Last 30 days": {
    total: 612,
    ppe: 471,
    smoke: 89,
    fire: 52,
    cameras: 5,

    trend: [
      { day: "21 Aug", value: 71 },
      { day: "25 Aug", value: 84 },
      { day: "29 Aug", value: 68 },
      { day: "02 Sep", value: 96 },
      { day: "06 Sep", value: 83 },
      { day: "10 Sep", value: 102 },
      { day: "14 Sep", value: 90 },
      { day: "19 Sep", value: 18 },
    ],
  },

  "This month": {
    total: 428,
    ppe: 327,
    smoke: 64,
    fire: 37,
    cameras: 5,

    trend: [
      { day: "01 Sep", value: 51 },
      { day: "04 Sep", value: 63 },
      { day: "07 Sep", value: 55 },
      { day: "10 Sep", value: 72 },
      { day: "13 Sep", value: 61 },
      { day: "16 Sep", value: 74 },
      { day: "19 Sep", value: 52 },
    ],
  },
};

const cameraData = [
  {
    camera: "CAM-02",
    location: "Production Area",
    events: 42,
  },
  {
    camera: "CAM-04",
    location: "Storage Area",
    events: 31,
  },
  {
    camera: "CAM-05",
    location: "Assembly Line",
    events: 28,
  },
  {
    camera: "CAM-03",
    location: "Loading Bay",
    events: 25,
  },
  {
    camera: "CAM-01",
    location: "Entry Gate",
    events: 22,
  },
];

const Analytics = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [period, setPeriod] = useState("Last 7 days");
  const [sortDescending, setSortDescending] = useState(true);

  /* --------------------------------
     THEME
  -------------------------------- */

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

  const currentData = analyticsData[period];

  /* --------------------------------
     SORT CAMERAS
  -------------------------------- */

  const sortedCameras = useMemo(() => {
    return [...cameraData].sort((a, b) =>
      sortDescending ? b.events - a.events : a.events - b.events,
    );
  }, [sortDescending]);

  const maxTrend = Math.max(...currentData.trend.map((item) => item.value));

  const maxCameraEvents = Math.max(
    ...cameraData.map((camera) => camera.events),
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#07110D] dark:text-white">
      {/* SHARED SIDEBAR */}
      <Sidebar />

      {/* SHARED TOPBAR */}
      <Topbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* PAGE CONTENT */}
      <main className="ml-[68px] min-h-screen pt-[110px]">
        <div className="mx-auto max-w-[1600px] px-5 pb-8 sm:px-8">
          {/* HEADER */}
          <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <p className="mb-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                Safety Intelligence
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Analytics
              </h1>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Understand safety events, detection patterns, and camera
                activity.
              </p>
            </div>

            {/* PERIOD SELECTOR */}
            <div className="relative w-fit">
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="h-11 appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 dark:border-[#1C3027] dark:bg-[#0D1914] dark:text-slate-300"
              >
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>This month</option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          {/* KPI CARDS */}
          <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              icon={Activity}
              title="Total Safety Events"
              value={currentData.total}
              description="Across all cameras"
            />

            <KpiCard
              icon={ShieldCheck}
              title="PPE Safety Events"
              value={currentData.ppe}
              description="Helmet, vest & PPE"
            />

            <KpiCard
              icon={Flame}
              title="Fire & Smoke Events"
              value={currentData.smoke + currentData.fire}
              description="Detected by AI"
              fire
            />

            <KpiCard
              icon={Camera}
              title="Active Cameras"
              value={`${currentData.cameras} / 6`}
              description="Currently monitoring"
            />
          </div>

          {/* TREND + BREAKDOWN */}
          <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
            {/* SAFETY EVENT TREND */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-[#1C3027] dark:bg-[#0D1914] xl:col-span-2">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-semibold text-slate-900 dark:text-white">
                    Safety Events Over Time
                  </h2>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Detected safety events for {period.toLowerCase()}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <TrendingUp size={15} />
                  <span className="hidden sm:inline">Event trend</span>
                </div>
              </div>

              {/* BAR CHART */}
              <div className="mt-8 flex h-64 items-end gap-3 border-b border-slate-200 px-2 pb-2 dark:border-[#1C3027]">
                {currentData.trend.map((item) => {
                  const height = (item.value / maxTrend) * 100;

                  return (
                    <div
                      key={item.day}
                      className="group flex h-full flex-1 flex-col items-center justify-end"
                    >
                      <div className="relative flex w-full flex-1 items-end justify-center">
                        <div
                          className="w-full max-w-14 rounded-t-lg bg-emerald-500 transition-all duration-500 group-hover:bg-emerald-600 dark:bg-emerald-500 dark:group-hover:bg-emerald-400"
                          style={{
                            height: `${height}%`,
                          }}
                        >
                          {/* VALUE ON HOVER */}
                          <span className="absolute left-1/2 -translate-x-1/2 -translate-y-7 text-xs font-semibold text-slate-600 opacity-0 transition group-hover:opacity-100 dark:text-slate-300">
                            {item.value}
                          </span>
                        </div>
                      </div>

                      <span className="mt-3 whitespace-nowrap text-[10px] text-slate-400 sm:text-xs">
                        {item.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* DETECTION BREAKDOWN */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-[#1C3027] dark:bg-[#0D1914]">
              <h2 className="font-semibold text-slate-900 dark:text-white">
                Detection Breakdown
              </h2>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Events by detection type
              </p>

              <div className="mt-7 space-y-6">
                <DetectionRow
                  icon={ShieldCheck}
                  label="PPE Safety"
                  value={currentData.ppe}
                  total={currentData.total}
                />

                <DetectionRow
                  icon={Flame}
                  label="Smoke Detection"
                  value={currentData.smoke}
                  total={currentData.total}
                  orange
                />

                <DetectionRow
                  icon={Flame}
                  label="Fire Detection"
                  value={currentData.fire}
                  total={currentData.total}
                  orange
                />
              </div>

              <div className="mt-8 border-t border-slate-200 pt-5 dark:border-[#1C3027]">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Total events</span>

                  <span className="font-bold text-slate-900 dark:text-white">
                    {currentData.total}
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* CAMERA ACTIVITY */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-[#1C3027] dark:bg-[#0D1914]">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-semibold text-slate-900 dark:text-white">
                  Camera Activity
                </h2>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Safety events detected by camera
                </p>
              </div>

              {/* SORT */}
              <button
                type="button"
                onClick={() => setSortDescending(!sortDescending)}
                className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-[#1C3027] dark:text-slate-300 dark:hover:bg-[#17271F]"
              >
                {sortDescending ? "Most events" : "Least events"}

                <ChevronDown
                  size={14}
                  className={`transition-transform ${
                    sortDescending ? "" : "rotate-180"
                  }`}
                />
              </button>
            </div>

            {/* CAMERA LIST */}
            <div className="mt-5 space-y-3">
              {sortedCameras.map((camera) => {
                const percentage = (camera.events / maxCameraEvents) * 100;

                return (
                  <div
                    key={camera.camera}
                    className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50 sm:flex-row sm:items-center dark:border-[#1C3027] dark:hover:bg-[#101E18]"
                  >
                    {/* CAMERA INFO */}
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                        <Camera size={18} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                          {camera.camera}
                        </p>

                        <p className="truncate text-xs text-slate-400">
                          {camera.location}
                        </p>
                      </div>
                    </div>

                    {/* PROGRESS BAR */}
                    <div className="w-full sm:w-1/2">
                      <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-[#17271F]">
                        <div
                          className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* EVENT COUNT */}
                    <div className="flex w-full items-center justify-between sm:w-20 sm:justify-end">
                      <span className="text-xs text-slate-400 sm:hidden">
                        Events
                      </span>

                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {camera.events}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

/* =================================
   KPI CARD
================================= */

const KpiCard = ({ icon: Icon, title, value, description, fire = false }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-[#1C3027] dark:bg-[#0D1914]">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
          fire
            ? "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400"
            : "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
        }`}
      >
        <Icon size={20} />
      </div>

      <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-400">{description}</p>
    </div>
  );
};

/* =================================
   DETECTION ROW
================================= */

const DetectionRow = ({ icon: Icon, label, value, total, orange = false }) => {
  const percentage = total > 0 ? (value / total) * 100 : 0;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-lg ${
              orange
                ? "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400"
                : "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
            }`}
          >
            <Icon size={15} />
          </div>

          <span className="text-sm text-slate-600 dark:text-slate-300">
            {label}
          </span>
        </div>

        <span className="text-sm font-bold text-slate-900 dark:text-white">
          {value}
        </span>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-[#17271F]">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            orange ? "bg-orange-500" : "bg-emerald-500"
          }`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <p className="mt-1 text-right text-[10px] text-slate-400">
        {percentage.toFixed(1)}%
      </p>
    </div>
  );
};

export default Analytics;
