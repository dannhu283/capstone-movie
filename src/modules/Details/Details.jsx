import React from "react";
import { useParams } from "react-router-dom";
import { DetailsContainer } from "./index";
import MovieProfile from "./MovieProfile";
import Showtimes from "./Showtimes";

export default function Details() {
  const { movieId } = useParams();

  return (
    <DetailsContainer>
      <MovieProfile movieId={movieId} />
      <Showtimes movieId={movieId} />
    </DetailsContainer>
  );
}
