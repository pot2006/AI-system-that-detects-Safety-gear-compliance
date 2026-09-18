import { useEffect, useState } from "react";

import {
  Search,
  Camera,
  MapPin,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Video,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const LiveMonitoring = () => {
  // =========================================================
  // THEME
  // =========================================================

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [search, setSearch] = useState("");
  const [area, setArea] = useState("All Areas");
  const [muted, setMuted] = useState({});
  const [fullscreenCamera, setFullscreenCamera] = useState(null);

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
  // ESCAPE KEY
  // =========================================================

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && fullscreenCamera) {
        setFullscreenCamera(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [fullscreenCamera]);

  // =========================================================
  // CAMERAS
  // =========================================================

  const cameras = [
    {
      id: "CAM-01",
      name: "Entry Gate",
      area: "Entry",
      status: "live",
      type: "gate",
    },
    {
      id: "CAM-02",
      name: "Production Area",
      area: "Production",
      status: "live",
      type: "production",
    },
    {
      id: "CAM-03",
      name: "Loading Bay",
      area: "Loading",
      status: "live",
      type: "loading",
    },
    {
      id: "CAM-04",
      name: "Storage Area",
      area: "Storage",
      status: "live",
      type: "storage",
    },
    {
      id: "CAM-05",
      name: "Assembly Line",
      area: "Production",
      status: "live",
      type: "assembly",
    },
    {
      id: "CAM-06",
      name: "Chemical Storage",
      area: "Storage",
      status: "offline",
      type: "chemical",
    },
  ];

  // =========================================================
  // FILTERING
  // =========================================================

  const filteredCameras = cameras.filter((camera) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      camera.id.toLowerCase().includes(searchValue) ||
      camera.name.toLowerCase().includes(searchValue) ||
      camera.area.toLowerCase().includes(searchValue);

    const matchesArea = area === "All Areas" || camera.area === area;

    return matchesSearch && matchesArea;
  });

  const onlineCount = cameras.filter(
    (camera) => camera.status === "live",
  ).length;

  const offlineCount = cameras.filter(
    (camera) => camera.status === "offline",
  ).length;

  // =========================================================
  // CONTROLS
  // =========================================================

  const toggleMute = (id) => {
    setMuted((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const openFullscreen = (camera) => {
    setFullscreenCamera(camera);
  };

  const closeFullscreen = () => {
    setFullscreenCamera(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-[#07110D] dark:text-white">
      {/* =====================================================
          SHARED SIDEBAR
      ===================================================== */}

      <Sidebar />

      {/* =====================================================
          MAIN
      ===================================================== */}

      <div className="min-h-screen pl-[68px]">
        {/* ===================================================
            SHARED TOPBAR
        =================================================== */}

        <Topbar darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* ===================================================
            PAGE
        =================================================== */}

        <main className="min-h-[calc(100vh-82px)] bg-slate-50 px-5 pt-[110px] pb-8 dark:bg-[#07110D] sm:px-8">
          <div className="mx-auto max-w-[1600px]">
            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="mb-7 flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                    Live Monitoring
                  </h1>

                  <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                    Live System
                  </div>
                </div>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 sm:text-base">
                  Monitor all factory cameras in real time with AI-powered
                  safety monitoring.
                </p>
              </div>

              {/* CAMERA STATISTICS */}

              <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-5 py-4 dark:border-[#1C3027] dark:bg-[#0D1914]">
                <div className="flex items-center gap-3 pr-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <Camera size={20} />
                  </div>

                  <div>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">
                      {cameras.length}
                    </p>

                    <p className="text-xs text-slate-500">Total Cameras</p>
                  </div>
                </div>

                <div className="h-10 w-px bg-slate-200 dark:bg-[#294238]" />

                <div className="px-6">
                  <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                    {onlineCount}
                  </p>

                  <p className="text-xs text-slate-500">Online</p>
                </div>

                <div className="h-10 w-px bg-slate-200 dark:bg-[#294238]" />

                <div className="pl-6">
                  <p className="text-xl font-bold text-slate-500">
                    {offlineCount}
                  </p>

                  <p className="text-xs text-slate-500">Offline</p>
                </div>
              </div>
            </div>

            {/* =================================================
                FILTERS
            ================================================= */}

            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* STATUS FILTERS */}

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className="rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm"
                >
                  All Cameras
                  <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs">
                    {cameras.length}
                  </span>
                </button>

                <button
                  type="button"
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:border-emerald-500 dark:border-[#294238] dark:bg-[#0D1914] dark:text-slate-300"
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Online
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs dark:bg-white/5">
                    {onlineCount}
                  </span>
                </button>

                <button
                  type="button"
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:border-emerald-500 dark:border-[#294238] dark:bg-[#0D1914] dark:text-slate-300"
                >
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  Offline
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs dark:bg-white/5">
                    {offlineCount}
                  </span>
                </button>
              </div>

              {/* SEARCH + AREA */}

              <div className="flex flex-col gap-3 sm:flex-row">
                {/* SEARCH */}

                <div className="relative">
                  <Search
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search cameras..."
                    className="
                      h-11 w-full rounded-xl
                      border border-slate-200
                      bg-white pl-10 pr-4
                      text-sm outline-none
                      focus:border-emerald-500
                      dark:border-[#294238]
                      dark:bg-[#0D1914]
                      dark:text-white
                      sm:w-64
                    "
                  />
                </div>

                {/* AREA */}

                <div className="relative">
                  <MapPin
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="
                      h-11 w-full appearance-none
                      rounded-xl
                      border border-slate-200
                      bg-white pl-10 pr-10
                      text-sm text-slate-700
                      outline-none
                      focus:border-emerald-500
                      dark:border-[#294238]
                      dark:bg-[#0D1914]
                      dark:text-slate-300
                      sm:w-44
                    "
                  >
                    <option>All Areas</option>
                    <option>Entry</option>
                    <option>Production</option>
                    <option>Loading</option>
                    <option>Storage</option>
                  </select>

                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* =================================================
                CAMERA GRID
            ================================================= */}

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
              {filteredCameras.map((camera) => (
                <CameraCard
                  key={camera.id}
                  camera={camera}
                  muted={muted[camera.id]}
                  onMute={() => toggleMute(camera.id)}
                  onFullscreen={() => openFullscreen(camera)}
                />
              ))}
            </div>

            {/* =================================================
                NO RESULTS
            ================================================= */}

            {filteredCameras.length === 0 && (
              <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white dark:border-[#294238] dark:bg-[#0D1914]">
                <div className="text-center">
                  <Camera
                    size={40}
                    className="mx-auto mb-4 text-slate-300 dark:text-slate-600"
                  />

                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    No cameras found
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Try another camera name or area.
                  </p>
                </div>
              </div>
            )}

            {/* =================================================
                PAGINATION
            ================================================= */}

            <div className="mt-7 flex flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
              <p>
                Showing{" "}
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {filteredCameras.length}
                </span>{" "}
                of{" "}
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {cameras.length}
                </span>{" "}
                cameras
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="
                    flex h-9 w-9 items-center justify-center
                    rounded-lg border border-slate-200
                    bg-white transition
                    hover:border-emerald-500
                    dark:border-[#294238]
                    dark:bg-[#0D1914]
                  "
                >
                  <ChevronLeft size={16} />
                </button>

                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-sm font-semibold text-white"
                >
                  1
                </button>

                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white transition hover:border-emerald-500 dark:border-[#294238] dark:bg-[#0D1914]"
                >
                  2
                </button>

                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white transition hover:border-emerald-500 dark:border-[#294238] dark:bg-[#0D1914]"
                >
                  3
                </button>

                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white transition hover:border-emerald-500 dark:border-[#294238] dark:bg-[#0D1914]"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* =====================================================
          FULLSCREEN CAMERA
      ===================================================== */}

      {fullscreenCamera && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-5 backdrop-blur-sm">
          <div className="relative w-full max-w-7xl">
            {/* TOP CONTROLS */}

            <div className="absolute -top-14 left-0 right-0 flex items-center justify-between">
              <div className="flex items-center gap-3 text-white">
                <div className="flex items-center gap-2 rounded-lg bg-black/40 px-3 py-2 backdrop-blur-md">
                  <Camera size={17} />

                  <span className="font-semibold">{fullscreenCamera.id}</span>

                  <span className="text-white/40">|</span>

                  <span className="text-sm text-white/70">
                    {fullscreenCamera.name}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-2 text-xs font-bold text-white">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                  LIVE
                </div>
              </div>

              {/* MINIMIZE */}

              <button
                type="button"
                onClick={closeFullscreen}
                className="
                  flex items-center gap-2
                  rounded-lg
                  bg-white/10
                  px-3 py-2
                  text-sm font-medium
                  text-white
                  backdrop-blur-md
                  transition
                  hover:bg-white/20
                "
                title="Minimize"
              >
                <Minimize2 size={17} />
                Minimize
              </button>
            </div>

            {/* CAMERA */}

            <div className="overflow-hidden rounded-2xl bg-[#17231F] shadow-2xl">
              <div className="relative aspect-video">
                <FactoryScene type={fullscreenCamera.type} />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                {/* CAMERA LABEL */}

                <div className="absolute left-5 top-5 flex items-center gap-3 rounded-xl bg-black/50 px-4 py-2.5 text-white backdrop-blur-md">
                  <Camera size={18} />

                  <span className="font-semibold">{fullscreenCamera.id}</span>

                  <span className="text-white/40">|</span>

                  <span>{fullscreenCamera.name}</span>
                </div>

                {/* LIVE */}

                <div className="absolute right-5 top-5 flex items-center gap-2 rounded-lg bg-emerald-500 px-3 py-2 text-xs font-bold text-white">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                  LIVE
                </div>

                {/* BOTTOM */}

                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                  <div className="text-sm text-white/80">
                    19 Sep 2026 | Live Camera Feed
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/50 text-white backdrop-blur-md transition hover:bg-black/70"
                      title="Mute"
                    >
                      <Volume2 size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={closeFullscreen}
                      className="flex items-center gap-2 rounded-lg bg-black/50 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-black/70"
                      title="Minimize"
                    >
                      <Minimize2 size={17} />
                      Minimize
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ESC HINT */}

            <p className="mt-3 text-center text-xs text-white/40">
              Press ESC to minimize
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================================
   CAMERA CARD
========================================================= */

const CameraCard = ({ camera, muted, onMute, onFullscreen }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-[#1C3027] dark:bg-[#0D1914]">
      {/* CAMERA HEADER */}

      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-[#1C3027]">
        <div className="flex min-w-0 items-center gap-2.5">
          <Camera
            size={18}
            className="shrink-0 text-slate-500 dark:text-slate-400"
          />

          <span className="text-sm font-bold text-slate-900 dark:text-white">
            {camera.id}
          </span>

          <span className="text-slate-300 dark:text-slate-600">|</span>

          <span className="truncate text-sm text-slate-500 dark:text-slate-400">
            {camera.name}
          </span>
        </div>

        {/* STATUS */}

        {camera.status === "live" ? (
          <div className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            LIVE
          </div>
        ) : (
          <div className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-slate-500">
            <span className="h-2 w-2 rounded-full bg-slate-400" />
            OFFLINE
          </div>
        )}
      </div>

      {/* CAMERA */}

      <div className="p-3">
        <div className="relative aspect-video overflow-hidden rounded-xl bg-[#17231F]">
          {camera.status === "live" ? (
            <>
              <FactoryScene type={camera.type} />

              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20" />

              {/* LOCATION */}

              <div className="absolute left-3 top-3 flex items-center gap-2 rounded-lg bg-black/50 px-3 py-2 text-xs font-medium text-white backdrop-blur-md">
                <MapPin size={13} />

                {camera.name}
              </div>

              {/* LIVE */}

              <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-[10px] font-bold text-white">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                LIVE
              </div>

              {/* BOTTOM */}

              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-3">
                <div>
                  <p className="text-[10px] text-white/60">Camera Status</p>

                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                    <span className="text-xs font-medium text-white">
                      Monitoring
                    </span>
                  </div>
                </div>

                {/* CONTROLS */}

                <div className="flex items-center gap-1.5">
                  {/* MUTE */}

                  <button
                    type="button"
                    onClick={onMute}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/55 text-white backdrop-blur-md transition hover:bg-black/75"
                    title={muted ? "Unmute" : "Mute"}
                  >
                    {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                  </button>

                  {/* FULLSCREEN */}

                  <button
                    type="button"
                    onClick={onFullscreen}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/55 text-white backdrop-blur-md transition hover:bg-black/75"
                    title="Fullscreen"
                  >
                    <Maximize2 size={15} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <FactoryScene type={camera.type} />

              <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                <Video size={38} className="mb-3 text-white/60" />

                <p className="text-sm font-semibold">Camera Offline</p>

                <p className="mt-1 text-xs text-white/50">Connection lost</p>
              </div>

              <div className="absolute bottom-3 left-3 text-xs text-white/60">
                Connection unavailable
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   FACTORY CAMERA VISUAL
========================================================= */

const FactoryScene = ({ type }) => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#25332E]">
      {/* CEILING */}

      <div className="absolute left-0 right-0 top-0 h-[18%] bg-gradient-to-b from-[#33433D] to-[#26332F]" />

      {/* CEILING LIGHTS */}

      <div className="absolute left-[10%] top-[7%] h-1 w-[15%] rounded-full bg-white/50 blur-[1px]" />

      <div className="absolute left-[42%] top-[7%] h-1 w-[15%] rounded-full bg-white/50 blur-[1px]" />

      <div className="absolute right-[10%] top-[7%] h-1 w-[15%] rounded-full bg-white/50 blur-[1px]" />

      {/* BACK WALL */}

      <div className="absolute left-[10%] right-[10%] top-[18%] h-[28%] bg-[#3D4844]" />

      {/* FACTORY FLOOR */}

      <div className="absolute bottom-0 left-0 right-0 h-[58%] bg-gradient-to-t from-[#303A37] via-[#46514D] to-[#59625F]" />

      {/* FLOOR LINES */}

      <div className="absolute bottom-0 left-[18%] h-[63%] w-[2px] rotate-[13deg] bg-yellow-400/60" />

      <div className="absolute bottom-0 left-[48%] h-[63%] w-[2px] rotate-[2deg] bg-yellow-400/60" />

      <div className="absolute bottom-0 right-[20%] h-[63%] w-[2px] -rotate-[13deg] bg-yellow-400/60" />

      {/* MACHINES */}

      <div className="absolute bottom-[27%] left-[5%] h-[28%] w-[19%] rounded-md bg-[#202B27] shadow-xl">
        <div className="absolute left-2 right-2 top-3 h-2 rounded bg-slate-500/60" />

        <div className="absolute bottom-4 left-2 right-2 h-1 rounded bg-yellow-500/50" />
      </div>

      <div className="absolute bottom-[30%] right-[5%] h-[30%] w-[20%] rounded-md bg-[#202B27] shadow-xl">
        <div className="absolute left-2 right-2 top-3 h-2 rounded bg-slate-500/60" />

        <div className="absolute bottom-4 left-2 right-2 h-1 rounded bg-yellow-500/50" />
      </div>

      {/* GATE */}

      {type === "gate" && (
        <>
          <div className="absolute bottom-[38%] left-[4%] h-[4%] w-[92%] bg-white/10" />

          <div className="absolute bottom-[33%] right-[25%] h-[17%] w-[3%] rounded bg-white/20" />

          <div className="absolute bottom-[39%] right-[14%] flex h-10 w-10 items-center justify-center rounded-full border-2 border-red-400/70 text-[7px] font-bold text-red-300">
            STOP
          </div>
        </>
      )}

      {/* LOADING */}

      {type === "loading" && (
        <>
          <div className="absolute bottom-[32%] left-[7%] h-[25%] w-[25%] rounded bg-[#23302C]" />

          <div className="absolute bottom-[37%] left-[10%] h-[13%] w-[19%] bg-blue-800/70" />

          <div className="absolute bottom-[32%] right-[29%] h-[15%] w-[5%] bg-yellow-600/70" />
        </>
      )}

      {/* STORAGE */}

      {type === "storage" && (
        <>
          <div className="absolute bottom-[29%] left-[3%] h-[35%] w-[14%] border-x-4 border-[#26312D] bg-[#46534D]">
            <div className="absolute inset-x-2 top-4 h-6 bg-orange-500/30" />

            <div className="absolute inset-x-2 top-14 h-6 bg-orange-500/30" />
          </div>

          <div className="absolute bottom-[29%] right-[3%] h-[35%] w-[14%] border-x-4 border-[#26312D] bg-[#46534D]">
            <div className="absolute inset-x-2 top-4 h-6 bg-orange-500/30" />

            <div className="absolute inset-x-2 top-14 h-6 bg-orange-500/30" />
          </div>
        </>
      )}

      {/* CHEMICAL */}

      {type === "chemical" && (
        <>
          <div className="absolute bottom-[27%] left-[9%] h-[32%] w-[14%] rounded-full bg-slate-300/30 shadow-xl" />

          <div className="absolute bottom-[27%] right-[12%] h-[35%] w-[16%] rounded-full bg-slate-300/30 shadow-xl" />
        </>
      )}

      {/* ASSEMBLY */}

      {type === "assembly" && (
        <>
          <div className="absolute bottom-[35%] left-[28%] h-[7%] w-[45%] rounded bg-[#202B27] shadow-lg" />

          <div className="absolute bottom-[26%] left-[34%] h-[12%] w-[5%] rounded bg-[#26332F]" />

          <div className="absolute bottom-[26%] right-[34%] h-[12%] w-[5%] rounded bg-[#26332F]" />
        </>
      )}

      {/* PRODUCTION */}

      {type === "production" && (
        <>
          <div className="absolute bottom-[36%] left-[32%] h-[16%] w-[30%] rounded bg-[#202B27] shadow-xl" />

          <div className="absolute bottom-[43%] left-[38%] h-2 w-[18%] rounded bg-yellow-500/40" />
        </>
      )}

      {/* WORKERS */}

      <Worker position="left-[28%]" scale="scale-75" bottom="bottom-[15%]" />

      <Worker position="left-[49%]" scale="scale-100" bottom="bottom-[12%]" />

      <Worker position="right-[24%]" scale="scale-75" bottom="bottom-[17%]" />
    </div>
  );
};

/* =========================================================
   WORKER
========================================================= */

const Worker = ({ position, scale, bottom }) => {
  return (
    <div
      className={`absolute ${position} ${bottom} ${scale} flex flex-col items-center`}
    >
      {/* HELMET */}

      <div className="mb-1 h-5 w-5 rounded-full bg-yellow-400 shadow" />

      {/* BODY */}

      <div className="h-14 w-8 rounded-t-lg bg-emerald-500 shadow-lg">
        <div className="mx-auto mt-3 h-2 w-6 bg-yellow-200/70" />
      </div>

      {/* LEGS */}

      <div className="flex gap-1">
        <div className="h-8 w-3 bg-[#202A27]" />

        <div className="h-8 w-3 bg-[#202A27]" />
      </div>
    </div>
  );
};

export default LiveMonitoring;
