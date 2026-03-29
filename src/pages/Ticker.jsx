import {
  Flame,
  BarChart2,
  Target,
  BookOpen,
  Bell,
  Trophy,
  Clock,
  Zap,
  Star,
  TrendingUp,
} from "lucide-react";

const ITEMS = [
  { icon: Flame, label: "Daily Streaks" },
  { icon: Clock, label: "Session Tracking" },
  { icon: BarChart2, label: "Deep Insights" },
  { icon: Target, label: "Goal Setting" },
  { icon: BookOpen, label: "Subject Progress" },
  { icon: Bell, label: "Revision Reminders" },
  { icon: TrendingUp, label: "Performance Reports" },
  { icon: Zap, label: "Smart Analytics" },
  { icon: Star, label: "Study Streaks" },
];

const REPEATED = [...ITEMS, ...ITEMS, ...ITEMS];

export default function Ticker() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        padding: "18px 0",
        background: "#1a1a1d",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        /* Subtle inner shadow to give depth like in the image */
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.04), inset 0 -1px 0 rgba(0,0,0,0.4), 0 4px 24px rgba(0,0,0,0.5)",
      }}
    >
      {/* Left fade — matches the image's soft edge blur/fade */}
      <div
        style={{
          pointerEvents: "none",
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 10,
          width: 200,
          background:
            "linear-gradient(to right, #1a1a1d 0%, #1a1a1d 20%, rgba(26,26,29,0.85) 60%, transparent 100%)",
          /* Blur effect on the edges */
          backdropFilter: "blur(0px)",
          WebkitMaskImage:
            "linear-gradient(to right, black 0%, black 30%, transparent 100%)",
        }}
      />

      {/* Right fade */}
      <div
        style={{
          pointerEvents: "none",
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: 10,
          width: 200,
          background:
            "linear-gradient(to left, #1a1a1d 0%, #1a1a1d 20%, rgba(26,26,29,0.85) 60%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to left, black 0%, black 30%, transparent 100%)",
        }}
      />

      {/* Scrolling track */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          width: "max-content",
          animation: "ticker 35s linear infinite",
        }}
      >
        {REPEATED.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="ticker-item"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flexShrink: 0,
                padding: "6px 20px",
                borderRadius: "999px",
                cursor: "pointer",
                transition: "all 0.25s ease",
                /* Ghost/muted background like in the image — each item looks slightly raised */
                background: "rgba(255,255,255,0.03)",
               
                /* Subtle glow shadow under each pill */
                boxShadow:
                  "0 1px 3px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(255,255,255,0.04) inset",
              }}
            >
              <Icon
                size={32}
                strokeWidth={1.5}
                style={{
                  color: "rgba(180,180,190,0.45)",
                  flexShrink: 0,
                  /* Slight blur on icon to match the image's soft look */
                  filter: "blur(0.2px)",
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Sans', 'Sora', sans-serif",
                  fontSize: "16px",
                  fontWeight: 450,
                  letterSpacing: "0.025em",
                  whiteSpace: "nowrap",
                  color: "rgba(200,200,210,0.45)",
                  /* Text shadow to mimic the soft blurred text in the screenshot */
                  textShadow: "0 0 8px rgba(255,255,255,0.08)",
                }}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&display=swap');

        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }

        .ticker-item:hover {
          background: rgba(255,255,255,0.06) !important;
     
          box-shadow: 0 2px 8px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.07) inset !important;
        }

        .ticker-item:hover svg {
          color: rgba(200,200,215,0.75) !important;
          filter: blur(0px) !important;
        }

        .ticker-item:hover span {
          color: rgba(220,220,230,0.75) !important;
          text-shadow: 0 0 12px rgba(255,255,255,0.15) !important;
        }
      `}</style>
    </div>
  );
}