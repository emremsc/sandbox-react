"use client";

import * as React from "react";
import useMeasure from "react-use-measure";
import { AnimatePresence, motion } from "motion/react";
import { useLoop } from "./use-loop";
import { mergeRefs } from "./merge-refs";

const user = { email: "yo@rauno.me" };

export function Morphing() {
  const [ref, bounds] = useMeasure();
  const [active, ref2] = useLoop();

  return (
    <div className="absolute translate-center-x">
      <div className="[--footer-bg:var(--color-low-contrast)] dark:[--footer-bg:var(--color-gray3)] gap-6 h-[44px] overflow-hidden relative w-fit bg-(--footer-bg) px-3  shadow-menu rounded-full flex items-center justify-center select-none overflow-hidden whitespace-nowrap ">
        <motion.div
          animate={{ width: bounds.width > 0 ? bounds.width : "auto" }}
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 55,
          }}
        >
          <div
            ref={mergeRefs([ref, ref2])}
            className="flex items-center gap-2 w-fit [&>svg]:w-5 [&>svg]:h-5"
          >
            <Logo />
            <div className="text-14 text-gray12">
              <AnimatePresence mode="popLayout" initial={false}>
                {active?.split("").map((letter, index) => {
                  return (
                    <motion.div
                      initial={{ opacity: 0, filter: "blur(2px)" }}
                      animate={{
                        opacity: 1,
                        filter: "blur(0px)",
                        transition: {
                          type: "spring",
                          stiffness: 350,
                          damping: 55,
                          delay: index * 0.015,
                        },
                      }}
                      exit={{
                        opacity: 0,
                        filter: "blur(2px)",
                        transition: {
                          type: "spring",
                          stiffness: 500,
                          damping: 55,
                        },
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 55,
                      }}
                      key={index + letter + active}
                      className="inline-block"
                    >
                      {letter}
                      {letter === " " ? "\u00A0" : ""}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <div className="text-gray11 text-14 flex items-center z-2">
          <span className="ml-1 max-w-[20ch] truncate">{user?.email}</span>
          <IconArrowSeparateVertical />
        </div>
      </div>
    </div>
  );
}

function IconArrowSeparateVertical() {
  return (
    <svg
      width="16px"
      height="16px"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 6.5L8 3.5L11 6.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 9.5L8 12.5L5 9.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function Logo({
  className,
  size = 20,
  ...props
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div
      role="img"
      aria-label="Orange circle, logomark"
      className={`bg-orange h-(--size) w-(--size) rounded-full ${className}`}
      style={
        {
          "--size": `${size}px`,
        } as React.CSSProperties
      }
      {...props}
    />
  );
}
