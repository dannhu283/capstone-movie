import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { DetailsContainer } from "./index";
import MovieProfile from "./MovieProfile";
import Showtimes from "./Showtimes";
import Loading from "../../Components/Loading";
import { useEffect } from "react";

export default function Details() {
  const { movieId } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading screen for 2 seconds after the page reloads
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <DetailsContainer>
      <MovieProfile movieId={movieId} />
      <Showtimes movieId={movieId} />
    </DetailsContainer>
  );
}
