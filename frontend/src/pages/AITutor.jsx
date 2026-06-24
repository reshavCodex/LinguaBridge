import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { auth, db } from "../firebase/firebase";
import { doc, updateDoc, increment, getDoc } from "firebase/firestore";

import Navbar from "../components/Navbar";

function AITutor() {
  const [sentence, setSentence] = useState("");
  const [grammarResult, setGrammarResult] = useState("");
  const [checkingGrammar, setCheckingGrammar] = useState(false);

  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [aiTyping, setAiTyping] = useState(false);

  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [chatMessages, aiTyping]);

  const addXP = async (amount) => {
    try {
      const userRef = doc(db, "users", auth.currentUser.uid);

      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) return;

      const currentXP = userSnap.data().xp || 0;

      const newXP = currentXP + amount;

      const newLevel = Math.floor(newXP / 100) + 1;

      await updateDoc(userRef, {
        xp: increment(amount),
        level: newLevel,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const checkGrammar = async () => {
    if (!sentence.trim()) return;

    setCheckingGrammar(true);

    try {
      const response = await axios.post("https://linguabridge-d46f.onrender.com/grammar", {
        text: sentence,
      });

      setGrammarResult(response.data.result);

      await addXP(10);
    } catch (error) {
      console.error(error);
    } finally {
      setCheckingGrammar(false);
    }
  };

  const sendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage = {
      sender: "user",
      text: chatInput,
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");
    setAiTyping(true);

    try {
      const response = await axios.post("https://linguabridge-d46f.onrender.com/chat", {
        message: chatInput,
      });

      const aiMessage = {
        sender: "ai",
        text: response.data.reply,
      };

      setChatMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setAiTyping(false);
    }
  };

  const handleChatKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const handleGrammarKeyDown = (e) => {
    if (e.key === "Enter") checkGrammar();
  };

  return (
    <div className="lb-app-bg">
      <div
        className="lb-glow-orb lb-drift w-[26rem] h-[26rem] -top-32 -right-20 bg-cyan-500/16"
        aria-hidden="true"
      />
      <div
        className="lb-glow-orb lb-drift w-[22rem] h-[22rem] bottom-0 -left-20 bg-emerald-500/14"
        style={{ animationDelay: "4s" }}
        aria-hidden="true"
      />

      <Navbar />

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-emerald-300/80 uppercase mb-3">
            Powered by Gemini
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            AI <span className="lb-gradient-text">Tutor</span>
          </h1>
          <p className="text-slate-400">
            Practice grammar and hold real conversations, anytime you like.
          </p>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,380px)_1fr] gap-6 items-start">
          {/* Grammar Section */}
          <section className="lb-card p-6 lg:sticky lg:top-24">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400/20 to-emerald-400/0 border border-white/[0.06] flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.6}
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="font-display text-lg font-semibold">Grammar Check</h2>
            </div>

            <label className="block text-sm text-slate-400 mb-2">Enter a sentence</label>
            <input
              type="text"
              placeholder="e.g. She don't like coffee"
              value={sentence}
              onChange={(e) => setSentence(e.target.value)}
              onKeyDown={handleGrammarKeyDown}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/30 transition-colors mb-4"
            />

            <button
              onClick={checkGrammar}
              disabled={checkingGrammar || !sentence.trim()}
              className="lb-btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
            >
              {checkingGrammar ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-[#04140f]/30 border-t-[#04140f] animate-spin" />
                  Checking…
                </>
              ) : (
                "Check Grammar"
              )}
            </button>

            {grammarResult && (
              <div className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300/80 mb-2">
                  Result
                </p>
                <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {grammarResult}
                </p>
              </div>
            )}
          </section>

          {/* Conversation Section */}
          <section className="lb-card flex flex-col h-[640px]">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.06]">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400/20 to-cyan-400/0 border border-white/[0.06] flex items-center justify-center">
                <svg className="w-5 h-5 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.6}
                    d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.24 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="font-display text-lg font-semibold leading-tight">
                  Conversation Practice
                </h2>
                <p className="text-xs text-slate-500">Chat naturally, in your target language</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {chatMessages.length === 0 && !aiTyping && (
                <div className="h-full flex flex-col items-center justify-center text-center px-8">
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.4}
                        d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.24 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-slate-500 max-w-xs">
                    Say hello to start practicing — your AI tutor is ready to chat.
                  </p>
                </div>
              )}

              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-emerald-500/90 to-cyan-500/90 text-[#04140f] font-medium rounded-br-md"
                        : "bg-white/[0.06] border border-white/[0.06] text-slate-100 rounded-bl-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {aiTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.06] border border-white/[0.06] rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                  </div>
                </div>
              )}

              <div ref={scrollRef} />
            </div>

            {/* Input */}
            <div className="px-6 py-4 border-t border-white/[0.06] flex items-center gap-3">
              <input
                type="text"
                placeholder="Type a message…"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={handleChatKeyDown}
                className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-colors"
              />
              <button
                onClick={sendMessage}
                disabled={!chatInput.trim()}
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
          </section>
        </div>
      </main>
    </div>
  );
}

export default AITutor;
