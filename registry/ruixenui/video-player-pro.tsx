"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Video Player Pro — cinema glass.
 *
 * Glass control bar with spring physics. Custom progress
 * scrubber — hover to expand, drag to seek. Inline volume
 * slider. Speed pills with layout-animated indicator.
 * Auto-hide on idle. Tick on every interaction.
 *
 * The player disappears. The content remains.
 */

/* ── Types ── */

export interface VideoPlayerProProps {
  src: string;
  poster?: string;
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

/* ── Helpers ── */

function fmt(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/* ── Inline SVG Icons ── */

function IcoPlay({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <path d="M4.5 2.5v11l9-5.5-9-5.5z" />
    </svg>
  );
}

function IcoPause({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <rect x="3" y="2" width="3.5" height="12" rx="0.75" />
      <rect x="9.5" y="2" width="3.5" height="12" rx="0.75" />
    </svg>
  );
}

function IcoReplay({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 8a5.5 5.5 0 1 1 1.3 3.5" />
      <path d="M2.5 13v-3.5H6" />
    </svg>
  );
}

function IcoVolHi({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M1.5 6v4h2.5l3.5 3V3L4 6H1.5z" fill="currentColor" />
      <path
        d="M10.5 5.5a3 3 0 0 1 0 5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M12.5 3.5a6 6 0 0 1 0 9"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IcoVolLo({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M1.5 6v4h2.5l3.5 3V3L4 6H1.5z" fill="currentColor" />
      <path
        d="M10.5 5.5a3 3 0 0 1 0 5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IcoVolMute({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M1.5 6v4h2.5l3.5 3V3L4 6H1.5z" fill="currentColor" />
      <path
        d="M11 6l4 4m0-4l-4 4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IcoFull({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 5.5V2h3.5" />
      <path d="M14 5.5V2h-3.5" />
      <path d="M2 10.5V14h3.5" />
      <path d="M14 10.5V14h-3.5" />
    </svg>
  );
}

/* ── Constants ── */

const SPEEDS = [0.5, 1, 1.5, 2] as const;

const BTN: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 28,
  height: 28,
  borderRadius: 7,
  border: "none",
  background: "transparent",
  cursor: "pointer",
  transition: "background 0.12s, color 0.12s",
};

/* ── Component ── */

export function VideoPlayerPro({
  src,
  poster,
  sound = true,
}: VideoPlayerProProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const lastVol = useRef(1);
  const lastSnd = useRef(0);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>();

  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [vol, setVol] = useState(1);
  const [muted, setMuted] = useState(false);
  const [prog, setProg] = useState(0);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);
  const [show, setShow] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [err, setErr] = useState<string | null>(null);
  const [scrubbing, setScrubbing] = useState(false);
  const [barHover, setBarHover] = useState(false);

  /* ── Reset on src change ── */
  useEffect(() => {
    setErr(null);
    setPlaying(false);
    setEnded(false);
    setProg(0);
    setTime(0);
    setDur(0);
    const v = videoRef.current;
    if (v) {
      try {
        v.pause();
        v.load();
      } catch {
        /* ignore */
      }
    }
  }, [src]);

  /* ── Auto-hide controls ── */
  const resetHide = useCallback(() => {
    setShow(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (!scrubbing) setShow(false);
    }, 3000);
  }, [scrubbing]);

  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  /* ── Time sync ── */
  const syncTime = () => {
    const v = videoRef.current;
    if (!v) return;
    const d = v.duration;
    const t = v.currentTime;
    setDur(isFinite(d) ? d : 0);
    setTime(isFinite(t) ? t : 0);
    const p = d > 0 ? (t / d) * 100 : 0;
    setProg(isFinite(p) ? p : 0);
  };

  /* ── Play/pause ── */
  const toggle = async () => {
    const v = videoRef.current;
    if (!v) return;
    if (ended) {
      v.currentTime = 0;
      setEnded(false);
    }
    if (v.paused) {
      try {
        await v.play();
      } catch {
        const c = v.error?.code;
        setErr(
          c === 2
            ? "Network error."
            : c === 3
              ? "Decode error."
              : c === 4
                ? "Source not supported."
                : "Playback failed.",
        );
        setPlaying(false);
      }
    } else {
      v.pause();
    }
    if (sound) tick(lastSnd);
  };

  /* ── Seek ── */
  const seek = useCallback((pct: number) => {
    const v = videoRef.current;
    if (!v) return;
    const t = (pct / 100) * (v.duration || 0);
    if (isFinite(t)) {
      v.currentTime = t;
      setTime(t);
      setProg(pct);
    }
  }, []);

  /* ── Scrub ── */
  const scrubFrom = useCallback(
    (clientX: number) => {
      const bar = progressRef.current;
      if (!bar) return;
      const rect = bar.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      seek((x / rect.width) * 100);
    },
    [seek],
  );

  useEffect(() => {
    if (!scrubbing) return;
    const move = (e: MouseEvent) => scrubFrom(e.clientX);
    const up = () => setScrubbing(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, [scrubbing, scrubFrom]);

  /* ── Volume ── */
  const setVideoVol = useCallback((v: number) => {
    const vid = videoRef.current;
    if (!vid) return;
    const c = Math.max(0, Math.min(1, v));
    vid.volume = c;
    setVol(c);
    const m = c === 0;
    setMuted(m);
    vid.muted = m;
    if (!m) lastVol.current = c;
  }, []);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.muted || vol === 0) {
      v.muted = false;
      setVideoVol(lastVol.current > 0 ? lastVol.current : 1);
    } else {
      lastVol.current = vol;
      v.muted = true;
      setMuted(true);
      setVol(0);
      v.volume = 0;
    }
    if (sound) tick(lastSnd);
  };

  /* ── Fullscreen ── */
  const fullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const VolIco =
    muted || vol === 0 ? IcoVolMute : vol > 0.5 ? IcoVolHi : IcoVolLo;

  return (
    <>
      <style>{`
        .vp{--v-border:rgba(0,0,0,0.06)}
        .dark .vp,[data-theme="dark"] .vp{--v-border:rgba(255,255,255,0.06)}
      `}</style>
      <div
        className="vp"
        ref={containerRef}
        onMouseMove={resetHide}
        onMouseEnter={resetHide}
        onMouseLeave={() => {
          if (!scrubbing) setShow(false);
        }}
        onTouchStart={resetHide}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 900,
          margin: "0 auto",
          borderRadius: 14,
          overflow: "hidden",
          background: "#000",
          border: "1px solid var(--v-border)",
          lineHeight: 0,
          userSelect: scrubbing ? "none" : undefined,
          fontFamily: "system-ui,-apple-system,sans-serif",
        }}
      >
        {/* Video */}
        <video
          ref={videoRef}
          poster={poster}
          preload="metadata"
          playsInline
          crossOrigin="anonymous"
          onClick={toggle}
          onTimeUpdate={syncTime}
          onLoadedMetadata={syncTime}
          onDurationChange={syncTime}
          onPlay={() => {
            setPlaying(true);
            setErr(null);
          }}
          onPause={() => setPlaying(false)}
          onEnded={() => {
            setEnded(true);
            setPlaying(false);
          }}
          onError={() => {
            const c = videoRef.current?.error?.code;
            setErr(
              c === 2
                ? "Network error."
                : c === 3
                  ? "Decode error."
                  : c === 4
                    ? "Source not supported."
                    : "Video failed to load.",
            );
            setPlaying(false);
          }}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            cursor: "pointer",
          }}
        >
          <source src={src} type="video/mp4" />
        </video>

        {/* Error overlay */}
        <AnimatePresence>
          {err && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                background: "rgba(0,0,0,0.7)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                zIndex: 30,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 520,
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                Can&apos;t play video
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.4)",
                  maxWidth: 280,
                  textAlign: "center",
                }}
              >
                {err}
              </div>
              <button
                onClick={() => {
                  setErr(null);
                  videoRef.current?.load();
                }}
                style={{
                  marginTop: 4,
                  fontSize: 11,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.6)",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  padding: "6px 14px",
                  cursor: "pointer",
                  transition: "background 0.12s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.14)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                }}
              >
                Retry
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Center play button — when paused & controls hidden */}
        <AnimatePresence>
          {!playing && !err && !show && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              onClick={toggle}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.35)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                {ended ? <IcoReplay size={24} /> : <IcoPlay size={24} />}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Glass control bar */}
        <AnimatePresence>
          {show && !err && (
            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "absolute",
                bottom: 12,
                left: "2.5%",
                width: "95%",
                background: "rgba(0,0,0,0.45)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "10px 14px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                zIndex: 20,
              }}
            >
              {/* Progress bar */}
              <div
                ref={progressRef}
                onMouseDown={(e) => {
                  setScrubbing(true);
                  scrubFrom(e.clientX);
                }}
                onMouseEnter={() => setBarHover(true)}
                onMouseLeave={() => setBarHover(false)}
                style={{
                  position: "relative",
                  width: "100%",
                  height: barHover || scrubbing ? 6 : 3,
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: 3,
                  cursor: "pointer",
                  transition: "height 0.12s",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: `${prog}%`,
                    background: "rgba(255,255,255,0.7)",
                    borderRadius: 3,
                    transition: scrubbing ? "none" : "width 0.1s",
                  }}
                />
                {(barHover || scrubbing) && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: `${prog}%`,
                      transform: "translate(-50%, -50%)",
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: "#fff",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                      transition: scrubbing ? "none" : "left 0.1s",
                    }}
                  />
                )}
              </div>

              {/* Control row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {/* Left: play + volume + time */}
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {/* Play / Pause */}
                  <button
                    onClick={toggle}
                    style={{
                      ...BTN,
                      background: "rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.85)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.14)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.08)";
                    }}
                  >
                    {ended ? (
                      <IcoReplay />
                    ) : playing ? (
                      <IcoPause />
                    ) : (
                      <IcoPlay />
                    )}
                  </button>

                  {/* Volume icon + slider */}
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <button
                      onClick={toggleMute}
                      style={{
                        ...BTN,
                        color: "rgba(255,255,255,0.55)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "rgba(255,255,255,0.9)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                      }}
                    >
                      <VolIco />
                    </button>
                    <div
                      onMouseDown={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = Math.max(
                          0,
                          Math.min(e.clientX - rect.left, rect.width),
                        );
                        setVideoVol(x / rect.width);
                      }}
                      style={{
                        width: 52,
                        height: 3,
                        background: "rgba(255,255,255,0.12)",
                        borderRadius: 2,
                        cursor: "pointer",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          height: "100%",
                          width: `${vol * 100}%`,
                          background: "rgba(255,255,255,0.5)",
                          borderRadius: 2,
                        }}
                      />
                    </div>
                  </div>

                  {/* Time */}
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 450,
                      color: "rgba(255,255,255,0.4)",
                      fontVariantNumeric: "tabular-nums",
                      letterSpacing: "0.01em",
                      whiteSpace: "nowrap",
                      marginLeft: 2,
                    }}
                  >
                    {fmt(time)}
                    <span style={{ opacity: 0.5 }}> / </span>
                    {fmt(dur)}
                  </div>
                </div>

                {/* Right: speed + fullscreen */}
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  {/* Speed pills */}
                  <div
                    style={{
                      display: "flex",
                      gap: 0,
                      position: "relative",
                      background: "rgba(255,255,255,0.06)",
                      borderRadius: 8,
                      padding: 2,
                    }}
                  >
                    {SPEEDS.map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          const v = videoRef.current;
                          if (v) v.playbackRate = s;
                          setSpeed(s);
                          if (sound) tick(lastSnd);
                        }}
                        style={{
                          position: "relative",
                          fontSize: 11,
                          fontWeight: 500,
                          fontVariantNumeric: "tabular-nums",
                          padding: "4px 8px",
                          borderRadius: 6,
                          border: "none",
                          background: "transparent",
                          color:
                            speed === s
                              ? "rgba(255,255,255,0.9)"
                              : "rgba(255,255,255,0.3)",
                          cursor: "pointer",
                          zIndex: 1,
                          transition: "color 0.15s",
                          lineHeight: 1,
                        }}
                      >
                        {speed === s && (
                          <motion.div
                            layoutId="vp-speed"
                            style={{
                              position: "absolute",
                              inset: 0,
                              background: "rgba(255,255,255,0.12)",
                              borderRadius: 6,
                              zIndex: -1,
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 35,
                            }}
                          />
                        )}
                        {s}x
                      </button>
                    ))}
                  </div>

                  {/* Fullscreen */}
                  <button
                    onClick={fullscreen}
                    style={{
                      ...BTN,
                      color: "rgba(255,255,255,0.45)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.9)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                    }}
                  >
                    <IcoFull />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default VideoPlayerPro;
