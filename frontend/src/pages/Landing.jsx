import { Link } from "react-router-dom";

import AnimatedMark from "../components/AnimatedMark";

const FEATURES = [
  {
    title: "AI Tutor",
    description: "Get instant grammar corrections and practice real conversations with Gemini-powered AI.",
    accent: "from-cyan-400/20 to-cyan-400/0",
    iconColor: "text-cyan-300",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
      />
    ),
  },
  {
    title: "Language Partner Matching",
    description: "Get paired with real learners whose native language is the one you're learning, and vice versa.",
    accent: "from-emerald-400/20 to-emerald-400/0",
    iconColor: "text-emerald-300",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
      />
    ),
  },
  {
    title: "Real-Time Chat",
    description: "Message your language partners instantly, with conversations that sync the moment you hit send.",
    accent: "from-amber-400/20 to-amber-400/0",
    iconColor: "text-amber-300",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.24 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
      />
    ),
  },
  {
    title: "XP System",
    description: "Earn experience for every lesson and message, level up, and watch your progress take shape.",
    accent: "from-rose-400/20 to-rose-400/0",
    iconColor: "text-rose-300",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
      />
    ),
  },
];

function Landing() {
  return (
    <div className="lb-app-bg overflow-hidden">
      <div
        className="lb-glow-orb lb-drift w-[32rem] h-[32rem] -top-40 -left-40 bg-emerald-500/20"
        aria-hidden="true"
      />
      <div
        className="lb-glow-orb lb-drift w-[26rem] h-[26rem] top-32 -right-32 bg-cyan-500/14"
        style={{ animationDelay: "3s" }}
        aria-hidden="true"
      />

      {/* Top bar */}
      <header className="relative z-10 max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <span className="font-display text-lg font-bold tracking-tight">
          <span className="lb-gradient-text">Lingua</span>
          <span className="text-white">Bridge</span>
        </span>

        <div className="flex items-center gap-3">
          <Link to="/login" className="lb-btn-secondary px-5 py-2 text-sm">
            Login
          </Link>
          <Link to="/register" className="lb-btn-primary px-5 py-2 text-sm">
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-24 md:pt-20 md:pb-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-emerald-300/80 uppercase mb-5">
              AI-powered language exchange
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] mb-6">
              Learn Languages Through{" "}
              <span className="lb-gradient-text">Real Conversations</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-lg mb-10 leading-relaxed">
              LinguaBridge pairs you with real language partners and a Gemini-powered AI
              tutor, so every lesson turns into a conversation worth having.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link to="/register" className="lb-btn-primary px-7 py-3.5">
                Get Started
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
              <Link to="/login" className="lb-btn-secondary px-7 py-3.5">
                Login
              </Link>
            </div>
          </div>

          <div className="relative flex items-center justify-center aspect-[4/3]">
            <AnimatedMark size={300} />
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-3">
            Everything you need to learn faster
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            One platform for AI practice, real partners, live chat, and visible progress.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="lb-card lb-card-interactive p-6">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.accent} border border-white/[0.06] flex items-center justify-center mb-4`}
              >
                <svg className={`w-6 h-6 ${feature.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {feature.icon}
                </svg>
              </div>
              <h3 className="font-display text-base font-semibold mb-1.5 text-white">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-24 text-center">
        <div className="lb-card p-10 md:p-14">
          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4">
            Ready to start learning?
          </h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            Create your free account and meet your first language partner today.
          </p>
          <Link to="/register" className="lb-btn-primary px-8 py-3.5 inline-flex">
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Landing;
