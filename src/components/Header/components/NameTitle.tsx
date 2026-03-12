import { motion } from "framer-motion";

const name = "Mustafa Serhat Uslu";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.1,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 24, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring" as const,
      stiffness: 180,
      damping: 14,
    },
  },
};

const NameTitle = () => {
  return (
    <div className="bottom-0 left-1/2" style={{ perspective: "600px" }}>
      <motion.h1
        className="flex overflow-hidden text-2xl font-bold xl:text-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        aria-label={name}
      >
        {name.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={letterVariants}
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>
      <svg className="h-1 w-[14.5rem] xl:w-[21rem]">
        <motion.path
          animate={{ pathLength: 1, opacity: 1 }}
          initial={{ pathLength: 0, opacity: 0 }}
          transition={{ delay: 1, duration: 0.75 }}
          d="M2 2L428 1.99996"
          stroke="#282828"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default NameTitle;
