import React from "react";
import { useParams } from "react-router-dom";
import MovieProfile from "./MovieProfile";
import ShowTime from "./ShowTime";

export default function Details() {
  const { movieId } = useParams();
  return (
    <div>
      <MovieProfile movieId={movieId} />
      <ShowTime movieId={movieId} />
    </div>
  );
}
