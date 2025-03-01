import { motion } from "framer-motion";

export function TextEffect({ children, per, preset }) {
  if (per !== "char") return <span>{children}</span>;

  const variants = {
    fade: { opacity: [0, 1], transition: { duration: 0.5, ease: "easeInOut" } },
  };

  return (
    <span style={{ display: "inline-flex", gap: "2px" }}>
      {children.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={variants}
          initial="hidden"
          animate="visible"
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}
