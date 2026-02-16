"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Hover Play Card — video that breathes.
 *
 * Hover: video plays muted, progress line emerges at bottom.
 * Click: unmute and play with sound. Click again to pause.
 * The center icon springs in and out. The card responds.
 *
 * No shadcn. No lucide. Just the content and the breath.
 */

/* ── Types ── */

export interface HoverPlayCardProps {
  src: string;
  poster?: string;
  loop?: boolean;
  mutedOnHover?: boolean;
  sound?: boolean;
}

/* ── Audio ── */

let _ctx: AudioContext | null = null;
let _buf: AudioBuffer | null = null;

function audioCtx() {
  if (!_ctx) {
    _ctx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
  }
  if (_ctx.state === "suspended") _ctx.resume();
  return _ctx;
}

function ensureBuf(ac: AudioContext): AudioBuffer {
  if (_buf && _buf.sampleRate === ac.sampleRate) return _buf;
  const rate = ac.sampleRate;
  const len = Math.floor(rate * 0.003);
  const buf = ac.createBuffer(1, len, rate);
  const ch = buf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    const t = i / len;
    ch[i] = (Math.random() * 2 - 1) * (1 - t) ** 4;
  }
  _buf = buf;
  return buf;
}

function tick(last: React.MutableRefObject<number>) {
  const now = performance.now();
  if (now - last.current < 50) return;
  last.current = now;
  try {
    const ac = audioCtx();
    const buf = ensureBuf(ac);
    const src = ac.createBufferSource();
    const gain = ac.createGain();
    src.buffer = buf;
    gain.gain.value = 0.04;
    src.connect(gain);
    gain.connect(ac.destination);
    src.start();
  } catch {
    /* silent */
  }
}

/* ── Inline SVG Icons ── */

function IcoPlay({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="currentColor">
      <path d="M8 4v20l16-10L8 4z" />
    </svg>
  );
}

function IcoPause({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="currentColor">
      <rect x="6" y="4" width="5" height="20" rx="1" />
      <rect x="17" y="4" width="5" height="20" rx="1" />
    </svg>
  );
}

/* ── Component ── */

export function HoverPlayCard({
  src,
  poster,
  loop = false,
  mutedOnHover = true,
  sound = true,
}: HoverPlayCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastSnd = useRef(0);

  const [hovering, setHovering] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [userStarted, setUserStarted] = useState(false);
  const [prevMuted, setPrevMuted] = useState<boolean | null>(null);
  const [progress, setProgress] = useState(0);

  /* ── Hover autoplay ── */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let ignore = false;

    if (hovering && !userStarted) {
      if (prevMuted === null) setPrevMuted(v.muted);
      if (mutedOnHover) v.muted = true;
      v.play()
        .then(() => {
          if (!ignore) setPlaying(true);
        })
        .catch(() => {
          if (!ignore) setPlaying(false);
        });
    } else if (!hovering && !userStarted) {
      v.pause();
      setPlaying(false);
      if (prevMuted !== null) v.muted = prevMuted;
    }

    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovering, mutedOnHover, userStarted]);

  /* ── Sync native events ── */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => {
      setPlaying(false);
      setUserStarted(false);
    };
    const onTime = () => {
      if (v.duration > 0)
        setProgress((v.currentTime / v.duration) * 100);
    };

    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("ended", onEnded);
    v.addEventListener("timeupdate", onTime);

    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("ended", onEnded);
      v.removeEventListener("timeupdate", onTime);
    };
  }, []);

  /* ── Click handler ── */
  const handleClick = async () => {
    const v = videoRef.current;
    if (!v) return;

    if (!playing) {
      setUserStarted(true);
      v.muted = false;
      setPrevMuted(false);
      try {
        await v.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    } else {
      v.pause();
      setPlaying(false);
    }
    if (sound) tick(lastSnd);
  };

  return (
    <>
      <style>{`
        .hpc{--h-border:rgba(0,0,0,0.06)}
        .dark .hpc,[data-theme="dark"] .hpc{--h-border:rgba(255,255,255,0.06)}
      `}</style>
      <div
        className="hpc"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        style={{
          position: "relative",
          borderRadius: 14,
          overflow: "hidden",
          border: "1px solid var(--h-border)",
          cursor: "pointer",
          width: "100%",
          maxWidth: 560,
          aspectRatio: "16/9",
          background: "#000",
        }}
      >
        {/* Video — absolute-fill so container holds shape via aspectRatio */}
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          loop={loop}
          playsInline
          crossOrigin="anonymous"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />

        {/* Center play/pause — overlay */}
        <AnimatePresence>
          {(hovering || !playing) && (
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
              }}
            >
              {/* Glass circle — spring squish on click */}
              <motion.div
                whileTap={{ scale: 0.85 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.3)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255,255,255,0.9)",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(0,0,0,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(0,0,0,0.3)";
                }}
              >
                {/* Icon crossfade — keyed for spring swap */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={playing ? "pause" : "play"}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 28,
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {playing ? <IcoPause /> : <IcoPlay />}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress line at bottom */}
        <motion.div
          animate={{ opacity: hovering || playing ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "rgba(255,255,255,0.15)",
            zIndex: 3,
          }}
        >
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "linear" }}
            style={{
              height: "100%",
              background: "rgba(255,255,255,0.65)",
              borderRadius: "0 1px 1px 0",
            }}
          />
        </motion.div>
      </div>
    </>
  );
}

export default HoverPlayCard;
