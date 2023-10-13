import { Box, CircularProgress } from "@mui/material";
import React from "react";

export default function LoadingComponent() {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
}
