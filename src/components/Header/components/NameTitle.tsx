import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const name = "Mustafa Serhat Uslu";
const chars = name.split("");

const INK = "#282828";

// entrance
const START = 0.15;
const STEP = 0.04;

// how strongly a letter reacts to the cursor, by distance in letters
const magnet = (distance: number) => Math.max(0, 1 - distance / 3);

const NameTitle = () => {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="bottom-0 left-1/2">
      <motion.h1
        className="flex overflow-hidden pt-1 text-2xl font-bold xl:text-4xl"
        style={{ perspective: 800, color: INK }}
        onMouseLeave={() => setHovered(null)}
        aria-label={name}
      >
        {chars.map((char, i) => {
          const pull = hovered === null ? 0 : magnet(Math.abs(i - hovered));

          return (
            <motion.span
              key={i}
              onMouseEnter={() => setHovered(i)}
              style={{ display: "inline-block", whiteSpace: "pre" }}
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { y: 44, opacity: 0, rotateX: -80, filter: "blur(8px)" }
              }
              animate={
                reduceMotion
                  ? { opacity: 1 }
                  : {
                      y: -12 * pull,
                      opacity: 1,
                      rotateX: 0,
                      scale: 1 + 0.18 * pull,
                      filter: "blur(0px)",
                    }
              }
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 18,
                delay: hovered === null ? START + i * STEP : 0,
                filter: { duration: 0.45, delay: START + i * STEP },
                opacity: { duration: 0.45, delay: START + i * STEP },
              }}
            >
              {char}
            </motion.span>
          );
        })}
      </motion.h1>
    </div>
  );
};

export default NameTitle;
