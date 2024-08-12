import { motion } from "framer-motion";

const NameTitle = () => {
  return (
    <div className="bottom-0 left-1/2 ">
      <h1 className="text-2xl xl:text-4xl font-bold">
        <a href="/">Mustafa Serhat Uslu</a>
      </h1>
      <svg className="w-[14.5rem] xl:w-[21rem] h-1">
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
