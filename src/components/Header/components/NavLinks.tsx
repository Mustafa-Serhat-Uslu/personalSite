import { motion } from "framer-motion";

const itemMotion = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
};

const itemMotionDesktop = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 1, x: 0 },
};

const navLinks = [
  { name: "About", href: "/", id: 1 },
  { name: "Experience", href: "/experience", id: 2 },
  { name: "Projects", href: "/projects", id: 3 },
];
export const NavLinks = ({
  isMobile,
  className,
}: {
  isMobile: boolean;
  className: string;
}) => (
  <div className={className}>
    {navLinks.map(({ name, href, id }) => (
      <motion.a
        key={id}
        variants={isMobile ? itemMotion : itemMotionDesktop}
        href={href}
      >
        {name}
      </motion.a>
    ))}
  </div>
);
