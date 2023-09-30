import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getLogo,
  getInforTheater,
  getTheaterShowtimes,
} from "../../../APIs/cinemaAPI";
import Loading from "../../../Components/Loading";
import { Container } from "@mui/material";

export default function Cinema({ theaterId }) {
  const [inforTheaters, setInforTheater] = useState([]);

  const [listMovies, setListMovies] = useState([]);

  const { data = {}, isLoading } = useQuery({
    queryKey: ["logo", theaterId],
    queryFn: () => getLogo(theaterId),
  });

  const theaterSystems = data || [];

  const handleChangeTab = async (theaterSystemsId) => {
    try {
      const inforTheaters = await getInforTheater(theaterSystemsId);
      setInforTheater(inforTheaters);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetListMovie = async (inforTheaterId) => {
    try {
      const listMovies = await getTheaterShowtimes(inforTheaterId);
      setListMovies(listMovies);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <div>
        {theaterSystems.map((item) => (
          <img
            key={item.maHeThongRap}
            onClick={() => handleChangeTab(item.maHeThongRap)}
            src={item.logo}
            alt="logo"
            width={50}
            height={50}
            style={{ cursor: "pointer" }}
          />
        ))}
      </div>
      {inforTheaters.map((inforTheater) => (
        <div
          onClick={() => handleGetListMovie(inforTheater.maHeThongRap)}
          style={{ cursor: "pointer", border: "2px solid red", margin: "10px" }}
          key={inforTheater.maCumRap}
        >
          <p>{inforTheater.tenCumRap}</p>
          <p>{inforTheater.diaChi}</p>
        </div>
      ))}

      <div>
        {listMovies.map((rap) =>
          rap.lstCumRap.map((cumRap) =>
            cumRap.danhSachPhim.map((phim) => (
              <div>
                <img
                  src={phim.hinhAnh}
                  alt="hinhAnh"
                  width={100}
                  height={100}
                />
                <p>{phim.tenPhim}</p>
                {phim.lstLichChieuTheoPhim.map((lichChieu) => (
                  <p key={lichChieu.maLichChieu}>
                    Ngày giờ chiếu: {lichChieu.ngayChieuGioChieu}
                  </p>
                ))}
              </div>
            ))
          )
        )}
      </div>
    </Container>
  );
}
