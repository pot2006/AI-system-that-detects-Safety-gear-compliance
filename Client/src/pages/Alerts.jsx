import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Eye,
  MoreVertical,
  Download,
  X,
  MapPin,
  Camera,
  ShieldCheck,
  Flame,
  CheckCircle2,
  Clock3,
  FileText,
  ChevronDown,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const initialAlerts = [
  {
    id: 1,
    time: "10:42 AM",
    date: "2026-09-19",
    type: "PPE Violation",
    category: "PPE",
    camera: "CAM-02",
    location: "Production Area",
    status: "New",
    description:
      "Worker detected without the required safety helmet in the production area.",
    snapshot: "worker",
  },
  {
    id: 2,
    time: "10:18 AM",
    date: "2026-09-19",
    type: "Smoke Detected",
    category: "FireSmoke",
    camera: "CAM-04",
    location: "Storage Area",
    status: "In Review",
    description:
      "Smoke detected near the storage section. The event requires immediate inspection.",
    snapshot: "smoke",
  },
  {
    id: 3,
    time: "09:31 AM",
    date: "2026-09-19",
    type: "Fire Detected",
    category: "FireSmoke",
    camera: "CAM-03",
    location: "Loading Bay",
    status: "Resolved",
    description:
      "Fire detected near loading equipment. Safety personnel responded to the incident.",
    snapshot: "fire",
  },
  {
    id: 4,
    time: "09:04 AM",
    date: "2026-09-19",
    type: "PPE Violation",
    category: "PPE",
    camera: "CAM-05",
    location: "Assembly Line",
    status: "New",
    description:
      "Worker detected without a high-visibility safety vest on the assembly line.",
    snapshot: "worker",
  },
  {
    id: 5,
    time: "08:47 AM",
    date: "2026-09-19",
    type: "PPE Violation",
    category: "PPE",
    camera: "CAM-02",
    location: "Production Area",
    status: "In Review",
    description:
      "Protective equipment compliance issue detected near the production workstation.",
    snapshot: "worker",
  },
  {
    id: 6,
    time: "08:15 AM",
    date: "2026-09-19",
    type: "Smoke Detected",
    category: "FireSmoke",
    camera: "CAM-04",
    location: "Storage Area",
    status: "Resolved",
    description:
      "Smoke detected in the storage zone. The area was inspected and the event was resolved.",
    snapshot: "smoke",
  },
  {
    id: 7,
    time: "07:52 AM",
    date: "2026-09-19",
    type: "PPE Violation",
    category: "PPE",
    camera: "CAM-01",
    location: "Entry Gate",
    status: "New",
    description:
      "Person detected entering the facility without the required safety equipment.",
    snapshot: "worker",
  },
  {
    id: 8,
    time: "07:28 AM",
    date: "2026-09-19",
    type: "Fire Detected",
    category: "FireSmoke",
    camera: "CAM-03",
    location: "Loading Bay",
    status: "Resolved",
    description:
      "Fire event detected around the loading equipment and subsequently resolved.",
    snapshot: "fire",
  },
];

const cameras = [
  "All Cameras",
  "CAM-01",
  "CAM-02",
  "CAM-03",
  "CAM-04",
  "CAM-05",
];

const locations = [
  "All Areas",
  "Entry Gate",
  "Production Area",
  "Loading Bay",
  "Storage Area",
  "Assembly Line",
];

const AlertSnapshot = ({ type }) => {
  return (
    <div className="relative h-14 w-24 overflow-hidden rounded-lg bg-slate-200 dark:bg-[#16251F]">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-300 to-slate-500 dark:from-[#24352E] dark:to-[#101B17]" />

      <div className="absolute bottom-0 left-0 right-0 h-5 bg-slate-700/70 dark:bg-black/30" />

      {type === "worker" && (
        <>
          <div className="absolute bottom-4 left-10 h-4 w-2 rounded-full bg-slate-900 dark:bg-slate-300" />

          <div className="absolute bottom-2 left-9 h-4 w-4 rounded-sm bg-emerald-600" />

          <div className="absolute bottom-1 left-8 h-2 w-2 bg-slate-900" />

          <div className="absolute bottom-1 left-12 h-2 w-2 bg-slate-900" />

          <div className="absolute left-8 top-2 h-9 w-7 rounded border border-red-400" />
        </>
      )}

      {type === "smoke" && (
        <>
          <div className="absolute bottom-2 left-10 h-4 w-4 rounded-full bg-slate-200/80 blur-[1px]" />

          <div className="absolute bottom-5 left-12 h-5 w-5 rounded-full bg-slate-100/70 blur-[2px]" />

          <div className="absolute bottom-9 left-14 h-4 w-4 rounded-full bg-slate-100/50 blur-[2px]" />
        </>
      )}

      {type === "fire" && (
        <>
          <div className="absolute bottom-2 left-10 h-7 w-6 rounded-full bg-orange-500 blur-[1px]" />

          <div className="absolute bottom-3 left-12 h-5 w-3 rounded-full bg-yellow-300" />

          <div className="absolute bottom-8 left-11 h-3 w-3 rounded-full bg-slate-400/60 blur-[2px]" />
        </>
      )}

      <span className="absolute right-1.5 top-1.5 rounded bg-black/50 px-1.5 py-0.5 text-[8px] font-semibold text-white">
        CCTV
      </span>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    New: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",

    "In Review":
      "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",

    Resolved:
      "bg-slate-100 text-slate-600 dark:bg-slate-500/10 dark:text-slate-400",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "New"
            ? "bg-emerald-500"
            : status === "In Review"
              ? "bg-amber-500"
              : "bg-slate-400"
        }`}
      />

      {status}
    </span>
  );
};

const Alerts = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [alerts, setAlerts] = useState(initialAlerts);

  const [search, setSearch] = useState("");
  const [alertType, setAlertType] = useState("All Alert Types");
  const [location, setLocation] = useState("All Areas");
  const [camera, setCamera] = useState("All Cameras");
  const [status, setStatus] = useState("All Status");

  const [selectedAlert, setSelectedAlert] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);

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

  /* --------------------------------
     CLOSE THREE-DOT MENU
  -------------------------------- */

  useEffect(() => {
    const handleClickOutside = () => {
      setMenuOpen(null);
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  /* --------------------------------
     FILTER ALERTS
  -------------------------------- */

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        query === "" ||
        alert.type.toLowerCase().includes(query) ||
        alert.camera.toLowerCase().includes(query) ||
        alert.location.toLowerCase().includes(query) ||
        alert.description.toLowerCase().includes(query);

      const matchesType =
        alertType === "All Alert Types" ||
        (alertType === "PPE Safety Events" && alert.category === "PPE") ||
        (alertType === "Fire & Smoke Events" && alert.category === "FireSmoke");

      const matchesLocation =
        location === "All Areas" || alert.location === location;

      const matchesCamera = camera === "All Cameras" || alert.camera === camera;

      const matchesStatus = status === "All Status" || alert.status === status;

      return (
        matchesSearch &&
        matchesType &&
        matchesLocation &&
        matchesCamera &&
        matchesStatus
      );
    });
  }, [alerts, search, alertType, location, camera, status]);

  /* --------------------------------
     KPI COUNTS
  -------------------------------- */

  const ppeCount = alerts.filter((alert) => alert.category === "PPE").length;

  const fireSmokeCount = alerts.filter(
    (alert) => alert.category === "FireSmoke",
  ).length;

  /* --------------------------------
     EXPORT CSV
  -------------------------------- */

  const handleExport = () => {
    const headers = [
      "Time",
      "Date",
      "Alert Type",
      "Camera",
      "Location",
      "Status",
      "Description",
    ];

    const rows = filteredAlerts.map((alert) => [
      alert.time,
      alert.date,
      alert.type,
      alert.camera,
      alert.location,
      alert.status,
      alert.description,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `vigil-alerts-${
      new Date().toISOString().split("T")[0]
    }.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  /* --------------------------------
     UPDATE STATUS
  -------------------------------- */

  const updateStatus = (id, newStatus) => {
    setAlerts((current) =>
      current.map((alert) =>
        alert.id === id
          ? {
              ...alert,
              status: newStatus,
            }
          : alert,
      ),
    );

    setSelectedAlert((current) =>
      current?.id === id
        ? {
            ...current,
            status: newStatus,
          }
        : current,
    );

    setMenuOpen(null);
  };

  /* --------------------------------
     CLEAR FILTERS
  -------------------------------- */

  const clearFilters = () => {
    setSearch("");
    setAlertType("All Alert Types");
    setLocation("All Areas");
    setCamera("All Cameras");
    setStatus("All Status");
  };

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
                Safety Operations
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Alert Management
              </h1>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Review and manage safety events detected by Vigil.
              </p>
            </div>

            <button
              type="button"
              onClick={handleExport}
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              <Download size={17} />
              Export
            </button>
          </div>

          {/* KPI CARDS */}
          <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            <KpiCard
              icon={ShieldCheck}
              title="PPE Safety Events"
              value={ppeCount}
              description="Detected PPE compliance events"
            />

            <KpiCard
              icon={Flame}
              title="Fire & Smoke Events"
              value={fireSmokeCount}
              description="Detected fire or smoke events"
              fire
            />
          </div>

          {/* FILTERS */}
          <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 dark:border-[#1C3027] dark:bg-[#0D1914]">
            <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-semibold text-slate-900 dark:text-white">
                  Safety Events
                </h2>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {filteredAlerts.length} event
                  {filteredAlerts.length !== 1 ? "s" : ""} displayed
                </p>
              </div>

              <button
                type="button"
                onClick={clearFilters}
                className="w-fit text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
              >
                Clear filters
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
              <FilterSelect
                value={alertType}
                onChange={setAlertType}
                options={[
                  "All Alert Types",
                  "PPE Safety Events",
                  "Fire & Smoke Events",
                ]}
              />

              <FilterSelect
                value={location}
                onChange={setLocation}
                options={locations}
              />

              <FilterSelect
                value={camera}
                onChange={setCamera}
                options={cameras}
              />

              <FilterSelect
                value={status}
                onChange={setStatus}
                options={["All Status", "New", "In Review", "Resolved"]}
              />
            </div>
          </section>

          {/* ALERT TABLE */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-[#1C3027] dark:bg-[#0D1914]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 dark:border-[#1C3027] dark:bg-[#101E18]">
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Time
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Event
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Camera
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Location
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Snapshot
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 dark:divide-[#1C3027]">
                  {filteredAlerts.map((alert) => (
                    <tr
                      key={alert.id}
                      className="transition hover:bg-slate-50/80 dark:hover:bg-[#101E18]"
                    >
                      {/* TIME */}
                      <td className="whitespace-nowrap px-5 py-5">
                        <div className="flex items-center gap-2">
                          <Clock3 size={15} className="text-slate-400" />

                          <div>
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                              {alert.time}
                            </p>

                            <p className="text-xs text-slate-400">
                              {alert.date}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* EVENT */}
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                              alert.category === "PPE"
                                ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                                : "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400"
                            }`}
                          >
                            {alert.category === "PPE" ? (
                              <ShieldCheck size={18} />
                            ) : (
                              <Flame size={18} />
                            )}
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                              {alert.type}
                            </p>

                            <p className="text-xs text-slate-400">
                              {alert.category === "PPE"
                                ? "PPE Safety"
                                : "Fire & Smoke"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* CAMERA */}
                      <td className="whitespace-nowrap px-5 py-5">
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <Camera size={15} className="text-slate-400" />

                          {alert.camera}
                        </div>
                      </td>

                      {/* LOCATION */}
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <MapPin size={15} className="text-slate-400" />

                          {alert.location}
                        </div>
                      </td>

                      {/* SNAPSHOT */}
                      <td className="px-5 py-5">
                        <AlertSnapshot type={alert.snapshot} />
                      </td>

                      {/* STATUS */}
                      <td className="px-5 py-5">
                        <StatusBadge status={alert.status} />
                      </td>

                      {/* ACTIONS */}
                      <td className="px-5 py-5">
                        <div className="flex justify-end gap-1">
                          {/* VIEW */}
                          <button
                            type="button"
                            onClick={() => setSelectedAlert(alert)}
                            title="View alert details"
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-emerald-600 dark:text-slate-400 dark:hover:bg-[#17271F] dark:hover:text-emerald-400"
                          >
                            <Eye size={17} />
                          </button>

                          {/* THREE DOT MENU */}
                          <div className="relative">
                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();

                                setMenuOpen(
                                  menuOpen === alert.id ? null : alert.id,
                                );
                              }}
                              title="More actions"
                              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-[#17271F] dark:hover:text-white"
                            >
                              <MoreVertical size={17} />
                            </button>

                            {menuOpen === alert.id && (
                              <div
                                onClick={(event) => event.stopPropagation()}
                                className="absolute right-0 top-11 z-20 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl dark:border-[#1C3027] dark:bg-[#101E18]"
                              >
                                {/* DESCRIPTION */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedAlert(alert);
                                    setMenuOpen(null);
                                  }}
                                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-[#17271F]"
                                >
                                  <FileText size={16} />
                                  View Description
                                </button>

                                {/* IN REVIEW */}
                                {alert.status !== "In Review" && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      updateStatus(alert.id, "In Review")
                                    }
                                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-[#17271F]"
                                  >
                                    <Clock3 size={16} />
                                    Mark In Review
                                  </button>
                                )}

                                {/* RESOLVED */}
                                {alert.status !== "Resolved" && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      updateStatus(alert.id, "Resolved")
                                    }
                                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-[#17271F]"
                                  >
                                    <CheckCircle2 size={16} />
                                    Mark Resolved
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* EMPTY STATE */}
              {filteredAlerts.length === 0 && (
                <div className="px-6 py-16 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400 dark:bg-[#17271F]">
                    <Search size={21} />
                  </div>

                  <h3 className="mt-4 font-semibold text-slate-800 dark:text-white">
                    No events found
                  </h3>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Try changing your filters or search query.
                  </p>
                </div>
              )}
            </div>

            {/* PAGINATION */}
            <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row dark:border-[#1C3027]">
              <p className="text-xs text-slate-500">
                Showing {filteredAlerts.length} of {alerts.length} events
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled
                  className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-400 dark:border-[#1C3027]"
                >
                  Previous
                </button>

                <span className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-emerald-600 px-2 text-xs font-semibold text-white">
                  1
                </span>

                <button
                  type="button"
                  disabled
                  className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-400 dark:border-[#1C3027]"
                >
                  Next
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* DETAILS MODAL */}
      {selectedAlert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onClick={() => setSelectedAlert(null)}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-[#1C3027] dark:bg-[#0D1914]"
            onClick={(event) => event.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-[#1C3027]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Safety Event
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                  {selectedAlert.type}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedAlert(null)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-[#17271F] dark:hover:text-white"
              >
                <X size={19} />
              </button>
            </div>

            {/* MODAL CONTENT */}
            <div className="grid gap-6 p-6 md:grid-cols-2">
              <AlertSnapshot type={selectedAlert.snapshot} />

              <div className="space-y-4">
                <DetailItem
                  icon={Clock3}
                  label="Detected"
                  value={`${selectedAlert.date} • ${selectedAlert.time}`}
                />

                <DetailItem
                  icon={Camera}
                  label="Camera"
                  value={selectedAlert.camera}
                />

                <DetailItem
                  icon={MapPin}
                  label="Location"
                  value={selectedAlert.location}
                />

                <DetailItem
                  icon={selectedAlert.category === "PPE" ? ShieldCheck : Flame}
                  label="Detection Category"
                  value={
                    selectedAlert.category === "PPE"
                      ? "PPE Safety"
                      : "Fire & Smoke"
                  }
                />

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Status
                  </p>

                  <StatusBadge status={selectedAlert.status} />
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="border-t border-slate-200 px-6 py-5 dark:border-[#1C3027]">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Description
              </p>

              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                {selectedAlert.description}
              </p>
            </div>

            {/* MODAL ACTIONS */}
            <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4 dark:border-[#1C3027]">
              {selectedAlert.status !== "Resolved" && (
                <button
                  type="button"
                  onClick={() => updateStatus(selectedAlert.id, "Resolved")}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  <CheckCircle2 size={16} />
                  Mark Resolved
                </button>
              )}

              <button
                type="button"
                onClick={() => setSelectedAlert(null)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-[#1C3027] dark:text-slate-300 dark:hover:bg-[#17271F]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* --------------------------------
   KPI CARD
-------------------------------- */

const KpiCard = ({ icon: Icon, title, value, description, fire = false }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-[#1C3027] dark:bg-[#0D1914]">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${
          fire
            ? "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400"
            : "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
        }`}
      >
        <Icon size={22} />
      </div>

      <p className="mt-5 text-sm font-medium text-slate-500 dark:text-slate-400">
        {title}
      </p>

      <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        {value}
      </p>

      <p className="mt-2 text-xs text-slate-400">{description}</p>
    </div>
  );
};

/* --------------------------------
   FILTER SELECT
-------------------------------- */

const FilterSelect = ({ value, onChange, options }) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3 pr-10 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 dark:border-[#1C3027] dark:bg-[#101E18] dark:text-slate-300"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>

      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
      />
    </div>
  );
};

/* --------------------------------
   DETAIL ITEM
-------------------------------- */

const DetailItem = ({ icon: Icon, label, value }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-[#17271F] dark:text-slate-400">
        <Icon size={15} />
      </div>

      <div>
        <p className="text-xs font-medium text-slate-400">{label}</p>

        <p className="mt-0.5 text-sm font-semibold text-slate-800 dark:text-slate-200">
          {value}
        </p>
      </div>
    </div>
  );
};

export default Alerts;
