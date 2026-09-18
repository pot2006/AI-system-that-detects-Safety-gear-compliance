import { useEffect, useState } from "react";
import { User, Bell, Shield, Camera, Mail, Save } from "lucide-react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [saved, setSaved] = useState(false);

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

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-[#07110D] dark:text-white">
      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <div className="min-h-screen pl-[68px]">
        {/* TOPBAR */}

        <Topbar darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* CONTENT */}

        <main className="min-h-screen bg-slate-50 px-5 pb-10 pt-[110px] transition-colors sm:px-8 dark:bg-[#07110D]">
          <div className="mx-auto max-w-[1200px]">
            {/* PAGE HEADER */}

            <div className="mb-7">
              <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                System Configuration
              </p>

              <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Settings
              </h1>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Manage your Vigil monitoring preferences and account settings.
              </p>
            </div>

            {/* SETTINGS GRID */}

            <div className="grid gap-5 lg:grid-cols-2">
              {/* PROFILE */}

              <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-[#1C3027] dark:bg-[#0D1914]">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <User size={20} />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900 dark:text-white">
                      Profile
                    </h2>

                    <p className="text-xs text-slate-500">
                      Account information
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Name
                    </label>

                    <input
                      type="text"
                      defaultValue="Himansu Panda"
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-emerald-500 dark:border-[#294238] dark:bg-[#07110D] dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Role
                    </label>

                    <input
                      type="text"
                      defaultValue="Safety Manager"
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-emerald-500 dark:border-[#294238] dark:bg-[#07110D] dark:text-white"
                    />
                  </div>
                </div>
              </section>

              {/* NOTIFICATIONS */}

              <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-[#1C3027] dark:bg-[#0D1914]">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <Bell size={20} />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900 dark:text-white">
                      Notifications
                    </h2>

                    <p className="text-xs text-slate-500">
                      Alert notification preferences
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <label className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        Dashboard alerts
                      </p>

                      <p className="text-xs text-slate-500">
                        Show safety alerts in the dashboard
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-5 w-5 accent-emerald-500"
                    />
                  </label>

                  <label className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        Email alerts
                      </p>

                      <p className="text-xs text-slate-500">
                        Receive emergency fire and smoke alerts
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-5 w-5 accent-emerald-500"
                    />
                  </label>
                </div>
              </section>

              {/* CAMERA SETTINGS */}

              <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-[#1C3027] dark:bg-[#0D1914]">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <Camera size={20} />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900 dark:text-white">
                      Camera Monitoring
                    </h2>

                    <p className="text-xs text-slate-500">
                      Monitoring preferences
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <label className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        Live monitoring
                      </p>

                      <p className="text-xs text-slate-500">
                        Enable continuous camera monitoring
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-5 w-5 accent-emerald-500"
                    />
                  </label>

                  <label className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        AI detection
                      </p>

                      <p className="text-xs text-slate-500">
                        Detect PPE, smoke and fire events
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-5 w-5 accent-emerald-500"
                    />
                  </label>
                </div>
              </section>

              {/* SECURITY */}

              <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-[#1C3027] dark:bg-[#0D1914]">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <Shield size={20} />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900 dark:text-white">
                      Security
                    </h2>

                    <p className="text-xs text-slate-500">
                      Vigil security configuration
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-4 dark:bg-emerald-500/5">
                    <Mail
                      size={18}
                      className="text-emerald-600 dark:text-emerald-400"
                    />

                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        Emergency Email
                      </p>

                      <p className="text-xs text-slate-500">
                        Configured for emergency notifications
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* SAVE */}

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={handleSave}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                <Save size={17} />

                {saved ? "Settings Saved" : "Save Changes"}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
