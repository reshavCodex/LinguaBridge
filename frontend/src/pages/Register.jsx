import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

import { auth, db } from "../firebase/firebase";
import AnimatedMark from "../components/AnimatedMark";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [nativeLanguage, setNativeLanguage] = useState("");
  const [learningLanguage, setLearningLanguage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      // Create Authentication Account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      // Create Firestore Profile
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        nativeLanguage,
        learningLanguage,
        xp: 0,
        level: 1,
      });

      alert("Registration Successful!");

      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleRegister();
  };

  return (
    <div className="lb-app-bg flex items-center justify-center px-6 py-12">
      <div
        className="lb-glow-orb lb-drift w-[28rem] h-[28rem] -top-32 -right-32 bg-cyan-500/18"
        aria-hidden="true"
      />
      <div
        className="lb-glow-orb lb-drift w-[24rem] h-[24rem] bottom-0 -left-20 bg-emerald-500/16"
        style={{ animationDelay: "3s" }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-4xl grid md:grid-cols-2 lb-card overflow-hidden">
        {/* Visual side */}
        <div className="hidden md:flex flex-col items-center justify-center relative order-2 p-8 bg-gradient-to-br from-[#060f1c] to-[#07241f]">
          <AnimatedMark size={200} />
          <h2 className="font-display text-2xl font-bold text-white mb-2 leading-tight text-center mt-6">
            Start your language exchange today
          </h2>
          <p className="text-sm text-slate-300 text-center">
            Match with partners, practice with AI, and track every step of progress.
          </p>
        </div>

        {/* Form side */}
        <div className="p-8 md:p-10 flex flex-col order-1">
          <Link to="/" className="font-display text-lg font-bold tracking-tight mb-6 w-fit">
            <span className="lb-gradient-text">Lingua</span>
            <span className="text-white">Bridge</span>
          </Link>

          <h1 className="font-display text-2xl font-bold mb-2">Create your account</h1>
          <p className="text-sm text-slate-400 mb-6">
            Join LinguaBridge and meet your first partner.
          </p>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Name</label>
              <input
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/30 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/30 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/30 transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Native Language</label>
                <input
                  type="text"
                  placeholder="e.g. English"
                  value={nativeLanguage}
                  onChange={(e) => setNativeLanguage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/30 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">Learning</label>
                <input
                  type="text"
                  placeholder="e.g. Spanish"
                  value={learningLanguage}
                  onChange={(e) => setLearningLanguage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/30 transition-colors"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleRegister}
            disabled={loading}
            className="lb-btn-primary w-full mb-6 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-[#04140f]/30 border-t-[#04140f] animate-spin" />
                Creating account…
              </>
            ) : (
              "Register"
            )}
          </button>

          <p className="text-sm text-slate-400 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-emerald-300 hover:text-emerald-200 font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
