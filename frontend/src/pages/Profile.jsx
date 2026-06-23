import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function Profile() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (currentUser) {
      fetchProfile();
    }
  }, [currentUser]);

  const fetchProfile = async () => {
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

  if (!currentUser) {
    return (
      <div className="lb-app-bg flex items-center justify-center">
        <div className="lb-card px-8 py-10 text-center max-w-sm">
          <h2 className="font-display text-xl font-semibold mb-2">Please log in</h2>
          <p className="text-slate-400 text-sm mb-6">
            You need an active session to view your profile.
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
          <p className="text-slate-400 text-sm">Loading your profile…</p>
        </div>
      </div>
    );
  }

  const initials = userData.name
    ? userData.name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  const progress = (userData.xp || 0) % 100;

  const details = [
    { label: "Email", value: userData.email },
    { label: "Native Language", value: userData.nativeLanguage },
    { label: "Learning Language", value: userData.learningLanguage },
  ];

  return (
    <div className="lb-app-bg">
      <div
        className="lb-glow-orb lb-drift w-[26rem] h-[26rem] -top-32 -left-20 bg-cyan-500/16"
        aria-hidden="true"
      />

      <Navbar userData={userData} />

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-10">
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-emerald-300/80 uppercase mb-3">
            Your Account
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold">
            <span className="lb-gradient-text">Profile</span>
          </h1>
        </div>

        <div className="grid md:grid-cols-[280px_1fr] gap-6">
          {/* Identity card */}
          <section className="lb-card p-8 flex flex-col items-center text-center">
            <span className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center text-3xl font-bold text-[#04140f] mb-5">
              {initials}
            </span>
            <h2 className="font-display text-xl font-semibold text-white mb-1">
              {userData.name}
            </h2>
            <p className="text-sm text-slate-500 mb-6">{userData.email}</p>

            <div className="w-full pt-6 border-t border-white/[0.06]">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-400">Level {userData.level || 1}</span>
                <span className="text-slate-500">{progress}/100 XP</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="lb-progress-fill h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </section>

          {/* Details + stats */}
          <div className="flex flex-col gap-6">
            <section className="lb-card p-6 md:p-7">
              <h3 className="font-display text-base font-semibold mb-5 text-white">
                Account Details
              </h3>
              <dl className="divide-y divide-white/[0.06]">
                {details.map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-3.5">
                    <dt className="text-sm text-slate-500">{item.label}</dt>
                    <dd className="text-sm font-medium text-slate-200">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="grid grid-cols-2 gap-4">
              <div className="lb-card p-6">
                <h3 className="text-slate-400 text-xs font-medium uppercase tracking-wide">XP</h3>
                <p className="font-display text-2xl font-semibold mt-2 lb-gradient-text">
                  {userData.xp || 0}
                </p>
              </div>
              <div className="lb-card p-6">
                <h3 className="text-slate-400 text-xs font-medium uppercase tracking-wide">
                  Level
                </h3>
                <p className="font-display text-2xl font-semibold mt-2 text-white">
                  {userData.level || 1}
                </p>
              </div>
            </section>

            <button
              onClick={() => navigate("/dashboard")}
              className="lb-btn-secondary self-start px-6"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Dashboard
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
