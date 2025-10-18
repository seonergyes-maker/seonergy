import { motion } from "framer-motion";

interface MenuIconProps {
  isOpen: boolean;
}

export default function MenuIcon({ isOpen }: MenuIconProps) {
  return (
    <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
      <motion.span
        animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-0.5 bg-current rounded-full origin-center"
      />
      <motion.span
        animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full h-0.5 bg-current rounded-full"
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-0.5 bg-current rounded-full origin-center"
      />
    </div>
  );
}
