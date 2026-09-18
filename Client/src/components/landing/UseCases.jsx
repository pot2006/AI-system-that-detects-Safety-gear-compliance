import {
  Factory,
  Warehouse,
  HardHat,
  ShieldCheck,
  ArrowRight,
  Camera,
  AlertTriangle,
} from "lucide-react";

const useCases = [
  {
    icon: Factory,
    number: "01",
    title: "Manufacturing Floors",
    description:
      "Monitor production areas for PPE compliance, unsafe behavior, smoke and fire while workers operate around machinery.",
    monitoring: [
      "Helmet & safety vest compliance",
      "Restricted area monitoring",
      "Smoke and fire detection",
    ],
    accent: "emerald",
  },
  {
    icon: Warehouse,
    number: "02",
    title: "Warehouses & Storage",
    description:
      "Continuously monitor storage areas and warehouse operations to identify hazards before they become larger incidents.",
    monitoring: [
      "Smoke & fire detection",
      "Worker safety monitoring",
      "Zone-based alerts",
    ],
    accent: "blue",
  },
  {
    icon: HardHat,
    number: "03",
    title: "Construction Sites",
    description:
      "Improve site visibility by monitoring worker safety equipment and identifying potential hazards across active work zones.",
    monitoring: [
      "Helmet detection",
      "High-visibility vest detection",
      "Hazard area monitoring",
    ],
    accent: "amber",
  },
  {
    icon: ShieldCheck,
    number: "04",
    title: "Restricted & High-Risk Areas",
    description:
      "Keep critical areas under continuous visual monitoring and receive alerts when safety rules or environmental conditions change.",
    monitoring: [
      "Restricted zone monitoring",
      "Safety violation alerts",
      "Real-time incident tracking",
    ],
    accent: "violet",
  },
];

const accentStyles = {
  emerald: {
    icon: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400",
    badge:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400",
  },
  blue: {
    icon: "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400",
    badge:
      "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-400",
  },
  amber: {
    icon: "bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400",
    badge:
      "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-400",
  },
  violet: {
    icon: "bg-violet-50 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400",
    badge:
      "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900 dark:bg-violet-950/40 dark:text-violet-400",
  },
};

const UseCases = () => {
  return (
    <section
      id="use-cases"
      className="relative overflow-hidden bg-white px-6 py-24 transition-colors duration-300 dark:bg-[#07110D]"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute right-0 top-20 h-80 w-80 rounded-full bg-emerald-100/40 blur-3xl dark:bg-emerald-950/20" />

      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-slate-100 blur-3xl dark:bg-[#0D1914]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Built for Industrial Safety
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            Safety intelligence for
            <span className="text-emerald-600 dark:text-emerald-400">
              {" "}
              every work zone.
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-400">
            From production floors to warehouses and high-risk areas, Vigil
            helps teams turn existing camera infrastructure into continuous
            safety monitoring.
          </p>
        </div>

        {/* Use Case Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {useCases.map((useCase) => {
            const Icon = useCase.icon;
            const styles = accentStyles[useCase.accent];

            return (
              <div
                key={useCase.number}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 dark:border-[#1C3027] dark:bg-[#0D1914] dark:hover:border-emerald-800 dark:hover:bg-[#101F18] dark:hover:shadow-black/20"
              >
                {/* Top section */}
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${styles.icon}`}
                  >
                    <Icon size={27} strokeWidth={2} />
                  </div>

                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-bold tracking-widest ${styles.badge}`}
                  >
                    {useCase.number}
                  </span>
                </div>

                {/* Content */}
                <div className="mt-7">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {useCase.title}
                  </h3>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {useCase.description}
                  </p>
                </div>

                {/* Monitoring list */}
                <div className="mt-7 border-t border-slate-200 pt-6 dark:border-[#263C31]">
                  <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                    What Vigil monitors
                  </p>

                  <div className="space-y-3">
                    {useCase.monitoring.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/60">
                          <ShieldCheck
                            size={14}
                            className="text-emerald-600 dark:text-emerald-400"
                          />
                        </span>

                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom visual */}
                <div className="mt-7 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-[#263C31] dark:bg-[#101F18]">
                  <div className="flex items-center gap-2">
                    <Camera size={16} className="text-emerald-500" />

                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                      Continuous camera monitoring
                    </span>
                  </div>

                  <ArrowRight
                    size={16}
                    className="text-slate-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-emerald-500"
                  />
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-emerald-500 transition-all duration-500 group-hover:w-full" />
              </div>
            );
          })}
        </div>

        {/* Bottom Highlight */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-[#1C3027] dark:bg-[#0D1914]">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <AlertTriangle size={21} />
            </div>

            <div>
              <p className="font-semibold text-slate-900 dark:text-white">
                One monitoring system across multiple zones
              </p>

              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Configure cameras according to the safety requirements of each
                area and receive relevant alerts in one place.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;
