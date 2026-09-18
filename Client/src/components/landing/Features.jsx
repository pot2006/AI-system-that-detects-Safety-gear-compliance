import {
  HardHat,
  Wind,
  Flame,
  BellRing,
  Mail,
  ClipboardList,
} from "lucide-react";

const features = [
  {
    number: "01",
    icon: HardHat,
    title: "PPE Compliance",
    description:
      "Automatically identify missing or incorrect safety equipment such as helmets, high-visibility vests, gloves and protective footwear.",
    tags: ["Helmet", "Vest", "Gloves"],
    accent: "emerald",
  },
  {
    number: "02",
    icon: Wind,
    title: "Smoke Detection",
    description:
      "Detect visible smoke from CCTV feeds at an early stage and generate an immediate safety event for investigation.",
    tags: ["Smoke", "CCTV", "Early Detection"],
    accent: "blue",
  },
  {
    number: "03",
    icon: Flame,
    title: "Fire Detection",
    description:
      "Identify visible fire incidents through AI-powered video analysis and trigger high-priority safety alerts.",
    tags: ["Fire", "High Priority", "AI"],
    accent: "red",
  },
  {
    number: "04",
    icon: BellRing,
    title: "Real-Time Alerts",
    description:
      "Turn detected safety violations and incidents into real-time alerts so responsible personnel can respond quickly.",
    tags: ["Live Alert", "Priority", "Response"],
    accent: "amber",
  },
  {
    number: "05",
    icon: Mail,
    title: "Email Emergency Alerts",
    description:
      "Automatically send email notifications to designated safety personnel when fire or smoke is detected, including location, camera and incident details.",
    tags: ["Email", "Fire Alert", "Smoke Alert"],
    accent: "sky",
  },
  {
    number: "06",
    icon: ClipboardList,
    title: "Incident Management",
    description:
      "Record every safety event with its location, camera, timestamp and detection details, making incidents easy to review and track.",
    tags: ["History", "Location", "Reports"],
    accent: "violet",
  },
];

const accentStyles = {
  emerald: {
    icon: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400",
    hover: "group-hover:border-emerald-300 dark:group-hover:border-emerald-800",
    number: "text-emerald-600 dark:text-emerald-400",
  },

  blue: {
    icon: "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400",
    hover: "group-hover:border-blue-300 dark:group-hover:border-blue-800",
    number: "text-blue-600 dark:text-blue-400",
  },

  red: {
    icon: "bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-400",
    hover: "group-hover:border-red-300 dark:group-hover:border-red-800",
    number: "text-red-600 dark:text-red-400",
  },

  amber: {
    icon: "bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400",
    hover: "group-hover:border-amber-300 dark:group-hover:border-amber-800",
    number: "text-amber-600 dark:text-amber-400",
  },

  sky: {
    icon: "bg-sky-50 text-sky-600 dark:bg-sky-950/60 dark:text-sky-400",
    hover: "group-hover:border-sky-300 dark:group-hover:border-sky-800",
    number: "text-sky-600 dark:text-sky-400",
  },

  violet: {
    icon: "bg-violet-50 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400",
    hover: "group-hover:border-violet-300 dark:group-hover:border-violet-800",
    number: "text-violet-600 dark:text-violet-400",
  },
};

const Features = () => {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-white px-6 py-24 transition-colors duration-300 dark:bg-[#07110D]"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-0 top-20 h-72 w-72 rounded-full bg-emerald-100/40 blur-3xl dark:bg-emerald-950/20" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-emerald-100/30 blur-3xl dark:bg-emerald-950/20" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Intelligent Safety Monitoring
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            One system.
            <span className="text-emerald-600 dark:text-emerald-400">
              {" "}
              Complete safety awareness.
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-400">
            Transform existing CCTV infrastructure into an intelligent safety
            monitoring system that detects hazards, identifies violations and
            delivers actionable alerts.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            const styles = accentStyles[feature.accent];

            return (
              <div
                key={feature.number}
                className={`group relative flex min-h-[330px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 dark:border-[#1C3027] dark:bg-[#0D1914] dark:hover:bg-[#101F18] dark:hover:shadow-black/20 ${styles.hover}`}
              >
                {/* Top */}
                <div className="mb-7 flex items-start justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${styles.icon}`}
                  >
                    <Icon size={23} strokeWidth={2} />
                  </div>

                  <span
                    className={`text-sm font-bold tracking-widest ${styles.number}`}
                  >
                    {feature.number}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {feature.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 dark:border-[#263C31] dark:bg-[#101F18] dark:text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-emerald-500 transition-all duration-500 group-hover:w-full" />
              </div>
            );
          })}
        </div>

        {/* Bottom Highlight */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900/70 dark:bg-emerald-950/20">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">
                Built for faster safety response
              </p>

              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                From detection to notification, every step is designed to reduce
                response time.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 sm:text-sm">
              <span>Detect</span>
              <span className="text-emerald-400">→</span>

              <span>Alert</span>
              <span className="text-emerald-400">→</span>

              <span>Email</span>
              <span className="text-emerald-400">→</span>

              <span>Respond</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
