import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";

import { auth } from "../firebase/firebase";

const NAV_LINKS = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "AI Tutor", path: "/ai-tutor" },
  { label: "Find Partners", path: "/partners" },
  { label: "Messages", path: "/chat" },
  { label: "Profile", path: "/profile" },
];

function Navbar({ userData }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const initials = userData?.name
    ? userData.name
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#060f1c]/70 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 shrink-0"
        >
          <span className="font-display text-lg font-bold tracking-tight">
            <span className="lb-gradient-text">Lingua</span>
            <span className="text-white">Bridge</span>
          </span>
        </button>

        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full px-1.5 py-1.5">
          {NAV_LINKS.map((link) => {
            const active = location.pathname === link.path;
            return (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                  active
                    ? "text-[#04140f] bg-gradient-to-r from-emerald-400 to-cyan-400"
                    : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Avatar + dropdown */}
        <div className="relative shrink-0" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 rounded-full pl-1.5 pr-3 py-1.5 border border-white/[0.08] bg-white/[0.03] hover:border-emerald-400/40 transition-colors duration-200"
          >
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center text-xs font-bold text-[#04140f]">
              {initials}
            </span>
            <svg
              className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                menuOpen ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 lb-card py-1.5 shadow-2xl">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/profile");
                }}
                className="w-full text-left px-4 py-2.5 text-sm text-slate-200 hover:bg-white/[0.06] transition-colors"
              >
                View Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2.5 text-sm text-red-300 hover:bg-red-500/10 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile nav toggle - simple horizontal scroll fallback */}
      </div>

      {/* Mobile nav row */}
      <nav className="md:hidden flex items-center gap-2 px-6 pb-3 overflow-x-auto">
        {NAV_LINKS.map((link) => {
          const active = location.pathname === link.path;
          return (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`shrink-0 px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors duration-200 ${
                active
                  ? "text-[#04140f] bg-gradient-to-r from-emerald-400 to-cyan-400"
                  : "text-slate-300 bg-white/[0.04] border border-white/[0.06]"
              }`}
            >
              {link.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}

export default Navbar;
