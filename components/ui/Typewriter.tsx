"use client";
import { motion } from "framer-motion";

export const Typewriter = ({ text, speed = 0.05 }: { text: string; speed?: number }) => {
  const words = text.split(" ");

  return (
    <motion.span>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{
            duration: 0.2,
            delay: i * speed,
            ease: "easeOut",
          }}
          className="inline-block"
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </motion.span>
  );
};