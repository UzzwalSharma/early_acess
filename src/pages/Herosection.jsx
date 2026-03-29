import { motion, useReducedMotion } from "framer-motion";
import { Link, Element } from "react-scroll";

const AVATARS = [
  "https://i.pravatar.cc/40?img=11",
  "https://i.pravatar.cc/40?img=22",
  "https://i.pravatar.cc/40?img=33",
  "https://i.pravatar.cc/40?img=44",
  "https://i.pravatar.cc/40?img=55",
];

function IPhoneFrame({ src, alt, width }) {
  const height = width * 2.16;
  const radius = width * 0.12;
  const bezel = width * 0.035;

  return (
    <div
      style={{
        width,
        height,
        borderRadius: radius,
        background: "#1a1a1d",
        padding: bezel,
        boxShadow: `
        0 0 0 ${bezel * 0.6}px #3a3a3f,
        0 40px 100px rgba(0,0,0,0.95),
        0 0 0 ${bezel * 1.4}px #222226,
        inset 0 1px 0 rgba(255,255,255,0.09)
      `,
        position: "relative",
        flexShrink: 0,
      }}
    >
      {/* Screen */}
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: radius - bezel,
          overflow: "hidden",
          background: "#0a0a14",
          position: "relative",
        }}
      >
        {/* Dynamic Island */}
        <div
          style={{
            position: "absolute",
            top: "1.8%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "30%",
            height: "3.2%",
            background: "#0f0f0f",
            borderRadius: 999,
            zIndex: 10,
          }}
        />

        {/* Screenshot */}
        <img
          src={src}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />

        {/* Shimmer sweep */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 20,
            background:
              "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.045) 50%, transparent 65%)",
            pointerEvents: "none",
          }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeInOut",
          }}
        />

        {/* Static glare */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.035) 0%, transparent 45%)",
            pointerEvents: "none",
            borderRadius: radius - bezel,
          }}
        />
      </div>

      {/* Power button */}
      <div
        style={{
          position: "absolute",
          right: -bezel * 1.1,
          top: "22%",
          width: bezel * 1.1,
          height: "10%",
          background: "#2a2a2e",
          borderRadius: "0 3px 3px 0",
        }}
      />
      {/* Volume buttons */}
      {[
        ["15%", "7%"],
        ["24%", "7%"],
      ].map(([top, h], i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: -bezel * 1.1,
            top,
            width: bezel * 1.1,
            height: h,
            background: "#2a2a2e",
            borderRadius: "3px 0 0 3px",
          }}
        />
      ))}
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (d) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  const reduced = useReducedMotion();

  const phones = [
    {
      src: "/images/first.png",
      alt: "PrepMate streak screen",
      width: 180,
      delay: 0.55,
      rotate: -12,
      yOffset: 80,
    },
    {
      src: "/images/second.png",
      alt: "PrepMate dashboard screen",
      width: 260,
      delay: 0.35,
      rotate: 0,
      yOffset: 20,
    },
    {
      src: "/images/third.png",
      alt: "PrepMate subjects screen",
      width: 180,
      delay: 0.55,
      rotate: 12,
      yOffset: 80,
    },
  ];

  return (
    <Element name="hero">
      <section
        className="relative w-full overflow-hidden flex flex-col font-dm"
      style={{
        background: `
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          #0e0e11
        `,
        backgroundSize: "50px 50px",
        minHeight: "100vh",
      }}
    >
 

{/* ── Top Left Purple Orb ── */}
<motion.div
  className="pointer-events-none absolute"
  style={{
    width: 520,
    height: 520,
    borderRadius: "50%",
    background:
      "radial-gradient(circle at 40% 40%, rgba(192,132,252,1) 0%, rgba(168,85,247,0.85) 25%, rgba(124,58,237,0.55) 50%, rgba(109,40,217,0.2) 70%, transparent 85%)",
    left: "-160px",
    top: "-120px",
    filter: "blur(28px)",
  }}
  animate={
    reduced ? {} : {
      y: [0, -22, 0],
      x: [0, 10, 0],
      opacity: [0.75, 1, 0.75],
      scale: [1, 1.06, 1],
    }
  }
  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
/>

{/* ── Bottom Right Blue Orb ── */}
<motion.div
  className="pointer-events-none absolute"
  style={{
    width: 560,
    height: 560,
    borderRadius: "50%",
    background:
      "radial-gradient(circle at 40% 40%, rgba(96,165,250,0.85) 0%, rgba(59,130,246,0.65) 25%, rgba(37,99,235,0.35) 50%, rgba(29,78,216,0.12) 70%, transparent 85%)",
    right: "-190px",
    bottom: "-160px",
    filter: "blur(32px)",
  }}
  animate={
    reduced ? {} : {
      y: [0, 28, 0],
      x: [0, -12, 0],
      opacity: [0.6, 0.9, 0.6],
      scale: [1, 1.05, 1],
    }
  }
  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
/>

      {/* ── Top vignette ── */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 z-10"
        style={{
          height: "28%",
          background: "linear-gradient(to bottom, #080808 15%, transparent)",
        }}
      />

      {/* ── Navbar ── */}
      <motion.nav
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative z-50 flex items-center justify-center px-6 md:px-14 py-4"
      >
        <div className="absolute left-6 md:left-14">
          <span className="font-syne font-extrabold text-white text-[17px] tracking-tight">
            PrepMate
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {["features", "reviews", "download", "about"].map((item) => (
            <Link
              key={item}
              to={item}
              smooth={true}
              duration={500}
              className="text-white/50 hover:text-white/85 text-sm font-medium transition-colors duration-150 cursor-pointer"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          ))}
        </div>

        <div className="absolute right-6 md:right-14 flex items-center gap-3">
          <Link
            to="reviews"
            smooth={true}
            duration={500}
            className="hidden md:block text-white/50 hover:text-white/85 text-sm font-medium transition-colors cursor-pointer"
          >
            Leave a review
          </Link>
          <Link
            to="download"
            smooth={true}
            duration={500}
            className="flex items-center gap-1.5 text-white text-sm font-semibold px-5 py-2 rounded-sm transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            style={{
              background: "linear-gradient(135deg,#7c3aed,#5b21b6)",
              boxShadow: "0 4px 16px rgba(124,58,237,0.35)",
            }}
          >
            Get the app <span>→</span>
          </Link>
        </div>
      </motion.nav>

      {/* ── Hero text ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 pt-6 md:pt-6">
        {/* Badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="inline-flex items-center gap-2.5 mb-4"
        >
          <span
            className="text-white/60 text-xs font-black px-3 py-1.5 rounded-full border border-white/10"
            style={{
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(8px)",
            }}
          >
            🎉 Early access — completely free
          </span>
        </motion.div>

        {/* Beta Limited Badge */}
        <motion.div 
          custom={0.05} 
          variants={fadeUp} 
          initial="hidden" 
          animate="show" 
          className="inline-flex items-center gap-2.5 mb-6"
        >
          <span
            className="text-amber-400 text-xs font-black px-3 py-1.5 rounded-full border border-amber-500/30"
            style={{
              background: "rgba(251,146,60,0.1)",
              backdropFilter: "blur(8px)",
            }}
          >
            ⚡ Beta Version — Only 10 spots available
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={0.1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="roboto text-white leading-[1.05] tracking-tight"
          style={{ fontSize: "clamp(2.4rem, 6vw, 4.2rem)", maxWidth: 720 }}
        >
          Study Smarter,{" "}
          <span
            style={{
              background:
                "linear-gradient(120deg, #a78bfa 0%, #7c3aed 45%, #22d3ee 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Score Higher
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          custom={0.18}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-5 font-lighter text-white/40 leading-relaxed"
          style={{ fontSize: "clamp(0.88rem, 1.8vw, 1rem)", maxWidth: 460 }}
        >
          PrepMate tracks your study sessions, builds daily streaks, and gives
          you deep insights so every hour you put in actually counts.
        </motion.p>

        {/* Buttons */}
        <motion.div
          custom={0.26}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            to="download"
            smooth={true}
            duration={500}
            className="flex items-center gap-2 text-white semibold font-dm px-6 py-3 rounded-sm text-sm transition-all duration-200 hover:scale-105 active:scale-95 tracking-wider cursor-pointer"
            style={{
              background: "linear-gradient(135deg,#7c3aed,#5b21b6)",
              boxShadow: "0 6px 28px rgba(124,58,237,0.45)",
            }}
          >
            Download APK <span>→</span>
          </Link>
          <Link
            to="features"
            smooth={true}
            duration={500}
            className="flex items-center gap-2 text-black semibold font-dm px-6 py-3 hover:animate-pulse rounded-md transition-all duration-200 border border-white/10 hover:border-white/20 cursor-pointer"
            style={{ background: "white" }}
          >
            See features
          </Link>
        </motion.div>

        {/* Social proof - Spots Available Badge */}
        <motion.div
          custom={0.34}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-10 flex items-center gap-3"
        >
          {/* Live Count Badge */}
          <div 
            className="flex items-center gap-2 px-4 py-2 rounded-full border"
            style={{
              background: "rgba(34,211,238,0.1)",
              border: "1px solid rgba(34,211,238,0.3)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22d3ee", animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }} />
            <span className="text-cyan-300 text-sm font-semibold">
              <span style={{ color: "#fff" }}>7 of 10</span> spots available
            </span>
          </div>

          {/* Urgency message */}
          <span className="text-amber-400/80 text-xs font-black animate-pulse">
            ⚡ Limited spots • Join now
          </span>
        </motion.div>

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </div>

      {/* ── Three iPhones ── */}
      <div className="relative z-10 flex items-end justify-center mt-16 md:mt-20 px-4">
        {phones.map((phone, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 70, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 1.15,
              delay: phone.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              transform: `rotate(${phone.rotate}deg)`,
              transformOrigin: "bottom center",
              marginBottom: phone.yOffset,
              zIndex: i === 1 ? 20 : 10,
              marginLeft: i === 0 ? -12 : i === 2 ? -12 : -28,
              marginRight: i === 0 ? -12 : i === 2 ? -12 : -28,
            }}
          >
            <IPhoneFrame src={phone.src} alt={phone.alt} width={phone.width} />
          </motion.div>
        ))}
      </div>

      {/* ── Bottom fade with blend to ticker ── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-30"
        style={{
          height: "45%",
          background:
            "linear-gradient(to top, #1a1a1d 0%, #1a1a1d 25%, rgba(26,26,29,0.7) 50%, transparent 100%)",
        }}
      />

      {/* Footer caption */}
      <motion.p
        custom={1.0}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center font-dm text-white/20 text-sm mt-8"
      >
        Join students already building better study habits with PrepMate.
      </motion.p>
    </section>
    </Element>
  );
}