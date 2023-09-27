import React from "react";
import { Container, Typography } from "@mui/material";

import LoadingCss from "./LoadingCss.module.css";
const Loading = () => {
  return (
    <Container className={LoadingCss.container}>
      <div className={LoadingCss.position}>
        <img
          src="/img/animation_lmnjb4q6_small.gif"
          alt="Loading-animation"
          className={LoadingCss.img}
        />
        <div>
          <Typography variant="h4">Vui Lòng Đợi...</Typography>
        </div>
      </div>
    </Container>
  );
};

export default Loading;
