import { motion } from "framer-motion";
import { Box } from "@mui/material";
import React from "react";

const WaterfallEffect = ({ children, props }) => {
  const childArray = React.Children.toArray(children);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        overflow: "hidden",
      }}
    >
      {childArray.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ amount: 0.2 }}
        >
          {child}
        </motion.div>
      ))}
    </Box>
  );
};

export default WaterfallEffect;
