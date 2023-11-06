import React from "react";
import { Box, Container, Typography } from "@mui/material";

import LoadingCss from "./LoadingCss.module.css";
const Loading = () => {
  return (
    <Container className={LoadingCss.container}>
      <div className={LoadingCss.position}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            src="/img/animation_lmnjb4q6_small.gif"
            alt="Loading-animation"
            className={LoadingCss.img}
          />
          <div>
            <Typography variant="h4">Vui Lòng Đợi...</Typography>
          </div>
        </Box>
      </div>
    </Container>
  );
};

export default Loading;
