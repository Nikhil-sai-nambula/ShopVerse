import { Alert, Snackbar } from "@mui/material";

export default function SuccessfullSnackBar({ message, open, onClose }) {
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={1500}
        onClose={onClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity="success"
          variant="standard"
          onClose={onClose}
          sx={{
            display: "flex",
            justifyContent: "center",
            fontSize: { xs: "2vw", lg: "1vw" },
            bgcolor: "lightGreen",
            color: "black",
          }}
        >
          {message || "Successful"}
        </Alert>
      </Snackbar>
    </>
  );
}
