import { Eye, ArrowUp, Mail, ShieldCheck } from "lucide-react";

const Footer = () => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="border-t border-slate-200 bg-white dark:border-[#1C3027] dark:bg-[#07110D]">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <button onClick={scrollToTop} className="flex items-center gap-3">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white">
                <Eye size={24} />

                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-white" />
              </div>

              <div className="text-left">
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  Vigil
                </p>

                <p className="text-xs text-slate-500">AI Safety Monitoring</p>
              </div>
            </button>

            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-400">
              AI-powered factory safety monitoring that transforms CCTV feeds
              into actionable safety intelligence.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Navigation
            </h3>

            <div className="mt-5 space-y-3">
              <button
                onClick={() => scrollToSection("features")}
                className="block text-sm text-slate-600 hover:text-emerald-600 dark:text-slate-400"
              >
                Features
              </button>

              <button
                onClick={() => scrollToSection("how-it-works")}
                className="block text-sm text-slate-600 hover:text-emerald-600 dark:text-slate-400"
              >
                How It Works
              </button>

              <button
                onClick={() => scrollToSection("use-cases")}
                className="block text-sm text-slate-600 hover:text-emerald-600 dark:text-slate-400"
              >
                Use Cases
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className="block text-sm text-slate-600 hover:text-emerald-600 dark:text-slate-400"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Safety */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Safety Monitoring
            </h3>

            <div className="mt-5 space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                PPE Compliance
              </p>

              <p className="text-sm text-slate-600 dark:text-slate-400">
                Smoke Detection
              </p>

              <p className="text-sm text-slate-600 dark:text-slate-400">
                Fire Detection
              </p>

              <p className="text-sm text-slate-600 dark:text-slate-400">
                Real-Time Alerts
              </p>

              <p className="text-sm text-slate-600 dark:text-slate-400">
                Email Notifications
              </p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Get in Touch
            </h3>

            <div className="mt-5 space-y-4">
              <button
                onClick={() => scrollToSection("contact")}
                className="flex items-center gap-3 text-sm text-slate-600 hover:text-emerald-600 dark:text-slate-400"
              >
                <Mail size={17} />
                Request a Demo
              </button>

              <div className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                <ShieldCheck
                  size={17}
                  className="mt-0.5 shrink-0 text-emerald-500"
                />

                <span>AI-powered industrial safety monitoring</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-slate-200 dark:bg-[#1C3027]" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              © {new Date().getFullYear()} Vigil. All rights reserved.
            </p>

            <p className="mt-1 text-xs text-slate-400">
              AI-powered safety monitoring project.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:border-emerald-300 hover:text-emerald-600 dark:border-[#263C31] dark:text-slate-400"
          >
            Back to top
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
