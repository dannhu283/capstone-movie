import React from "react";
import Banner from "./Banner";
import Showing from "./Showing";
import Cinema from "./Cinema";
import { useParams } from "react-router-dom";

export default function Home() {
  const { theaterId } = useParams();
  return (
    <div>
      <Banner />
      <Showing />
      <Cinema theaterId={theaterId} />
    </div>
  );
}
