/* ============================================================
   AnimatedMark
   A pure CSS/SVG recreation of the LinguaBridge brand mark:
   two overlapping speech bubbles (cyan circle behind,
   emerald rounded-square in front, three dots inside the
   front bubble). Used to fill visual panels on Landing,
   Login, and Register instead of a static photo.
   ============================================================ */

function AnimatedMark({ size = 280 }) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <div className="lb-mark-glow lb-mark-glow-cyan" />
      <div className="lb-mark-glow lb-mark-glow-emerald" />

      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        className="relative z-10 lb-mark-float"
      >
        {/* Back bubble - cyan circle with speech tail, bottom-left */}
        <g className="lb-mark-cyan">
          <circle
            cx="86"
            cy="92"
            r="46"
            fill="none"
            strokeWidth="6"
            className="lb-mark-stroke lb-mark-circle"
            style={{ animationDelay: "0s" }}
          />
          <polyline
            points="56,128 50,150 76,136"
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lb-mark-stroke lb-mark-tail"
            style={{ animationDelay: "0.9s" }}
          />
        </g>

        {/* Front bubble - emerald rounded square with speech tail, bottom-right */}
        <g className="lb-mark-emerald">
          <rect
            x="92"
            y="58"
            width="62"
            height="62"
            rx="16"
            fill="none"
            strokeWidth="6"
            className="lb-mark-stroke lb-mark-square"
            style={{ animationDelay: "0.5s" }}
          />
          <polyline
            points="118,120 118,144 138,122"
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lb-mark-stroke lb-mark-tail"
            style={{ animationDelay: "1.3s" }}
          />
        </g>

        {/* Three dots inside the front bubble */}
        <g className="lb-mark-dots">
          <circle cx="111" cy="89" r="3.6" className="lb-mark-dot" style={{ animationDelay: "1.7s" }} />
          <circle cx="123" cy="89" r="3.6" className="lb-mark-dot" style={{ animationDelay: "1.85s" }} />
          <circle cx="135" cy="89" r="3.6" className="lb-mark-dot" style={{ animationDelay: "2s" }} />
        </g>
      </svg>
    </div>
  );
}

export default AnimatedMark;
