import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

import { auth } from "../firebase/firebase";
import AnimatedMark from "../components/AnimatedMark";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);

      alert("Login Successful!");

      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="lb-app-bg flex items-center justify-center px-6 py-12">
      <div
        className="lb-glow-orb lb-drift w-[28rem] h-[28rem] -top-32 -left-32 bg-emerald-500/20"
        aria-hidden="true"
      />
      <div
        className="lb-glow-orb lb-drift w-[24rem] h-[24rem] bottom-0 -right-20 bg-cyan-500/14"
        style={{ animationDelay: "3s" }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-4xl grid md:grid-cols-2 lb-card overflow-hidden">
        {/* Visual side */}
        <div className="hidden md:flex flex-col items-center justify-center relative p-8 bg-gradient-to-br from-[#07241f] to-[#060f1c]">
          <AnimatedMark size={200} />
          <h2 className="font-display text-2xl font-bold text-white mb-2 leading-tight text-center mt-6">
            Welcome back to your language journey
          </h2>
          <p className="text-sm text-slate-300 text-center">
            Pick up where you left off with your partners and AI tutor.
          </p>
        </div>

        {/* Form side */}
        <div className="p-8 md:p-10 flex flex-col">
          <Link to="/" className="font-display text-lg font-bold tracking-tight mb-8 w-fit">
            <span className="lb-gradient-text">Lingua</span>
            <span className="text-white">Bridge</span>
          </Link>

          <h1 className="font-display text-2xl font-bold mb-2">Log in</h1>
          <p className="text-sm text-slate-400 mb-8">
            Enter your details to continue learning.
          </p>

          <label className="block text-sm text-slate-400 mb-2">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/30 transition-colors mb-5"
          />

          <label className="block text-sm text-slate-400 mb-2">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/30 transition-colors mb-7"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="lb-btn-primary w-full mb-6 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-[#04140f]/30 border-t-[#04140f] animate-spin" />
                Logging in…
              </>
            ) : (
              "Login"
            )}
          </button>

          <p className="text-sm text-slate-400 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-emerald-300 hover:text-emerald-200 font-medium">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
