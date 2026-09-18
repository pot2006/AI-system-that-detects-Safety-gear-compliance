import { useState } from "react";
import {
  Mail,
  MapPin,
  Send,
  ShieldCheck,
  Camera,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Backend / email integration will be added later.
    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-slate-50 px-6 py-24 transition-colors duration-300 dark:bg-[#0A1510]"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-0 top-0 h-80 w-80 rounded-full bg-emerald-100/40 blur-3xl dark:bg-emerald-950/20" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-emerald-100/30 blur-3xl dark:bg-emerald-950/20" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400">
            <Mail size={15} />
            Get in Touch
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            Ready to make your workplace
            <span className="text-emerald-600 dark:text-emerald-400">
              {" "}
              safer?
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-400">
            Tell us about your safety monitoring requirements and explore how
            AI-powered CCTV analysis can help your team respond faster.
          </p>
        </div>

        {/* Main Contact Area */}
        <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/40 lg:grid-cols-[0.85fr_1.15fr] dark:border-[#1C3027] dark:bg-[#0D1914] dark:shadow-black/20">
          {/* Left Panel */}
          <div className="relative overflow-hidden bg-[#07110D] p-8 text-white sm:p-10 lg:p-12">
            {/* Glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

            <div className="relative">
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white">
                <ShieldCheck size={28} strokeWidth={2} />
              </div>

              <h3 className="text-2xl font-bold sm:text-3xl">
                AI-powered safety monitoring
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                Vigil helps industrial teams monitor their environments,
                identify safety events and deliver timely notifications using
                existing CCTV infrastructure.
              </p>

              {/* Monitoring indicators */}
              <div className="mt-9 space-y-4">
                <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                    <Camera size={19} className="text-emerald-400" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Continuous Monitoring
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Monitor connected CCTV feeds
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                    <AlertTriangle size={19} className="text-amber-400" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Intelligent Detection
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Detect hazards and PPE violations
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/10">
                    <Mail size={19} className="text-sky-400" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Instant Notifications
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Dashboard and email alerts
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact info */}
              <div className="mt-10 border-t border-white/10 pt-7">
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <Mail size={17} className="text-emerald-400" />
                  <span>Safety monitoring inquiries</span>
                </div>

                <div className="mt-4 flex items-center gap-3 text-sm text-slate-400">
                  <MapPin size={17} className="text-emerald-400" />
                  <span>Industrial & manufacturing environments</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="p-8 sm:p-10 lg:p-12">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Request a Demo
              </h3>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Fill in the details below and tell us what you would like to
                monitor.
              </p>
            </div>

            {submitted ? (
              /* Success State */
              <div className="flex min-h-[430px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                  <CheckCircle2 size={32} />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
                  Request received
                </h3>

                <p className="mt-3 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Thank you for your interest in Vigil. Your request has been
                  recorded successfully.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name + Email */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                    >
                      Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-[#263C31] dark:bg-[#101F18] dark:text-white dark:placeholder:text-slate-600"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-[#263C31] dark:bg-[#101F18] dark:text-white dark:placeholder:text-slate-600"
                    />
                  </div>
                </div>

                {/* Organization */}
                <div>
                  <label
                    htmlFor="organization"
                    className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Organization
                  </label>

                  <input
                    id="organization"
                    name="organization"
                    type="text"
                    placeholder="Company or organization"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-[#263C31] dark:bg-[#101F18] dark:text-white dark:placeholder:text-slate-600"
                  />
                </div>

                {/* Monitoring Requirement */}
                <div>
                  <label
                    htmlFor="requirement"
                    className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                  >
                    What would you like to monitor?
                  </label>

                  <select
                    id="requirement"
                    name="requirement"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-[#263C31] dark:bg-[#101F18] dark:text-white"
                  >
                    <option value="">Select an option</option>
                    <option value="ppe">PPE Compliance</option>
                    <option value="smoke">Smoke Detection</option>
                    <option value="fire">Fire Detection</option>
                    <option value="multiple">Multiple Safety Signals</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Tell us about your safety monitoring requirements..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-[#263C31] dark:bg-[#101F18] dark:text-white dark:placeholder:text-slate-600"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20"
                >
                  Request a Demo
                  <Send
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                <p className="text-center text-xs text-slate-400 dark:text-slate-500">
                  Your information will only be used to respond to your request.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
