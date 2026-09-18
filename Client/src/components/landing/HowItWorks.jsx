import {
  Camera,
  BrainCircuit,
  ShieldAlert,
  BellRing,
  Mail,
  UserCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Camera,
    title: "Connect CCTV",
    description:
      "Connect factory CCTV cameras and continuously receive live video feeds from different working areas.",
    points: ["Live video feed", "Multiple cameras"],
  },
  {
    number: "02",
    icon: BrainCircuit,
    title: "AI Analysis",
    description:
      "The AI system analyzes video frames continuously to identify people, safety equipment and potential hazards.",
    points: ["Video analysis", "Object detection"],
  },
  {
    number: "03",
    icon: ShieldAlert,
    title: "Detect Safety Events",
    description:
      "The system detects PPE violations, smoke and fire based on the configured safety monitoring rules.",
    points: ["PPE violations", "Smoke & fire"],
  },
  {
    number: "04",
    icon: BellRing,
    title: "Generate Alert",
    description:
      "When a safety event is detected, the system creates an alert with its severity and relevant incident information.",
    points: ["Event type", "Severity"],
  },
  {
    number: "05",
    icon: Mail,
    title: "Notify Personnel",
    description:
      "Safety personnel receive notifications through the dashboard and email alerts for critical fire or smoke events.",
    points: ["Dashboard alert", "Email notification"],
  },
  {
    number: "06",
    icon: UserCheck,
    title: "Respond Quickly",
    description:
      "Teams can review the incident details, identify the affected area and take appropriate action.",
    points: ["Location & camera", "Incident history"],
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-slate-50 px-6 py-24 transition-colors duration-300 dark:bg-[#0A1510]"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-72 w-72 rounded-full bg-emerald-100/40 blur-3xl dark:bg-emerald-950/20" />

      <div className="pointer-events-none absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-emerald-100/30 blur-3xl dark:bg-emerald-950/20" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            How It Works
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            From camera feed to
            <span className="text-emerald-600 dark:text-emerald-400">
              {" "}
              safety response.
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-400">
            Vigil connects your existing CCTV infrastructure with AI-powered
            detection to identify safety events and deliver actionable
            notifications.
          </p>
        </div>

        {/* Main Flow */}
        <div className="relative">
          {/* Connecting line - desktop */}
          <div className="absolute left-[8%] right-[8%] top-[72px] hidden h-px bg-emerald-200 lg:block dark:bg-emerald-900/70" />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={step.number} className="group relative">
                  {/* Card */}
                  <div className="relative h-full rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg hover:shadow-slate-200/50 dark:border-[#1C3027] dark:bg-[#0D1914] dark:hover:border-emerald-800 dark:hover:shadow-black/20">
                    {/* Top row */}
                    <div className="relative z-10 mb-7 flex items-center justify-between">
                      {/* Icon */}
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-8 ring-white dark:bg-emerald-950/60 dark:text-emerald-400 dark:ring-[#0D1914]">
                        <Icon size={25} strokeWidth={2} />
                      </div>

                      {/* Number */}
                      <span className="text-sm font-bold tracking-widest text-emerald-600 dark:text-emerald-400">
                        {step.number}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {step.description}
                    </p>

                    {/* Points */}
                    <div className="mt-6 space-y-2">
                      {step.points.map((point) => (
                        <div
                          key={point}
                          className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
                        >
                          <CheckCircle2
                            size={16}
                            className="shrink-0 text-emerald-500"
                          />

                          <span>{point}</span>
                        </div>
                      ))}
                    </div>

                    {/* Bottom accent */}
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-emerald-500 transition-all duration-500 group-hover:w-full" />
                  </div>

                  {/* Arrow between cards */}
                  {index !== steps.length - 1 && index !== 2 && (
                    <div className="absolute -right-4 top-[72px] z-20 hidden h-8 w-8 items-center justify-center rounded-full border border-emerald-200 bg-white text-emerald-500 lg:flex dark:border-emerald-900 dark:bg-[#0D1914]">
                      <ArrowRight size={16} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Pipeline */}
        <div className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900/70 dark:bg-emerald-950/20">
          <div className="flex flex-col items-center justify-between gap-5 lg:flex-row">
            <div className="text-center lg:text-left">
              <p className="font-semibold text-slate-900 dark:text-white">
                A simple safety workflow
              </p>

              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Continuous monitoring turns raw camera footage into actionable
                safety information.
              </p>
            </div>

            {/* Pipeline */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
              <span>CCTV</span>
              <ArrowRight size={15} />

              <span>AI</span>
              <ArrowRight size={15} />

              <span>Detection</span>
              <ArrowRight size={15} />

              <span>Alert</span>
              <ArrowRight size={15} />

              <span>Response</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
