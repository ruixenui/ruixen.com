"use client";

import { useState, useRef, useCallback, useEffect } from "react";

/**
 * Credit Card Form — Rauno Freiberg craft.
 *
 * An inline payment form. Four zones separated by hairlines.
 * Number, name, expiry + CVC, pay. The typography IS the design.
 *
 * Auto-format, auto-advance, brand detection.
 * Pay wakes up when all fields are complete.
 * Quiet focus redirection on incomplete submit.
 * Soft tick on keystrokes.
 */

/* ── Types ── */

export interface CardData {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
}

export interface CreditCardDialogProps {
  onSubmit?: (card: CardData) => void;
  amount?: string;
  sound?: boolean;
}

/* ── Constants ── */

const MONO =
  "ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, monospace";

const CC_CSS = `.cc{--cc-ink:0,0,0;--cc-sep:rgba(0,0,0,0.08)}.dark .cc,[data-theme="dark"] .cc{--cc-ink:255,255,255;--cc-sep:rgba(var(--cc-ink),0.06)}`;
const SEP = "var(--cc-sep)";

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

function playTick(last: React.MutableRefObject<number>) {
  const now = performance.now();
  if (now - last.current < 20) return;
  last.current = now;
  try {
    const ac = audioCtx();
    const buf = ensureBuf(ac);
    const src = ac.createBufferSource();
    const gain = ac.createGain();
    src.buffer = buf;
    src.playbackRate.value = 1.0;
    gain.gain.value = 0.04;
    src.connect(gain);
    gain.connect(ac.destination);
    src.start();
  } catch {
    /* silent */
  }
}

/* ── Brand ── */

type Brand = "visa" | "mastercard" | "amex" | null;

function detectBrand(num: string): Brand {
  const d = num.replace(/\D/g, "");
  if (!d) return null;
  if (/^4/.test(d)) return "visa";
  if (/^5[1-5]/.test(d) || /^2[2-7]/.test(d)) return "mastercard";
  if (/^3[47]/.test(d)) return "amex";
  return null;
}

function numMax(b: Brand) {
  return b === "amex" ? 15 : 16;
}
function cvcLen(b: Brand) {
  return b === "amex" ? 4 : 3;
}

/* ── Format ── */

function strip(s: string) {
  return s.replace(/\D/g, "");
}

function fmtNum(s: string, b: Brand): string {
  const d = strip(s).slice(0, numMax(b));
  if (b === "amex") {
    const p: string[] = [];
    if (d.length > 0) p.push(d.slice(0, 4));
    if (d.length > 4) p.push(d.slice(4, 10));
    if (d.length > 10) p.push(d.slice(10));
    return p.join(" ");
  }
  const p: string[] = [];
  for (let i = 0; i < d.length; i += 4) p.push(d.slice(i, i + 4));
  return p.join(" ");
}

function fmtExp(s: string): string {
  const d = strip(s).slice(0, 4);
  if (d.length <= 2) return d;
  return d.slice(0, 2) + " / " + d.slice(2);
}

/* ── Component ── */

export function CreditCardDialog({
  onSubmit,
  amount = "$0.00",
  sound = true,
}: CreditCardDialogProps) {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  const lastSound = useRef(0);
  const numRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const expRef = useRef<HTMLInputElement>(null);
  const cvcRef = useRef<HTMLInputElement>(null);
  const payRef = useRef<HTMLButtonElement>(null);

  const brand = detectBrand(number);
  const numD = strip(number);
  const expD = strip(expiry);

  const ready =
    numD.length >= numMax(brand) &&
    name.trim() !== "" &&
    expD.length >= 4 &&
    cvc.length >= cvcLen(brand);

  /* Auto-focus number on mount */
  useEffect(() => {
    const t = setTimeout(() => numRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, []);

  /* ── Handlers ── */

  const onNum = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (sound) playTick(lastSound);
      const d = strip(e.target.value);
      const b = detectBrand(d);
      const clamped = d.slice(0, numMax(b));
      setNumber(fmtNum(clamped, b));
      if (clamped.length >= numMax(b)) nameRef.current?.focus();
    },
    [sound],
  );

  const onName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (sound) playTick(lastSound);
      setName(e.target.value);
    },
    [sound],
  );

  const onExp = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (sound) playTick(lastSound);
      const d = strip(e.target.value).slice(0, 4);
      setExpiry(fmtExp(d));
      if (d.length >= 4) cvcRef.current?.focus();
    },
    [sound],
  );

  const onCvc = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (sound) playTick(lastSound);
      const d = strip(e.target.value);
      const b = detectBrand(number);
      const clamped = d.slice(0, cvcLen(b));
      setCvc(clamped);
      if (clamped.length >= cvcLen(b)) payRef.current?.focus();
    },
    [sound, number],
  );

  const submit = useCallback(() => {
    const b = detectBrand(number);
    if (numD.length < numMax(b)) {
      numRef.current?.focus();
      return;
    }
    if (!name.trim()) {
      nameRef.current?.focus();
      return;
    }
    if (expD.length < 4) {
      expRef.current?.focus();
      return;
    }
    if (cvc.length < cvcLen(b)) {
      cvcRef.current?.focus();
      return;
    }
    if (sound) playTick(lastSound);
    onSubmit?.({ number: numD, name: name.trim(), expiry: expD, cvc });
  }, [number, numD, name, expD, cvc, sound, onSubmit]);

  /* Alpha helper */
  const al = (field: string, val: string) =>
    focused === field ? 0.85 : val ? 0.5 : 0.5;

  const inp: React.CSSProperties = {
    background: "transparent",
    border: "none",
    outline: "none",
    fontVariantNumeric: "tabular-nums",
    transition: "color 0.15s",
  };

  return (
    <div
      className="cc"
      style={{
        width: 360,
        borderRadius: 16,
        background: "rgba(var(--cc-ink),0.03)",
        border: `1px solid ${SEP}`,
        overflow: "hidden",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: CC_CSS }} />
      {/* ── Number ── */}
      <div
        style={{
          padding: "18px 20px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <input
          ref={numRef}
          type="text"
          inputMode="numeric"
          autoComplete="cc-number"
          placeholder="Card number"
          value={number}
          onChange={onNum}
          onFocus={() => setFocused("number")}
          onBlur={() => setFocused(null)}
          className="placeholder:text-[rgba(var(--cc-ink),0.15)]"
          style={{
            ...inp,
            flex: 1,
            width: "100%",
            color: `rgba(var(--cc-ink),${al("number", number)})`,
            fontSize: 15,
            fontFamily: MONO,
            letterSpacing: "0.06em",
            fontWeight: 440,
          }}
        />
        <span
          style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.06em",
            textTransform: "uppercase" as const,
            color: `rgba(var(--cc-ink),${brand ? 0.3 : 0})`,
            transition: "color 0.2s",
            flexShrink: 0,
          }}
        >
          {brand || "\u00A0"}
        </span>
      </div>

      <div style={{ height: 1, background: SEP }} />

      {/* ── Name ── */}
      <div style={{ padding: "18px 20px" }}>
        <input
          ref={nameRef}
          type="text"
          autoComplete="cc-name"
          placeholder="Name on card"
          value={name}
          onChange={onName}
          onFocus={() => setFocused("name")}
          onBlur={() => setFocused(null)}
          className="placeholder:text-[rgba(var(--cc-ink),0.15)]"
          style={{
            ...inp,
            width: "100%",
            color: `rgba(var(--cc-ink),${al("name", name)})`,
            fontSize: 13,
            letterSpacing: "0.01em",
            fontWeight: 450,
            textTransform: "uppercase" as const,
          }}
        />
      </div>

      <div style={{ height: 1, background: SEP }} />

      {/* ── Expiry + CVC ── */}
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, padding: "18px 20px" }}>
          <input
            ref={expRef}
            type="text"
            inputMode="numeric"
            autoComplete="cc-exp"
            placeholder="MM / YY"
            value={expiry}
            onChange={onExp}
            onFocus={() => setFocused("expiry")}
            onBlur={() => setFocused(null)}
            className="placeholder:text-[rgba(var(--cc-ink),0.15)]"
            style={{
              ...inp,
              width: "100%",
              color: `rgba(var(--cc-ink),${al("expiry", expiry)})`,
              fontSize: 13,
              fontFamily: MONO,
              letterSpacing: "0.06em",
              fontWeight: 440,
            }}
          />
        </div>
        <div
          style={{
            width: 1,
            alignSelf: "stretch",
            background: SEP,
          }}
        />
        <div style={{ width: 120, padding: "18px 20px" }}>
          <input
            ref={cvcRef}
            type="text"
            inputMode="numeric"
            autoComplete="cc-csc"
            placeholder="CVC"
            value={cvc}
            onChange={onCvc}
            onFocus={() => setFocused("cvc")}
            onBlur={() => setFocused(null)}
            className="placeholder:text-[rgba(var(--cc-ink),0.15)]"
            style={{
              ...inp,
              width: "100%",
              color: `rgba(var(--cc-ink),${al("cvc", cvc)})`,
              fontSize: 13,
              fontFamily: MONO,
              letterSpacing: "0.1em",
              fontWeight: 440,
            }}
          />
        </div>
      </div>

      <div style={{ height: 1, background: SEP }} />

      {/* ── Pay ── */}
      <button
        ref={payRef}
        onClick={submit}
        style={{
          width: "100%",
          padding: "18px 20px",
          background: ready ? "rgba(var(--cc-ink),0.04)" : "transparent",
          border: "none",
          outline: "none",
          fontSize: 13,
          fontWeight: 500,
          letterSpacing: "-0.01em",
          color: `rgba(var(--cc-ink),${ready ? 0.65 : 0.2})`,
          cursor: ready ? "pointer" : "default",
          transition: "color 0.3s, background 0.3s",
          textAlign: "center" as const,
        }}
        onMouseEnter={(e) => {
          if (ready) {
            e.currentTarget.style.color = "rgba(var(--cc-ink),0.9)";
            e.currentTarget.style.background = "rgba(var(--cc-ink),0.06)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = `rgba(var(--cc-ink),${ready ? 0.65 : 0.2})`;
          e.currentTarget.style.background = ready
            ? "rgba(var(--cc-ink),0.04)"
            : "transparent";
        }}
      >
        Pay {amount}
      </button>
    </div>
  );
}

export default CreditCardDialog;
