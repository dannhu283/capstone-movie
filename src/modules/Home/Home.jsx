import React from "react";
import Banner from "./Banner";
import Showing from "./Showing";
import Cinema from "./Cinema";
import Loading from "../../components/Loading";

export default function Home() {
  return (
    <div>
      <Banner />
      <Showing />
      <Cinema />
    </div>
  );
}
