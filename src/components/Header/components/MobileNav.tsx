import { motion } from "framer-motion";
import { NavLinks } from "./NavLinks";

const navMotion = {
  visible: {
    opacity: 1,

    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
  hidden: {
    opacity: 0,
  },
};

export const MobileNav = ({ setToggled, toggled }) => {
  return (
    <>
      <motion.div
        animate={{ opacity: 1, x: 25 }}
        initial={{ opacity: 1, x: 25 }}
        transition={{ delay: 0.35 }}
        onClick={() => setToggled((prevToggle) => !prevToggle)}
        className={`burger z-50 cursor-pointer space-y-1.5 lg:hidden
    `}
      >
        <motion.div
          animate={{ rotateZ: toggled ? 45 : 0, y: toggled ? 8 : 0 }}
          className="line-1 block h-0.5 w-8 bg-content bg-black"
        ></motion.div>

        <motion.span
          animate={{ width: toggled ? 0 : 24 }}
          className="line-2 block h-0.5 w-6 bg-content bg-black"
        ></motion.span>
        <motion.span
          animate={{
            rotateZ: toggled ? -45 : 0,
            y: toggled ? -8 : 0,
            width: toggled ? 32 : 24,
          }}
          className="line-3 block h-0.5 w-4 bg-content bg-black"
        ></motion.span>
      </motion.div>

      {toggled && (
        <motion.div
          variants={navMotion}
          animate="visible"
          initial="hidden"
          className="fixed left-0 top-0  z-40 flex h-screen
    w-full flex-col items-center  justify-center  gap-24 bg-white text-2xl font-bold"
        >
          <NavLinks
            className=" flex flex-col gap-24 text-lg "
            isMobile={true}
          />
        </motion.div>
      )}
    </>
  );
};
