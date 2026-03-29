import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Element } from "react-scroll";

function IPhoneFrame({ src, alt, width = 220 }) {
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
            e.currentTarget.style.background = "#12121a";
            e.currentTarget.style.display = "none";
            // Show placeholder
            e.currentTarget.parentElement.style.background = "linear-gradient(160deg, #1a1a2e 0%, #16213e 50%, #0f0f1a 100%)";
          }}
        />
        {/* Shimmer */}
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
          transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 45%)",
            pointerEvents: "none",
            borderRadius: radius - bezel,
          }}
        />
      </div>
      {/* Power button */}
      <div style={{ position: "absolute", right: -bezel * 1.1, top: "22%", width: bezel * 1.1, height: "10%", background: "#2a2a2e", borderRadius: "0 3px 3px 0" }} />
      {[["15%", "7%"], ["24%", "7%"]].map(([top, h], i) => (
        <div key={i} style={{ position: "absolute", left: -bezel * 1.1, top, width: bezel * 1.1, height: h, background: "#2a2a2e", borderRadius: "3px 0 0 3px" }} />
      ))}
    </div>
  );
}

const FEATURES = [
  {
    index: "01",
    tag: "Track Progress",
    title: "Daily Study Streaks",
    description:
      "Stay consistent with adaptive streak tracking that learns your schedule. PrepMate sends smart reminders before your streak breaks, and rewards milestones with unlockable themes.",
    bullets: ["Adaptive notifications", "Milestone rewards", "Weekly consistency reports"],
    accent: "#a78bfa",
    accentDim: "rgba(167,139,250,0.12)",
    gradientFrom: "rgba(124,58,237,0.18)",
    gradientTo: "rgba(6,182,212,0.06)",
    phone: { src: "/images/streak.png", alt: "Streak screen" },
    side: "right", // phone on right, text on left
  },
  {
    index: "02",
    tag: "Deep Analytics",
    title: "Subject-wise Insights",
    description:
      "See exactly where your time goes. Interactive charts break down hours by subject, topic, and session type — so you can double down on weak spots and stop over-studying strengths.",
    bullets: ["Interactive bar charts", "Topic heat maps", "Study efficiency score"],
    accent: "#22d3ee",
    accentDim: "rgba(34,211,238,0.12)",
    gradientFrom: "rgba(6,182,212,0.18)",
    gradientTo: "rgba(124,58,237,0.06)",
    phone: { src: "/images/growth.png", alt: "Dashboard screen" },
    side: "left", // phone on left, text on right
  },
  {
    index: "03",
    tag: "Growth Tracking",
    title: "Track Your Growth",
    description:
      "Watch your progress unfold with daily, weekly, and monthly growth metrics. Visualize improvements in consistency, study hours, and performance to stay motivated and celebrate every milestone along the way.",
    bullets: ["Daily progress snapshots", "Weekly performance reports", "Monthly growth analytics"],
    accent: "#f472b6",
    accentDim: "rgba(244,114,182,0.12)",
    gradientFrom: "rgba(219,39,119,0.15)",
    gradientTo: "rgba(124,58,237,0.06)",
    phone: { src: "/images/third.png", alt: "Growth tracking screen" },
    side: "right",
  },
  {
    index: "04",
    tag: "Goal Setting",
    title: "Exam Countdown Planner",
    description:
      "Set exam dates and PrepMate will help u boost up your scores by telling Your least studied and most studied subjects. It redistributes tasks when you miss sessions and highlights critical-path subjects as your exam approaches.",
    bullets: ["Auto task redistribution", "Critical path alerts", "Multi-exam support"],
    accent: "#fb923c",
    accentDim: "rgba(251,146,60,0.12)",
    gradientFrom: "rgba(234,88,12,0.15)",
    gradientTo: "rgba(6,182,212,0.06)",
    phone: { src: "/images/first.png", alt: "Planner screen" },
    side: "left",
  },
  {
    index: "05",
    tag: "Smart Reminders",
    title: "Never Miss a Task",
    description:
      "Get intelligent reminders for pending assignments, overdue tasks, and upcoming deadlines. PrepMate learns your study patterns and sends notifications at the perfect moment when you're most likely to act.",
    bullets: ["Intelligent task reminders", "Deadline alerts", "Custom notification timing"],
    accent: "#06b6d4",
    accentDim: "rgba(6,182,212,0.12)",
    gradientFrom: "rgba(6,182,212,0.18)",
    gradientTo: "rgba(124,58,237,0.06)",
    phone: { src: "/images/notification.png", alt: "Reminders screen" },
    side: "right",
  },
  {
    index: "06",
    tag: "Daily Motivation",
    title: "Inspirational Quotes",
    description:
      "Start your study session with curated motivational quotes tailored to your mood and goals. Get daily affirmations, success stories from top performers, and breakthrough moments to keep you inspired throughout your journey.",
    bullets: ["Personalized daily quotes", "Mood-based motivation", "Success inspiration"],
    accent: "#ec4899",
    accentDim: "rgba(236,72,153,0.12)",
    gradientFrom: "rgba(236,72,153,0.18)",
    gradientTo: "rgba(124,58,237,0.06)",
    phone: { src: "/images/quote.jpeg", alt: "Quotes screen" },
    side: "left",
  },
];

function FeatureCard({ feature, index: cardIndex }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-15% 0px -15% 0px" });
  const isRight = feature.side === "right";

  const phoneVariants = {
    hidden: {
      opacity: 0,
      x: isRight ? 120 : -120,
      y: 40,
      rotateY: isRight ? -25 : 25,
      scale: 0.85,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 1.1,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.1,
      },
    },
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      x: isRight ? -60 : 60,
      y: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.25,
      },
    },
  };

  const bulletVariants = {
    hidden: { opacity: 0, x: isRight ? -30 : 30 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: 0.5 + i * 0.1, ease: "easeOut" },
    }),
  };

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: isRight ? "row" : "row-reverse",
        alignItems: "center",
        justifyContent: "center",
        gap: "clamp(32px, 6vw, 96px)",
        padding: "clamp(60px, 8vw, 100px) clamp(20px, 6vw, 80px)",
        position: "relative",
      }}
    >
      {/* Glowing bg blob behind this section */}
      <motion.div
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          position: "absolute",
          width: "60%",
          height: "80%",
          borderRadius: "50%",
          background: `radial-gradient(ellipse, ${feature.gradientFrom} 0%, ${feature.gradientTo} 50%, transparent 70%)`,
          left: isRight ? "auto" : "5%",
          right: isRight ? "5%" : "auto",
          top: "10%",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Phone side */}
      <motion.div
        variants={phoneVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{
          position: "relative",
          zIndex: 2,
          perspective: 1000,
          flexShrink: 0,
        }}
      >
        {/* Phone glow ring */}
        <motion.div
          animate={isInView ? { opacity: [0.4, 0.7, 0.4] } : { opacity: 0 }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: -20,
            borderRadius: "28%",
            background: `radial-gradient(ellipse at 50% 50%, ${feature.accent}22 0%, transparent 70%)`,
            filter: "blur(20px)",
            zIndex: -1,
          }}
        />
        {/* Floating number tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          style={{
            position: "absolute",
            top: -18,
            left: "50%",
            transform: "translateX(-50%)",
            background: feature.accentDim,
            border: `1px solid ${feature.accent}40`,
            color: feature.accent,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.15em",
            padding: "4px 12px",
            borderRadius: 99,
            backdropFilter: "blur(8px)",
            whiteSpace: "nowrap",
            zIndex: 10,
            fontFamily: "inherit",
          }}
        >
          {feature.tag.toUpperCase()}
        </motion.div>

        <IPhoneFrame src={feature.phone.src} alt={feature.phone.alt} width={210} />
      </motion.div>

      {/* Text side */}
      <motion.div
        variants={textVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{
          maxWidth: 420,
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Index number */}
        <div
          className="roboto"
          style={{
            fontSize: "clamp(4rem, 8vw, 6.5rem)",
            fontWeight: 900,
            lineHeight: 1,
            color: `${feature.accent}14`,
            marginBottom: 8,
            letterSpacing: "-0.04em",
            userSelect: "none",
          }}
        >
          {feature.index}
        </div>

        {/* Title */}
        <h3
          className="roboto tracking-wider"
          style={{
            fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
            fontWeight: 800,
            color: "#fff",
            margin: "0 0 16px",
            lineHeight: 1.1,
           
          }}
        >
          {feature.title.split(" ").map((word, wi) =>
            wi === feature.title.split(" ").length - 1 ? (
              <span key={wi} style={{ color: feature.accent }}>
                {word}
              </span>
            ) : (
              <span key={wi}>{word} </span>
            )
          )}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: "clamp(0.88rem, 1.5vw, 1rem)",
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.75,
            margin: "0 0 28px",
            fontFamily: "inherit",
          }}
        >
          {feature.description}
        </p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: 1,
            background: `linear-gradient(90deg, ${feature.accent}50, transparent)`,
            marginBottom: 24,
            transformOrigin: "left",
          }}
        />

        {/* Bullets */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {feature.bullets.map((b, bi) => (
            <motion.div
              key={bi}
              custom={bi}
              variants={bulletVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.6)",
                fontFamily: "inherit",
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: feature.accent,
                  flexShrink: 0,
                  boxShadow: `0 0 8px ${feature.accent}`,
                }}
              />
              {b}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function TimelineLine() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: "50%",
        top: 0,
        bottom: 0,
        width: 1,
        transform: "translateX(-50%)",
        pointerEvents: "none",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      {/* Static faint track */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(255,255,255,0.05)",
        }}
      />
      {/* Animated fill */}
      <motion.div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          background:
            "linear-gradient(180deg, #a78bfa, #22d3ee, #f472b6, #fb923c)",
          transformOrigin: "top",
          scaleY,
        }}
      />
    </div>
  );
}

export default function Features() {
  const containerRef = useRef(null);

  return (
    <Element name="features">
      <section
        ref={containerRef}
        style={{
          position: "relative",
          background: `
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            #0e0e11
          `,
          backgroundSize: "50px 50px",
          overflow: "hidden",
          paddingBottom: 80,
        }}
      >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          textAlign: "center",
          paddingTop: "clamp(60px, 8vw, 100px)",
          paddingBottom: 16,
          position: "relative",
          zIndex: 5,
        }}
      >
        <span
          style={{
            display: "inline-block",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.18em",
            color: "rgba(167,139,250,0.8)",
            background: "rgba(167,139,250,0.08)",
            border: "1px solid rgba(167,139,250,0.2)",
            padding: "5px 14px",
            borderRadius: 99,
            marginBottom: 20,
            fontFamily: "inherit",
          }}
        >
          EVERYTHING YOU NEED
        </span>
        <h2
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 900,
            color: "#fff",
            margin: 0,
            lineHeight: 1.05,
            letterSpacing: "0.04em",
           
          }}
           className="roboto"
        >
          Made for{" "}
          <span
            style={{
              background:
                "linear-gradient(120deg, #a78bfa 0%, #7c3aed 45%, #22d3ee 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            You!
          </span>
        </h2>
        <p
          style={{
            fontSize: "clamp(0.88rem, 1.8vw, 1rem)",
            color: "rgba(255,255,255,0.35)",
            maxWidth: 420,
            margin: "16px auto 0",
            lineHeight: 1.7,
            fontFamily: "inherit",
          }}
        >
          Four core features designed to turn inconsistent study sessions into
          real, measurable results.
        </p>
      </motion.div>

      {/* Timeline container */}
      <div style={{ position: "relative" }}>
        <TimelineLine />

        {FEATURES.map((feature, i) => (
          <FeatureCard key={i} feature={feature} index={i} />
        ))}
      </div>

   
    </section>
    </Element>
  );
}