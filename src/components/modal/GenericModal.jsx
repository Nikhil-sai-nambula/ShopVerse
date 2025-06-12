import React from "react";
import { Box, Modal } from "@mui/material";

const defaultStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function GenericModal({ open, onClose, children, sx }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...defaultStyle, ...sx }}>{children}</Box>
    </Modal>
  );
}
