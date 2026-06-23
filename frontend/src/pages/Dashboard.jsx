import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { auth, db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import bgImage from "../assets/linguabridge-bg.png";

function Dashboard() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (currentUser) {
      fetchUserData();
    }
  }, [currentUser]);

  const fetchUserData = async () => {
    try {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  if (!currentUser) {
    return (
      <div className="lb-app-bg flex items-center justify-center">
        <div className="lb-card px-8 py-10 text-center max-w-sm">
          <h2 className="font-display text-xl font-semibold mb-2">Please log in</h2>
          <p className="text-slate-400 text-sm mb-6">
            You need an active session to view your dashboard.
          </p>
          <button onClick={() => navigate("/login")} className="lb-btn-primary w-full">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="lb-app-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-emerald-400/30 border-t-emerald-400 animate-spin" />
          <p className="text-slate-400 text-sm">Loading your dashboard…</p>
        </div>
      </div>
    );
  }

  const xp = userData.xp || 0;
  const level = userData.level || 1;
  const progress = xp % 100;

  const quickActions = [
    {
      title: "AI Tutor",
      description: "Practice grammar and conversations with AI.",
      path: "/ai-tutor",
      glow: "from-cyan-400/20 to-cyan-400/0",
      ring: "hover:border-cyan-400/40",
      icon: (
        <svg className="w-6 h-6 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.6}
            d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
          />
        </svg>
      ),
    },
    {
      title: "Find Partners",
      description: "Connect with real language learners.",
      path: "/partners",
      glow: "from-emerald-400/20 to-emerald-400/0",
      ring: "hover:border-emerald-400/40",
      icon: (
        <svg className="w-6 h-6 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.6}
            d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
          />
        </svg>
      ),
    },
    {
      title: "Profile",
      description: "View your learning information.",
      path: "/profile",
      glow: "from-amber-400/20 to-amber-400/0",
      ring: "hover:border-amber-400/40",
      icon: (
        <svg className="w-6 h-6 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.6}
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      title: "Logout",
      description: "Sign out of your account.",
      action: handleLogout,
      glow: "from-rose-400/20 to-rose-400/0",
      ring: "hover:border-rose-400/40",
      icon: (
        <svg className="w-6 h-6 text-rose-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.6}
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="lb-app-bg">
      {/* Ambient glows */}
      <div
        className="lb-glow-orb lb-drift w-[28rem] h-[28rem] -top-32 -left-32 bg-emerald-500/20"
        aria-hidden="true"
      />
      <div
        className="lb-glow-orb lb-drift w-[24rem] h-[24rem] top-40 right-0 bg-cyan-500/14"
        style={{ animationDelay: "3s" }}
        aria-hidden="true"
      />

      <Navbar userData={userData} />

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        {/* Hero */}
        <section
          className="lb-card relative overflow-hidden p-8 md:p-12 mb-8"
          style={{
            backgroundImage: `linear-gradient(120deg, rgba(6,15,28,0.88), rgba(7,36,31,0.82)), url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "left center",
          }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] text-emerald-300/80 uppercase mb-4">
            Your learning space
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Hello, <span className="lb-gradient-text">{userData.name}</span>
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-xl">
            Connect with language partners, practice with AI, and grow your language skills.
          </p>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="lb-card p-5 md:p-6">
            <h3 className="text-slate-400 text-xs font-medium uppercase tracking-wide">
              Native Language
            </h3>
            <p className="font-display text-lg md:text-xl font-semibold mt-2 text-white">
              {userData.nativeLanguage}
            </p>
          </div>

          <div className="lb-card p-5 md:p-6">
            <h3 className="text-slate-400 text-xs font-medium uppercase tracking-wide">
              Learning
            </h3>
            <p className="font-display text-lg md:text-xl font-semibold mt-2 text-white">
              {userData.learningLanguage}
            </p>
          </div>

          <div className="lb-card p-5 md:p-6">
            <h3 className="text-slate-400 text-xs font-medium uppercase tracking-wide">XP</h3>
            <p className="font-display text-lg md:text-xl font-semibold mt-2 lb-gradient-text">
              {xp}
            </p>
          </div>

          <div className="lb-card p-5 md:p-6">
            <h3 className="text-slate-400 text-xs font-medium uppercase tracking-wide">Level</h3>
            <p className="font-display text-lg md:text-xl font-semibold mt-2 text-white">
              {level}
            </p>
          </div>
        </section>

        {/* XP Progress */}
        <section className="lb-card p-6 md:p-7 mb-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-slate-200">Level Progress</span>
            <span className="text-sm text-slate-400">{progress}/100 XP</span>
          </div>

          <div className="w-full h-3 rounded-full bg-white/[0.06] overflow-hidden">
            <div
              className="lb-progress-fill h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>

        {/* Quick Actions */}
        <h2 className="font-display text-xl md:text-2xl font-semibold mb-5">Quick Actions</h2>

        <section className="grid md:grid-cols-2 gap-5">
          {quickActions.map((item) => (
            <div
              key={item.title}
              onClick={item.action ? item.action : () => navigate(item.path)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  item.action ? item.action() : navigate(item.path);
                }
              }}
              className={`lb-card lb-card-interactive cursor-pointer p-6 ${item.ring}`}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.glow} border border-white/[0.06] flex items-center justify-center mb-4`}
              >
                {item.icon}
              </div>
              <h3 className="font-display text-lg font-semibold mb-1.5 text-white">
                {item.title}
              </h3>
              <p className="text-sm text-slate-400">{item.description}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
