import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  getDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db, auth } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function Chat() {
  const { currentUser } = useAuth();

  const [searchParams] = useSearchParams();
  const partnerId = searchParams.get("partnerId");

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [partner, setPartner] = useState(null);

  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  // Lightweight lookup so the header can show the partner's name.
  // Display-only - does not affect existing message logic.
  useEffect(() => {
    const fetchPartner = async () => {
      if (!partnerId) return;
      try {
        const partnerSnap = await getDoc(doc(db, "users", partnerId));
        if (partnerSnap.exists()) {
          setPartner(partnerSnap.data());
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPartner();
  }, [partnerId]);

  const awardFirstMessageXP = async () => {
    try {
      const userRef = doc(db, "users", auth.currentUser.uid);

      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) return;

      const userData = userSnap.data();

      if (!userData.firstMessageSent) {
        const currentXP = userData.xp || 0;

        const newXP = currentXP + 20;

        const newLevel = Math.floor(newXP / 100) + 1;

        await updateDoc(userRef, {
          firstMessageSent: true,
          xp: newXP,
          level: newLevel,
        });

        console.log("+20 XP awarded");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allMessages = [];

      snapshot.forEach((doc) => {
        const data = doc.data();

        const isCurrentConversation =
          (data.senderId === currentUser?.uid && data.receiverId === partnerId) ||
          (data.senderId === partnerId && data.receiverId === currentUser?.uid);

        if (isCurrentConversation) {
          allMessages.push(data);
        }
      });

      setMessages(allMessages);
    });

    return () => unsubscribe();
  }, [currentUser, partnerId]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      await addDoc(collection(db, "messages"), {
        senderId: currentUser.uid,
        receiverId: partnerId,
        message: message,
        timestamp: serverTimestamp(),
      });

      await awardFirstMessageXP();

      setMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const initials = partner?.name
    ? partner.name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";

  return (
    <div className="lb-app-bg">
      <Navbar />

      <main className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="lb-card flex flex-col h-[calc(100vh-140px)] overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06] shrink-0">
            <span className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center text-sm font-bold text-[#04140f] shrink-0">
              {initials}
            </span>
            <div className="min-w-0">
              <h1 className="font-display text-base font-semibold text-white truncate">
                {partner?.name || "Conversation"}
              </h1>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                <span className="text-xs text-slate-400">Online</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 md:px-5 py-5 space-y-3">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center px-8">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.4}
                      d="M7.5 8.25h9m-9 3.75h6.75m-9.75 6L4.5 15h-.75A2.25 2.25 0 011.5 12.75v-6A2.25 2.25 0 013.75 4.5h16.5a2.25 2.25 0 012.25 2.25v6a2.25 2.25 0 01-2.25 2.25H8.25l-3.75 4.5z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-slate-500 max-w-xs">
                  No messages yet — say hello to start the conversation.
                </p>
              </div>
            )}

            {messages.map((msg, index) => {
              const isMine = msg.senderId === currentUser.uid;
              return (
                <div key={index} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      isMine
                        ? "bg-gradient-to-r from-emerald-500/90 to-cyan-500/90 text-[#04140f] font-medium rounded-br-md"
                        : "bg-white/[0.06] border border-white/[0.06] text-slate-100 rounded-bl-md"
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              );
            })}

            <div ref={scrollRef} />
          </div>

          {/* Input */}
          <div className="px-4 md:px-5 py-4 border-t border-white/[0.06] flex items-center gap-3 shrink-0">
            <input
              type="text"
              placeholder="Type a message…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/30 transition-colors"
            />
            <button
              onClick={sendMessage}
              disabled={!message.trim()}
              className="lb-btn-primary px-5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
              aria-label="Send message"
            >
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Chat;
