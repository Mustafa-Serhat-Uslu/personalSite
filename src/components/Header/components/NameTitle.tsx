import { motion } from "framer-motion";

const NameTitle = () => {
  return (
    <div className="bottom-0 left-1/2 ">
      <h1 className="text-2xl font-bold">
        <a href="/">Mustafa Serhat Uslu</a>
      </h1>
      <svg width="240" height="4" viewBox="0 0 250 4">
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
