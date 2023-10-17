import React from "react";
import Banner from "./Banner";
import Showing from "./Showing";
import Cinema from "./Cinema";
import New from "./New/New";
import { useParams } from "react-router-dom";
import { CinemaMedia } from "./index";
import { Box } from "@mui/material";

export default function Home() {
  const { theaterId } = useParams();
  return (
    <Box>
      <Banner />
      <Showing />
      <CinemaMedia id="cinema">
        <Cinema theaterId={theaterId} />
      </CinemaMedia>
      <New />
    </Box>
  );
}
