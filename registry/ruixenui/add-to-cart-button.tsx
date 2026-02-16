"use client";

import { motion, AnimatePresence, type Transition } from "motion/react";
import { useState } from "react";

/**
 * Add-to-cart morphing button — Rauno Freiberg style.
 *
 * Design rules applied:
 *   1. Monochrome — neutral-900 / white / one muted accent
 *   2. Spring physics everywhere — no cubic-bezier, real springs
 *   3. One morphing container — layout animates via spring
 *   4. Content crossfades — whole phrase, not per-character
 *   5. Only transform + opacity — zero filter:blur
 *   6. Fewer elements — no pills-in-pills, no checkmarks, no icons
 *   7. Slot-machine flip — the only "flashy" detail, earned
 *   8. Hover & press feel physical — scale springs with overshoot
 */

/* ── spring presets ── */

const SPRING_LAYOUT: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

const SPRING_CONTENT: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 25,
};

const SPRING_TAP: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 30,
};

/* ── component ── */

interface AddToCartButtonProps {
  price?: number;
  currency?: string;
  maxQuantity?: number;
  onQuantityChange?: (quantity: number) => void;
}

export function AddToCartButton({
  price = 24.99,
  currency = "$",
  maxQuantity = 99,
  onQuantityChange,
}: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);
  const [locked, setLocked] = useState(false);

  const total = `${currency}${(price * qty).toFixed(2)}`;

  const lock = () => {
    setLocked(true);
    setTimeout(() => setLocked(false), 350);
  };

  const add = () => {
    if (locked) return;
    lock();
    setAdded(true);
    setQty(1);
    onQuantityChange?.(1);
  };

  const minus = () => {
    if (qty <= 1) {
      if (locked) return;
      lock();
      setAdded(false);
      onQuantityChange?.(0);
      return;
    }
    const n = qty - 1;
    setQty(n);
    onQuantityChange?.(n);
  };

  const plus = () => {
    const n = Math.min(qty + 1, maxQuantity);
    setQty(n);
    onQuantityChange?.(n);
  };

  return (
    <div className="flex items-center justify-center">
      <AnimatePresence mode="popLayout" initial={false}>
        {!added ? (
          /* ────────────────────────────────────
             STATE A — "Add to cart"
             Quiet, confident, one surface.
          ──────────────────────────────────── */
          <motion.button
            key="idle"
            layoutId="cart"
            onClick={add}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            style={{ pointerEvents: locked ? "none" : "auto" }}
            className="relative flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-5 py-3 text-[14px] font-medium text-white outline-none cursor-pointer select-none border border-white/[0.08]"
            transition={{
              layout: SPRING_LAYOUT,
              scale: SPRING_TAP,
            }}
          >
            <motion.span
              key="label-add"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={SPRING_CONTENT}
            >
              Add to cart
            </motion.span>
          </motion.button>
        ) : (
          /* ────────────────────────────────────
             STATE B — Quantity controls
             Same surface, wider. Minimal controls.
          ──────────────────────────────────── */
          <motion.div
            key="active"
            layoutId="cart"
            style={{ pointerEvents: locked ? "none" : "auto" }}
            className="relative flex items-center gap-3 rounded-xl bg-neutral-900 px-4 py-2.5 text-[14px] font-medium text-white border border-white/[0.08] select-none"
            transition={{
              layout: SPRING_LAYOUT,
            }}
          >
            {/* ── Minus ── */}
            <motion.button
              onClick={minus}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.85 }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={SPRING_CONTENT}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors duration-150 cursor-pointer outline-none"
            >
              <span className="text-[16px] leading-none">−</span>
            </motion.button>

            {/* ── Quantity — slot-machine flip ── */}
            <motion.div
              className="relative flex h-7 w-8 items-center justify-center overflow-hidden"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ ...SPRING_CONTENT, delay: 0.03 }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={qty}
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 28,
                  }}
                  className="absolute tabular-nums"
                >
                  {qty}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            {/* ── Plus ── */}
            <motion.button
              onClick={plus}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.85 }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={SPRING_CONTENT}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors duration-150 cursor-pointer outline-none"
            >
              <span className="text-[16px] leading-none">+</span>
            </motion.button>

            {/* ── Divider ── */}
            <motion.div
              className="h-4 w-px bg-white/[0.1]"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0 }}
              transition={SPRING_CONTENT}
            />

            {/* ── Price — slot-machine flip ── */}
            <motion.div
              className="relative flex h-7 items-center justify-center overflow-hidden min-w-[60px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ ...SPRING_CONTENT, delay: 0.05 }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={total}
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 28,
                  }}
                  className="absolute text-neutral-400 tabular-nums text-[13px]"
                >
                  {total}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AddToCartButton;
