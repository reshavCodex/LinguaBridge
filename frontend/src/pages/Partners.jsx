import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function Partners() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [currentUserData, setCurrentUserData] = useState(null);
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    if (currentUser) {
      findPartners();
    }
  }, [currentUser]);

  const findPartners = async () => {
    try {
      // Get current user profile
      const usersSnapshot = await getDocs(collection(db, "users"));

      let currentProfile = null;
      const allUsers = [];

      usersSnapshot.forEach((doc) => {
        const data = doc.data();

        if (data.uid === currentUser.uid) {
          currentProfile = data;
        }

        allUsers.push(data);
      });

      setCurrentUserData(currentProfile);

      // Match users
      const matchedUsers = allUsers.filter(
        (user) =>
          user.uid !== currentUser.uid &&
          user.nativeLanguage === currentProfile.learningLanguage &&
          user.learningLanguage === currentProfile.nativeLanguage
      );

      setPartners(matchedUsers);
    } catch (error) {
      console.error(error);
    }
  };

  if (!currentUserData) {
    return (
      <div className="lb-app-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-emerald-400/30 border-t-emerald-400 animate-spin" />
          <p className="text-slate-400 text-sm">Finding your partners…</p>
        </div>
      </div>
    );
  }

  const initials = (name) =>
    name
      ? name
          .split(" ")
          .map((p) => p[0])
          .slice(0, 2)
          .join("")
          .toUpperCase()
      : "?";

  return (
    <div className="lb-app-bg">
      <div
        className="lb-glow-orb lb-drift w-[26rem] h-[26rem] -top-32 -right-20 bg-emerald-500/16"
        aria-hidden="true"
      />

      <Navbar userData={currentUserData} />

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-emerald-300/80 uppercase mb-3">
            Find Partners
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
            Language <span className="lb-gradient-text">Partners</span>
          </h1>
          <p className="text-slate-400 flex items-center gap-2 flex-wrap">
            <span>Your languages:</span>
            <span className="inline-flex items-center gap-1.5 text-slate-200 font-medium">
              {currentUserData.nativeLanguage}
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
              {currentUserData.learningLanguage}
            </span>
          </p>
        </div>

        {partners.length === 0 ? (
          <div className="lb-card p-12 text-center">
            <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.4}
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
            </div>
            <h3 className="font-display text-lg font-semibold mb-2">No matching partners yet</h3>
            <p className="text-slate-400 text-sm max-w-sm mx-auto">
              Check back soon — new learners join LinguaBridge every day.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {partners.map((partner) => (
              <div key={partner.uid} className="lb-card lb-card-interactive p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center text-sm font-bold text-[#04140f] shrink-0">
                    {initials(partner.name)}
                  </span>
                  <h2 className="font-display text-lg font-semibold text-white truncate">
                    {partner.name}
                  </h2>
                </div>

                <div className="space-y-2.5 mb-6 flex-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Native</span>
                    <span className="text-slate-200 font-medium">{partner.nativeLanguage}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Learning</span>
                    <span className="text-slate-200 font-medium">{partner.learningLanguage}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/chat?partnerId=${partner.uid}`)}
                  className="lb-btn-primary w-full"
                >
                  Start Chat
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Partners;
