import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const ThreeDView = () => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark",
  );

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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#07110D] dark:text-white">
      {/* SHARED SIDEBAR */}
      <Sidebar />

      {/* SHARED TOPBAR */}
      <Topbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* MAIN CONTENT */}
      <main className="ml-[68px] min-h-screen pt-[110px]">
        <div className="mx-auto max-w-[1600px] px-5 pb-8 sm:px-8">
          {/* 
            3D factory visualization will be implemented here later.
            Intentionally left empty for now.
          */}
        </div>
      </main>
    </div>
  );
};

export default ThreeDView;
