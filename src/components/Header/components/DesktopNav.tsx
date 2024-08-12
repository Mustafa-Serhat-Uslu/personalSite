import { motion } from "framer-motion";
// import { NavLinks } from "./NavLinks";

export const DesktopNav = () => {
  return (
    <motion.div
      animate={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: 25 }}
      transition={{ delay: 0.35 }}
      className="hidden lg:flex xl:items-center  xl:justify-center xl:gap-12 xl:text-lg"
    >
      {/* <NavLinks className="flex gap-12" isMobile={false} /> */}
    </motion.div>
  );
};
