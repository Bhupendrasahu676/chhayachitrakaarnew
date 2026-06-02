"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { ImageProps } from "next/image";

type MotionImageProps = ImageProps & {
  drift?: "left" | "right" | "up" | "none";
};

export function MotionImage({
  alt,
  className = "",
  drift = "up",
  ...props
}: MotionImageProps) {
  const reduceMotion = useReducedMotion();
  const axis = drift === "left" || drift === "right" ? "x" : "y";
  const start = drift === "right" ? -18 : drift === "left" ? 18 : 22;

  return (
    <motion.div
      className={`group overflow-hidden bg-stone-200 ${className}`}
      initial={reduceMotion || drift === "none" ? false : { opacity: 0, [axis]: start }}
      whileInView={reduceMotion || drift === "none" ? undefined : { opacity: 1, [axis]: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
    >
      <Image
        {...props}
        alt={alt}
        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
      />
    </motion.div>
  );
}
