import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getMovies } from "../../../apis/movieAPI";
import Loading from "../../../components/Loading";

export default function Showing() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });

  const navigate = useNavigate();

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <ul>
          {data.map((movie) => {
            return (
              <li key={movie.maPhim}>
                <span>{movie.tenPhim}</span>
                <button onClick={() => navigate(`/movies/${movie.maPhim}`)}>
                  Mua vé
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
