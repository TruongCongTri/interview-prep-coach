"use client";
import { motion } from "framer-motion";

export const Typewriter = ({ text, speed = 0.05 }: { text: string; speed?: number }) => {
  const words = text.split(" ");

  return (
    <motion.span>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: "blur(2px)", y: 2 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{
            duration: 0.4,
            delay: i * speed,
            ease: [0.22, 1, 0.36, 1], // Smoother ease-out
          }}
          className="inline-block"
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </motion.span>
  );
};