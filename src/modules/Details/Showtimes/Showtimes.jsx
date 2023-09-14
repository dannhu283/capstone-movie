import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { getMovieShowtimes } from "../../../apis/cinemaAPI";

export default function Showtimes({ movieId }) {
  const [cinemas, setCinemas] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ["movieShowtimes", movieId],
    queryFn: () => getMovieShowtimes(movieId),
    enabled: !!movieId,
  });

  const cinemaSystems = data?.heThongRapChieu || [];

  const handleGetCinemaSystem = (cinemaSystemId) => {
    const found = cinemaSystems.find(
      (item) => item.maHeThongRap === cinemaSystemId
    );

    setCinemas(found.cumRapChieu);
  };

  useEffect(() => {
    if (cinemaSystems.length > 0) {
      setCinemas(cinemaSystems[0].cumRapChieu);
    }
  }, [cinemaSystems]);

  return (
    <div>
      {/* Render hệ thống rạp */}
      {cinemaSystems.map((cinemaSystem) => {
        return (
          <div key={cinemaSystem.maHeThongRap}>
            <img
              src={cinemaSystem.logo}
              alt=""
              width={50}
              height={50}
              onClick={() => handleGetCinemaSystem(cinemaSystem.maHeThongRap)}
            />
          </div>
        );
      })}

      {/* Render danh sách rạp */}
      {cinemas.map((cinema) => {
        return (
          <div>
            <h3>{cinema.tenCumRap}</h3>
            {/* Render lịch chiếu */}
            {cinema.lichChieuPhim.map((showtime) => {
              const time = dayjs(showtime.ngayChieuGioChieu).format(
                "DD-MM-YYYY ~ HH:mm"
              );

              // onClick={() => navigate(`/tickets/${showtime.maLichChieu}`)}
              return <button>{time}</button>;
            })}
          </div>
        );
      })}
    </div>
  );
}
