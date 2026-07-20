// Shared animated capsule/egg used by every collection's opening modal.
// Visual differences (egg vs. jeweled capsule, colors, deluxe ring) flow
// entirely from props — no product/collection-name branching.
const SHELL_PATHS = {
  egg: "M 100 10 C 40 10 10 90 10 150 C 10 210 50 250 100 250 C 150 250 190 210 190 150 C 190 90 160 10 100 10 Z",
  capsule: "M 26 24 A 74 74 0 0 1 174 24 L 174 236 A 74 74 0 0 1 26 236 Z",
};

function EggCapsule({ variant = "egg", phase, themeColors, isDeluxe = false }) {
  const shellPath = SHELL_PATHS[variant] || SHELL_PATHS.egg;
  const isShaking = phase === "shaking";
  const isCracking = phase === "cracking";
  const isOpening = phase === "opening" || phase === "revealing" || phase === "completed";
  const isGone = phase === "revealing" || phase === "completed";

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center ${isShaking ? "animate-bb-wobble" : ""}`}
      aria-hidden="true"
    >
      <div
        className={`absolute rounded-full transition-all duration-700 ${
          isOpening ? "w-[240px] h-[240px] opacity-90" : "w-0 h-0 opacity-0"
        }`}
        style={{
          background: `radial-gradient(circle, ${themeColors.soft} 0%, ${themeColors.accent} 45%, transparent 75%)`,
        }}
      />

      <svg
        viewBox="0 0 200 260"
        className={`relative w-full h-full max-w-[220px] max-h-[280px] transition-opacity duration-500 ${
          isGone ? "opacity-0" : "opacity-100"
        }`}
      >
        <defs>
          <clipPath id="bb-top-clip">
            <rect x="0" y="0" width="200" height="130" />
          </clipPath>
          <clipPath id="bb-bottom-clip">
            <rect x="0" y="130" width="200" height="130" />
          </clipPath>
        </defs>

        <g
          clipPath="url(#bb-top-clip)"
          className="transition-transform duration-700 ease-out"
          style={{ transform: isOpening ? "translateY(-58px) rotate(-7deg)" : "translateY(0)" }}
        >
          <path d={shellPath} fill={themeColors.primary} stroke={themeColors.deep} strokeWidth="2" />
        </g>

        <g
          clipPath="url(#bb-bottom-clip)"
          className="transition-transform duration-700 ease-out"
          style={{ transform: isOpening ? "translateY(58px) rotate(7deg)" : "translateY(0)" }}
        >
          <path d={shellPath} fill={themeColors.primary} stroke={themeColors.deep} strokeWidth="2" />
        </g>

        {isCracking && (
          <g className="animate-bb-crack-flash">
            <path
              d="M 68 108 L 84 128 L 74 144 L 100 128 L 90 150 L 128 122"
              fill="none"
              stroke={themeColors.soft}
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        )}

        {isDeluxe && !isGone && (
          <path d={shellPath} fill="none" stroke={themeColors.secondary} strokeWidth="3" opacity="0.85" />
        )}
      </svg>
    </div>
  );
}

export default EggCapsule;
