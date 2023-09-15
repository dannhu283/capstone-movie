import { Button } from "@mui/material";
import React from "react";
import Error from "./Error.module.css";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const nagigate = useNavigate();
  return (
    <div className={Error.bg}>
      <Button
        className={Error.local}
        sx={{
          color: "primary",
          position: "absolute",
          bottom: "10%",
          left: "47%",
        }}
        variant="contained"
        onClick={() => nagigate("/")}
      >
        Về Trang chủ
      </Button>
    </div>
  );
}
