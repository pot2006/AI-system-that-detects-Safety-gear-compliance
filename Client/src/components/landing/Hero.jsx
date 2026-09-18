import {
  ArrowRight,
  Play,
  ShieldCheck,
  AlertTriangle,
  Flame,
  HardHat,
  MapPin,
} from "lucide-react";

const Hero = () => {
  const scrollToHowItWorks = () => {
    document.getElementById("how-it-works")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section
      id="hero"
      className="
        relative overflow-hidden
        border-b border-slate-200
        bg-white
        pt-32 pb-20
        transition-colors duration-300
        dark:border-white/10
        dark:bg-[#07110D]
        sm:pt-36
        lg:pt-40 lg:pb-28
      "
    >
      {/* Background decoration */}
      <div
        className="
          pointer-events-none absolute
          -right-40 -top-40
          h-[500px] w-[500px]
          rounded-full
          bg-emerald-100/60
          blur-3xl
          dark:bg-emerald-950/30
        "
      />

      <div
        className="
          pointer-events-none absolute
          -left-40 bottom-0
          h-[350px] w-[350px]
          rounded-full
          bg-emerald-50
          blur-3xl
          dark:bg-emerald-950/20
        "
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* =====================================================
              LEFT — HERO CONTENT
          ====================================================== */}

          <div className="max-w-2xl">
            {/* Small badge */}
            <div
              className="
                mb-6 inline-flex items-center gap-2
                rounded-full
                border border-emerald-200
                bg-emerald-50
                px-3.5 py-2
                text-sm font-medium
                text-emerald-700
                dark:border-emerald-900
                dark:bg-emerald-950/50
                dark:text-emerald-400
              "
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="
                    absolute inline-flex h-full w-full
                    animate-ping rounded-full
                    bg-emerald-400 opacity-75
                  "
                />

                <span
                  className="
                    relative inline-flex h-2 w-2
                    rounded-full bg-emerald-500
                  "
                />
              </span>
              AI-Powered Factory Safety
            </div>

            {/* Heading */}
            <h1
              className="
                text-4xl font-bold
                leading-[1.08]
                tracking-tight
                text-slate-900
                sm:text-5xl
                lg:text-6xl
                xl:text-7xl
                dark:text-white
              "
            >
              Safer factories.
              <span className="block text-emerald-600 dark:text-emerald-400">
                Smarter detection.
              </span>
            </h1>

            {/* Description */}
            <p
              className="
                mt-6 max-w-xl
                text-base
                leading-7
                text-slate-600
                sm:text-lg
                dark:text-slate-400
              "
            >
              Vigil uses AI-powered video analysis to detect PPE violations,
              smoke, and fire in real time — helping factory teams respond
              faster with actionable safety alerts.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {/* Get Started */}
              <a
                href="/signup"
                className="
                  group inline-flex
                  items-center justify-center gap-2
                  rounded-xl
                  bg-emerald-600
                  px-6 py-3.5
                  text-sm font-semibold
                  text-white
                  shadow-sm
                  transition-all duration-200
                  hover:bg-emerald-700
                  hover:shadow-lg
                  active:scale-[0.98]
                  dark:bg-emerald-500
                  dark:text-[#07110D]
                  dark:hover:bg-emerald-400
                "
              >
                Get Started
                <ArrowRight
                  size={17}
                  className="
                    transition-transform duration-200
                    group-hover:translate-x-1
                  "
                />
              </a>

              {/* How it works */}
              <button
                onClick={scrollToHowItWorks}
                className="
                  inline-flex
                  items-center justify-center gap-2
                  rounded-xl
                  border border-slate-300
                  bg-white
                  px-6 py-3.5
                  text-sm font-semibold
                  text-slate-700
                  transition-all duration-200
                  hover:border-emerald-400
                  hover:bg-emerald-50
                  hover:text-emerald-700

                  dark:border-white/15
                  dark:bg-white/5
                  dark:text-slate-200
                  dark:hover:border-emerald-700
                  dark:hover:bg-emerald-950/50
                  dark:hover:text-emerald-400
                "
              >
                <Play size={16} />
                See How It Works
              </button>
            </div>

            {/* Trust points */}
            <div
              className="
                mt-8 flex flex-wrap gap-x-6 gap-y-3
                text-sm text-slate-500
                dark:text-slate-400
              "
            >
              <span className="flex items-center gap-2">
                <ShieldCheck
                  size={16}
                  className="text-emerald-600 dark:text-emerald-400"
                />
                Real-time monitoring
              </span>

              <span className="flex items-center gap-2">
                <ShieldCheck
                  size={16}
                  className="text-emerald-600 dark:text-emerald-400"
                />
                CCTV compatible
              </span>
            </div>
          </div>

          {/* =====================================================
              RIGHT — CCTV AI PREVIEW
          ====================================================== */}

          <div className="relative mx-auto w-full max-w-xl">
            {/* Glow */}
            <div
              className="
                absolute inset-10
                rounded-3xl
                bg-emerald-400/20
                blur-3xl
                dark:bg-emerald-500/10
              "
            />

            {/* Main camera card */}
            <div
              className="
                relative overflow-hidden
                rounded-2xl
                border border-slate-200
                bg-white
                shadow-2xl shadow-slate-200/60
                dark:border-white/10
                dark:bg-[#0D1914]
                dark:shadow-black/30
              "
            >
              {/* Camera Header */}
              <div
                className="
                  flex items-center justify-between
                  border-b border-slate-200
                  px-4 py-3
                  dark:border-white/10
                "
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                    <ShieldCheck size={17} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-900 dark:text-white">
                      CAM-04
                    </p>

                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      Assembly Floor
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  LIVE
                </div>
              </div>

              {/* CCTV Image Area */}
              <div className="relative aspect-video overflow-hidden bg-slate-800">
                {/* Placeholder factory CCTV */}
                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-br
                    from-slate-700
                    via-slate-600
                    to-slate-800
                    dark:from-slate-800
                    dark:via-slate-700
                    dark:to-slate-900
                  "
                >
                  {/* Factory floor simulation */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-slate-900/40" />

                  <div className="absolute left-[12%] top-[15%] h-[65%] w-2 bg-slate-300/30" />
                  <div className="absolute left-[35%] top-[10%] h-[70%] w-2 bg-slate-300/20" />
                  <div className="absolute right-[20%] top-[12%] h-[70%] w-2 bg-slate-300/20" />

                  {/* Worker */}
                  <div className="absolute left-[42%] bottom-[12%]">
                    {/* Head */}
                    <div className="mx-auto h-8 w-8 rounded-full bg-slate-300" />

                    {/* Body */}
                    <div className="mx-auto mt-1 h-20 w-14 rounded-t-xl bg-emerald-500/80" />

                    {/* Legs */}
                    <div className="flex justify-center gap-2">
                      <div className="h-12 w-5 bg-slate-400" />
                      <div className="h-12 w-5 bg-slate-400" />
                    </div>
                  </div>

                  {/* AI detection box */}
                  <div
                    className="
                      absolute left-[38%] top-[20%]
                      h-[65%] w-[22%]
                      rounded-lg
                      border-2 border-emerald-400
                    "
                  >
                    <div
                      className="
                        absolute -top-7 left-0
                        rounded-md
                        bg-emerald-500
                        px-2 py-1
                        text-[9px] font-bold
                        text-white
                      "
                    >
                      PERSON 97%
                    </div>
                  </div>
                </div>

                {/* Detection warning */}
                <div
                  className="
                    absolute bottom-3 left-3
                    flex items-center gap-2
                    rounded-lg
                    border border-amber-300/50
                    bg-black/65
                    px-3 py-2
                    text-xs
                    text-white
                    backdrop-blur-md
                  "
                >
                  <HardHat size={15} className="text-amber-400" />

                  <span>Helmet detected</span>

                  <span className="text-emerald-400">96%</span>
                </div>
              </div>

              {/* Camera information */}
              <div className="grid grid-cols-3 divide-x divide-slate-200 dark:divide-white/10">
                <div className="p-3 text-center">
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    STATUS
                  </p>

                  <p className="mt-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    Protected
                  </p>
                </div>

                <div className="p-3 text-center">
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    DETECTION
                  </p>

                  <p className="mt-1 text-xs font-semibold text-slate-800 dark:text-white">
                    PPE
                  </p>
                </div>

                <div className="p-3 text-center">
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    ZONE
                  </p>

                  <p className="mt-1 flex items-center justify-center gap-1 text-xs font-semibold text-slate-800 dark:text-white">
                    <MapPin size={12} />
                    Floor 04
                  </p>
                </div>
              </div>
            </div>

            {/* Alert floating card */}
            <div
              className="
                absolute -bottom-6 -left-5
                hidden w-64
                rounded-2xl
                border border-slate-200
                bg-white
                p-4
                shadow-xl
                sm:block
                dark:border-white/10
                dark:bg-[#0D1914]
              "
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400">
                  <Flame size={18} />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      Safety Alert
                    </p>

                    <span className="text-[9px] font-medium text-slate-400">
                      2s ago
                    </span>
                  </div>

                  <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                    Smoke detected in Warehouse B
                  </p>

                  <div className="mt-2 flex items-center gap-1 text-[10px] font-medium text-red-600 dark:text-red-400">
                    <AlertTriangle size={12} />
                    Immediate attention
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
