"use client";

import * as React from "react";
import { motion } from "motion/react";

/* ── sound ─────────────────────────────────────────────── */
let _a: AudioContext, _b: AudioBuffer;
const tick = () => {
  if (typeof window === "undefined") return;
  if (!_a) {
    _a = new AudioContext();
    _b = _a.createBuffer(1, (_a.sampleRate * 0.003) | 0, _a.sampleRate);
    const d = _b.getChannelData(0);
    for (let i = 0; i < d.length; i++)
      d[i] = (Math.random() * 2 - 1) * (1 - i / d.length) ** 4;
  }
  const s = _a.createBufferSource();
  s.buffer = _b;
  const g = _a.createGain();
  g.gain.value = 0.08;
  s.connect(g).connect(_a.destination);
  s.start();
};

/* ── theme ─────────────────────────────────────────────── */
/*  Light: frosted-white panels, soft outer shadows         */
/*  Dark : original white-tint glass, inner glow            */
const GLASS_CSS = `
.gf{
  --gf-glass:linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,255,255,0.62));
  --gf-border:rgba(0,0,0,0.06);
  --gf-shadow:0 0 1px rgba(0,0,0,0.04),0 2px 8px rgba(0,0,0,0.04),inset 0 1px 0 rgba(255,255,255,0.8);
  --gf-sep:rgba(0,0,0,0.06);
  --gf-dim:rgba(0,0,0,0.42);
  --gf-mid:rgba(0,0,0,0.55);
  --gf-hi:rgba(0,0,0,0.88);
  --gf-hover:rgba(0,0,0,0.025);
  --gf-toggle-on:#007AFF;
  --gf-toggle-off:rgba(0,0,0,0.1);
  --gf-seg-bg:rgba(0,0,0,0.04);
  --gf-seg-active:rgba(0,0,0,0.07);
  --gf-knob:#fff;
  --gf-knob-border:rgba(0,0,0,0.08);
  --gf-knob-shadow:0 1px 3px rgba(0,0,0,0.12);
  --gf-ghost:rgba(0,0,0,0.03);
  --gf-ghost-h:rgba(0,0,0,0.06)
}
.dark .gf,[data-theme="dark"] .gf{
  --gf-glass:linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02));
  --gf-border:rgba(255,255,255,0.07);
  --gf-shadow:0 1px 3px rgba(0,0,0,0.08),inset 0 1px 0 rgba(255,255,255,0.04);
  --gf-sep:rgba(255,255,255,0.06);
  --gf-dim:rgba(255,255,255,0.28);
  --gf-mid:rgba(255,255,255,0.5);
  --gf-hi:rgba(255,255,255,0.88);
  --gf-hover:rgba(255,255,255,0.015);
  --gf-toggle-on:#0A84FF;
  --gf-toggle-off:rgba(255,255,255,0.1);
  --gf-seg-bg:rgba(255,255,255,0.04);
  --gf-seg-active:rgba(255,255,255,0.09);
  --gf-knob:#fff;
  --gf-knob-border:rgba(255,255,255,0.06);
  --gf-knob-shadow:0 1px 3px rgba(0,0,0,0.15);
  --gf-ghost:rgba(255,255,255,0.02);
  --gf-ghost-h:rgba(255,255,255,0.05)
}`;

/* ── palette ───────────────────────────────────────────── */
const P = {
  glass: "var(--gf-glass)",
  glassBorder: "var(--gf-border)",
  glassShadow: "var(--gf-shadow)",
  separator: "var(--gf-sep)",
  dim: "var(--gf-dim)",
  mid: "var(--gf-mid)",
  hi: "var(--gf-hi)",
  accent: "hsl(var(--primary))",
  accentFg: "hsl(var(--primary-foreground))",
  toggleOn: "var(--gf-toggle-on)",
  toggleOff: "var(--gf-toggle-off)",
  segBg: "var(--gf-seg-bg)",
  segActive: "var(--gf-seg-active)",
  hoverRow: "var(--gf-hover)",
  knob: "var(--gf-knob)",
  knobBorder: "var(--gf-knob-border)",
  knobShadow: "var(--gf-knob-shadow)",
  ghost: "var(--gf-ghost)",
  ghostHover: "var(--gf-ghost-h)",
};

/* ── context ───────────────────────────────────────────── */
const FormCtx = React.createContext({ sound: true });

/* ═══════════════════════════════════════════════════════════
   GlassForm — outer <form> wrapper
   ═══════════════════════════════════════════════════════════ */
interface GlassFormProps {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  sound?: boolean;
  style?: React.CSSProperties;
}

function GlassForm({
  children,
  onSubmit,
  sound = true,
  style,
}: GlassFormProps) {
  return (
    <FormCtx.Provider value={{ sound }}>
      <style>{GLASS_CSS}</style>
      <motion.form
        className="gf"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        onSubmit={(e) => {
          e.preventDefault();
          if (sound) tick();
          onSubmit?.(e);
        }}
        style={{
          width: "100%",
          maxWidth: 380,
          display: "flex",
          flexDirection: "column",
          gap: 24,
          ...style,
        }}
      >
        {children}
      </motion.form>
    </FormCtx.Provider>
  );
}

/* ═══════════════════════════════════════════════════════════
   FormGroup — rounded glass container grouping rows
   ═══════════════════════════════════════════════════════════ */
interface FormGroupProps {
  title?: string;
  footer?: string;
  children: React.ReactNode;
}

function FormGroup({ title, footer, children }: FormGroupProps) {
  const items = React.Children.toArray(children).filter(Boolean);

  return (
    <div>
      {title && (
        <div
          style={{
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: P.dim,
            padding: "0 16px 7px",
          }}
        >
          {title}
        </div>
      )}
      <div
        style={{
          borderRadius: 14,
          background: P.glass,
          border: `1px solid ${P.glassBorder}`,
          boxShadow: P.glassShadow,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          overflow: "hidden",
        }}
      >
        {items.map((child, i) => (
          <React.Fragment key={i}>
            {i > 0 && (
              <div
                style={{
                  height: 1,
                  background: P.separator,
                  marginLeft: 16,
                }}
              />
            )}
            {child}
          </React.Fragment>
        ))}
      </div>
      {footer && (
        <div
          style={{
            fontSize: 12,
            color: P.dim,
            padding: "6px 16px 0",
            lineHeight: "1.45",
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   FormField — label + text input row
   ═══════════════════════════════════════════════════════════ */
interface FormFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
}

function FormField({
  label,
  type = "text",
  placeholder,
  value,
  defaultValue,
  onChange,
  disabled,
  autoFocus,
}: FormFieldProps) {
  const [showPass, setShowPass] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const isPassword = type === "password";

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        minHeight: 44,
        opacity: disabled ? 0.35 : 1,
        background: hover && !disabled ? P.hoverRow : "transparent",
        transition: "background 120ms",
      }}
    >
      <label
        style={{
          fontSize: 15,
          color: P.hi,
          flexShrink: 0,
          minWidth: 100,
        }}
      >
        {label}
      </label>
      <input
        type={isPassword && showPass ? "text" : type}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        autoFocus={autoFocus}
        style={{
          flex: 1,
          fontSize: 15,
          color: P.hi,
          background: "transparent",
          border: "none",
          outline: "none",
          textAlign: "right",
          padding: "11px 0",
          fontFamily: "inherit",
        }}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPass(!showPass)}
          style={{
            background: "none",
            border: "none",
            color: P.dim,
            cursor: "pointer",
            padding: "0 0 0 8px",
            fontSize: 12,
            fontFamily: "inherit",
            transition: "color 150ms",
          }}
        >
          {showPass ? "Hide" : "Show"}
        </button>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   FormToggle — label + iOS-style toggle
   ═══════════════════════════════════════════════════════════ */
interface FormToggleProps {
  label: string;
  description?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

function FormToggle({
  label,
  description,
  checked,
  defaultChecked,
  onChange,
}: FormToggleProps) {
  const { sound } = React.useContext(FormCtx);
  const [internal, setInternal] = React.useState(defaultChecked ?? false);
  const [hover, setHover] = React.useState(false);
  const active = checked !== undefined ? checked : internal;

  const toggle = () => {
    if (sound) tick();
    const next = !active;
    if (onChange) onChange(next);
    else setInternal(next);
  };

  return (
    <div
      role="switch"
      tabIndex={0}
      aria-checked={active}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          toggle();
        }
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        minHeight: 44,
        cursor: "pointer",
        userSelect: "none",
        background: hover ? P.hoverRow : "transparent",
        transition: "background 120ms",
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 15, color: P.hi }}>{label}</div>
        {description && (
          <div style={{ fontSize: 12, color: P.dim, marginTop: 1 }}>
            {description}
          </div>
        )}
      </div>
      <div
        style={{
          width: 48,
          height: 28,
          borderRadius: 14,
          background: active ? P.toggleOn : P.toggleOff,
          padding: 2,
          transition: "background 200ms ease",
          flexShrink: 0,
        }}
      >
        <motion.div
          animate={{ x: active ? 20 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            background: P.knob,
            border: active
              ? `1.5px solid color-mix(in srgb, ${P.toggleOn} 40%, transparent)`
              : `1px solid ${P.knobBorder}`,
            boxShadow: active
              ? `inset 0 0 4px color-mix(in srgb, ${P.toggleOn} 20%, transparent), 0 1px 4px rgba(0,0,0,0.18)`
              : P.knobShadow,
          }}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   FormSegment — label + segmented control
   ═══════════════════════════════════════════════════════════ */
interface SegmentOption {
  label: string;
  value: string;
}

interface FormSegmentProps {
  label: string;
  options: SegmentOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

function FormSegment({
  label,
  options,
  value,
  defaultValue,
  onChange,
}: FormSegmentProps) {
  const { sound } = React.useContext(FormCtx);
  const id = React.useId();
  const [internal, setInternal] = React.useState(
    defaultValue || options[0]?.value,
  );
  const active = value !== undefined ? value : internal;

  const select = (v: string) => {
    if (sound) tick();
    if (onChange) onChange(v);
    else setInternal(v);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        minHeight: 44,
      }}
    >
      <div style={{ fontSize: 15, color: P.hi, flex: 1 }}>{label}</div>
      <div
        style={{
          display: "flex",
          background: P.segBg,
          borderRadius: 8,
          padding: 2,
          position: "relative",
        }}
      >
        {options.map((opt) => {
          const isActive = active === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => select(opt.value)}
              style={{
                position: "relative",
                zIndex: 1,
                padding: "5px 14px",
                fontSize: 13,
                fontWeight: isActive ? 500 : 400,
                color: isActive ? P.hi : P.dim,
                background: "transparent",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "color 150ms",
              }}
            >
              {isActive && (
                <motion.div
                  layoutId={`seg-${id}`}
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: P.segActive,
                    borderRadius: 6,
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <span style={{ position: "relative" }}>{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   FormButton — action button
   ═══════════════════════════════════════════════════════════ */
interface FormButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "glass" | "text";
  type?: "submit" | "button";
  onClick?: () => void;
  disabled?: boolean;
}

function FormButton({
  children,
  variant = "primary",
  type = "submit",
  onClick,
  disabled,
}: FormButtonProps) {
  const { sound } = React.useContext(FormCtx);
  const [hover, setHover] = React.useState(false);

  const isPrimary = variant === "primary";
  const isText = variant === "text";

  return (
    <motion.button
      type={type}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={() => {
        if (disabled) return;
        if (sound) tick();
        onClick?.();
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      disabled={disabled}
      style={{
        width: "100%",
        padding: isText ? "8px 0" : "12px 0",
        fontSize: 15,
        fontWeight: isPrimary ? 600 : 500,
        letterSpacing: isPrimary ? "-0.01em" : undefined,
        color: isPrimary ? P.accentFg : isText ? P.accent : P.hi,
        background: isPrimary
          ? P.accent
          : isText
            ? "transparent"
            : hover
              ? P.ghostHover
              : P.ghost,
        filter: isPrimary && hover ? "brightness(1.1)" : undefined,
        border: isPrimary || isText ? "none" : `1px solid ${P.glassBorder}`,
        borderRadius: isText ? 0 : 14,
        cursor: disabled ? "default" : "pointer",
        fontFamily: "inherit",
        transition: "all 150ms",
        opacity: disabled ? 0.35 : 1,
        boxShadow: isPrimary
          ? "0 1px 3px rgba(0,0,0,0.12)"
          : isText
            ? "none"
            : P.glassShadow,
      }}
    >
      {children}
    </motion.button>
  );
}

/* ── exports ───────────────────────────────────────────── */
export { GlassForm, FormGroup, FormField, FormToggle, FormSegment, FormButton };
export type {
  GlassFormProps,
  FormGroupProps,
  FormFieldProps,
  FormToggleProps,
  FormSegmentProps,
  FormButtonProps,
};
