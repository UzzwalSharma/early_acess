import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Smartphone, Star, Send, MessageCircle, Clock, ChevronDown } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import {api} from "../../convex/_generated/api"
import toast from "react-hot-toast";
import { Element, Link } from "react-scroll";

// ── Fade-up variant ───────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ── Format time ago ───────────────────────────────────────────────
const formatTimeAgo = (timestamp) => {
  if (!timestamp) return "just now";
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return "just now";
};

// ── Star row ──────────────────────────────────────────────────────
function Stars({ count, interactive = false, onChange }) {
  const [hovered, setHovered] = useState(null);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={interactive ? 20 : 13}
          strokeWidth={1.5}
          className={`transition-colors duration-100 ${
            n <= (hovered ?? count)
              ? "fill-amber-400 text-amber-400"
              : "fill-transparent text-white/20"
          } ${interactive ? "cursor-pointer" : ""}`}
          onMouseEnter={() => interactive && setHovered(n)}
          onMouseLeave={() => interactive && setHovered(null)}
          onClick={() => interactive && onChange?.(n)}
        />
      ))}
    </div>
  );
}

// ── Single comment card ───────────────────────────────────────────
function CommentCard({ comment, index }) {
  return (
    <motion.div
      custom={index * 0.08}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="rounded-2xl p-5 flex flex-col gap-3"
      style={{
        background: "rgba(255,255,255,0.035)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ 
              background: `hsl(${comment.name.charCodeAt(0) * 12}, 70%, 50%)`,
              border: "1.5px solid rgba(255,255,255,0.1)",
              color: "#fff"
            }}
          >
            {comment.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-white/80 text-sm font-semibold leading-none mb-1"
               style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {comment.name}
            </p>
            <div className="flex items-center gap-1.5">
              <Stars count={comment.rating} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 text-white/20 text-xs"
             style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <Clock size={11} />
          <span>{formatTimeAgo(comment.timestamp)}</span>
        </div>
      </div>
      <p className="text-white/45 text-sm leading-relaxed"
         style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {comment.comment}
      </p>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────
export default function Final() {
  const [name, setName]       = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating]   = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showAll, setShowAll] = useState(false);

  // Fetch reviews from Convex
  const reviews = useQuery(api.reviews.getReviews) || [];
  const averageRating = useQuery(api.reviews.getAverageRating) || 0;
  
  // Use Convex mutation to add review
  const addReview = useMutation(api.reviews.addReview);

  const visibleComments = showAll ? reviews : reviews.slice(0, 3);
  const displayComments = visibleComments;

  const handleSubmit = async () => {
    if (!name.trim() || !comment.trim() || rating === 0) {
      toast.error("Please fill in all fields");
      return;
    }
    
    try {
      await addReview({ name, comment, rating });
      toast.success("🎉 Review posted! Thank you for your feedback.");
      setName(""); 
      setComment(""); 
      setRating(0);
      setSubmitted(false);
    } catch (error) {
      toast.error("Failed to submit review. Try again.");
      console.error("Error submitting review:", error);
    }
  };

  return (
    <Element name="download">
      <section
        className="relative w-full overflow-hidden"
        style={{
          background: `
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            #0e0e11
          `,
          backgroundSize: "50px 50px",
        }}
      >
      {/* Subtle top separator */}
      <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)" }} />

      <div className="max-w-5xl mx-auto px-4 md:px-10 py-24 flex flex-col gap-24">

        {/* ── PLAYSTORE STYLE DOWNLOAD BLOCK ─────────────────────────────────── */}
        <motion.div
          custom={0.08} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="w-full rounded-2xl p-px overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.1))",
          }}
        >
          <div
            className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start gap-6"
            style={{ background: "#0f0f0f" }}
          >
            {/* Left: App Icon & Info */}
            <div className="flex flex-col items-start gap-4 shrink-0">
              {/* App Icon */}
              <div
                className="w-28 h-28 rounded-2xl flex items-center justify-center text-6xl shrink-0"
                style={{
                  background: "linear-gradient(135deg,#7c3aed,#5b21b6)",
                  boxShadow: "0 12px 40px rgba(124,58,237,0.45)",
                }}
              >
                <img src="/images/logo.png" alt="" srcset="" />
              </div>

              {/* Download Button */}
              <button
                onClick={() => {
                  const toastId = toast((t) => (
                    <div className="flex flex-col gap-3">
                      <p className="font-semibold">🚀 Thanks for downloading!</p>
                      <p className="text-sm text-white/70">Have feedback? We'd love to hear from you!</p>
                      <div className="flex gap-2">
                        <Link
                          to="reviews"
                          smooth={true}
                          duration={500}
                          className="flex-1 px-3 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm rounded cursor-pointer transition-colors text-center"
                          onClick={() => toast.dismiss(toastId)}
                        >
                          Leave Suggestion
                        </Link>
                        <button
                          onClick={() => toast.dismiss(toastId)}
                          className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded transition-colors"
                        >
                          Later
                        </button>
                      </div>
                    </div>
                  ), {
                    duration: 5000,
                  });
                  // Open download link
                  window.open("https://expo.dev/artifacts/eas/9VBQMBAobpobmiqh4oj8V4.apk", "_blank");
                }}
                className="w-full flex items-center justify-center gap-2 text-white font-bold py-3 px-6 rounded-lg text-sm transition-all duration-200 hover:scale-[1.05] active:scale-[0.95] whitespace-nowrap"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  background: "linear-gradient(135deg,#7c3aed,#5b21b6)",
                  boxShadow: "0 6px 20px rgba(124,58,237,0.4)",
                }}
              >
                <Download size={16} strokeWidth={2.2} />
                Get
              </button>
            </div>

            {/* Right: App Details */}
            <div className="flex flex-col gap-4 flex-1">
              {/* App Name & Developer */}
              <div>
                <h2 className="roboto text-white text-2xl font-bold mb-1">
                  PrepMate
                </h2>
                <p className="text-white/40 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                By Ujjwal Sharma
                </p>
              </div>

              {/* Rating Section */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Stars count={Math.round(averageRating)} />
                  <span className="text-white/60 text-sm font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {averageRating}
                  </span>
                </div>
                <div className="h-5 w-px bg-white/20" />
                <span className="text-white/40 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {reviews.length} rating{reviews.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                
                <div className="flex flex-col">
                  <span className="text-white/30 text-xs uppercase tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Size
                  </span>
                  <span className="text-white text-sm font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    62.5 MB
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white/30 text-xs uppercase tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Version
                  </span>
                  <span className="text-white text-sm font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    1.0.0
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Track daily study streaks, visualize growth with analytics, and stay motivated with smart reminders & inspirational quotes. Perfect for competitive exam prep.
              </p>

              {/* Features Tags */}
              <div className="flex flex-wrap gap-2">
                {["Study Tracker", "Streaks", "Analytics", "Reminders"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs text-white/70"
                    style={{
                      background: "rgba(124,58,237,0.15)",
                      border: "1px solid rgba(124,58,237,0.3)",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── REVIEWS BLOCK ─────────────────────────────────── */}
        <Element name="reviews">
          <div className="flex flex-col gap-8">

          {/* Section header */}
          <motion.div
            custom={0} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <h3 className="roboto text-white font-bold"
                style={{ fontSize: "clamp(1.4rem,3vw,2rem)" }}>
              Reviews & Suggestions
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-amber-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-white font-bold text-lg">{averageRating}</span>
              </div>
              <div className="h-6 w-px bg-white/20" />
              <div>
                <p className="text-white/50 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  <span className="text-white font-semibold">{reviews.length}</span> review{reviews.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Comment cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayComments.map((c, i) => (
              <CommentCard key={c._id || i} comment={c} index={i} />
            ))}
          </div>

          {/* Show more toggle */}
          {!showAll && displayComments.length > 3 && (
            <div className="flex justify-center">
              <button
                onClick={() => setShowAll(true)}
                className="flex items-center gap-2 text-white/35 hover:text-white/60 text-sm font-medium transition-colors duration-150"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Show more reviews <ChevronDown size={15} />
              </button>
            </div>
          )}

          {/* ── Leave a comment form ── */}
          <motion.div
            custom={0.1} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="rounded-2xl p-px"
            style={{
              background: "linear-gradient(135deg, rgba(124,58,237,0.25), rgba(255,255,255,0.04), rgba(6,182,212,0.1))",
            }}
          >
            <div className="rounded-2xl p-7 flex flex-col gap-6" style={{ background: "#0f0f0f" }}>

              {/* Form header */}
              <div className="flex items-center gap-2.5">
                <MessageCircle size={18} className="text-violet-400" strokeWidth={1.8} />
                <h4 className="text-white font-semibold text-base"
                    style={{ fontFamily: "'Syne', sans-serif" }}>
                  Leave a review
                </h4>
              </div>

              {/* Rating picker */}
              <div className="flex flex-col gap-2">
                <label className="text-white/35 text-xs uppercase tracking-widest"
                       style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Your rating
                </label>
                <Stars count={rating} interactive onChange={setRating} />
              </div>

              {/* Name input */}
              <div className="flex flex-col gap-2">
                <label className="text-white/35 text-xs uppercase tracking-widest"
                       style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Your name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Arjun Sharma"
                  className="w-full rounded-xl px-4 py-3 text-sm text-white/70 placeholder:text-white/18 outline-none transition-all duration-200"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "rgba(124,58,237,0.5)"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                />
              </div>

              {/* Comment textarea */}
              <div className="flex flex-col gap-2">
                <label className="text-white/35 text-xs uppercase tracking-widest"
                       style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Your review
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience with PrepMate..."
                  rows={4}
                  className="w-full rounded-xl px-4 py-3 text-sm text-white/70 placeholder:text-white/18 outline-none resize-none transition-all duration-200"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "rgba(124,58,237,0.5)"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                />
              </div>

              {/* Submit */}
              <div className="flex items-center justify-between flex-wrap gap-3">
                <p className="text-white/20 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {rating === 0 ? "Pick a star rating to continue" : `${rating} star${rating > 1 ? "s" : ""} selected`}
                </p>
                <button
                  onClick={handleSubmit}
                  disabled={!name.trim() || !comment.trim() || rating === 0}
                  className="flex items-center gap-2 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    background: "linear-gradient(135deg,#7c3aed,#5b21b6)",
                    boxShadow: "0 4px 20px rgba(124,58,237,0.35)",
                  }}
                >
                  {submitted ? "Posted! 🎉" : <><Send size={14} /> Post review</>}
                </button>
              </div>
            </div>
          </motion.div>

         
        </div>
        </Element>
      </div>

      {/* Bottom separator */}
      <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)" }} />
    </section>
    </Element>
  );
}