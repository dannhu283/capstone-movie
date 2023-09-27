import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieShowtimes } from "../../../APIs/cinemaAPI";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import dayjs from "dayjs";
import { ButtonMain } from "../../../Components/ButtonMain";

export default function SearchFilm({ movies }) {
  const [movie, setMovie] = useState("");
  const [cinema, setCinema] = useState("");
  const [date, setDate] = useState("");
  const [dateCinemas, setDateCinemas] = useState([]);
  const [codeTimeCinema, setCodeTimeCinema] = useState("");
  const [errors, setErrors] = useState(false);

  const { data: cinemas = [] } = useQuery({
    queryKey: ["listCinema", movie],
    queryFn: () => getMovieShowtimes(movie),
    enabled: !!movie,
  });

  const navigate = useNavigate();

  const handleChangeMovie = (event) => {
    setMovie(event.target.value);
  };
  const handleChangeCinema = (event) => {
    setCinema(event.target.value);
    setDateCinemas(event.target.value.cumRapChieu);
  };
  const handleChangeDate = (event) => {
    setDate(event.target.value);
  };

  return (
    <Paper
      style={{
        position: "absolute",
        width: "100%",
        height: "70px",
        zIndex: "1000",
        top: "-100px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <FormControl sx={{ m: 1, minWidth: 80, width: 1 / 4 }} color="warning">
          <InputLabel id="demo-simple-select-autowidth-label">Phim</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={movie}
            onChange={handleChangeMovie}
            error={!!errors}
            autoWidth
            label="Phim"
          >
            <MenuItem value="">
              <em>Phim</em>
            </MenuItem>
            {movies.map((movie) => {
              return (
                <MenuItem key={movie.maPhim} value={movie.maPhim}>
                  {movie.tenPhim}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 80, width: 1 / 4 }} color="warning">
          <InputLabel id="demo-simple-select-autowidth-label">Rạp</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={cinema}
            onChange={handleChangeCinema}
            error={!!errors}
            autoWidth
            label="Rạp"
          >
            <MenuItem value="">
              <em>Rạp</em>
            </MenuItem>
            {cinemas.heThongRapChieu?.map((cinema) => {
              return (
                <MenuItem key={cinema.maHeThongRap} value={cinema}>
                  {cinema.tenHeThongRap}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 80, width: 1 / 4 }} color="warning">
          <InputLabel id="demo-simple-select-autowidth-label">
            Ngày giờ chiếu
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={date}
            onChange={handleChangeDate}
            error={!!errors}
            autoWidth
            label="Ngày giờ chiếu"
          >
            <MenuItem value="">
              <em>Ngày Giờ Chiêú</em>
            </MenuItem>

            {dateCinemas.map((dateCinema) => {
              return (
                <MenuItem key={dateCinema.maCumRap} value={dateCinema.maCumRap}>
                  {dateCinema.lichChieuPhim.map((showtime) => {
                    const time = dayjs(showtime.ngayChieuGioChieu).format(
                      "DD-MM-YYYY ~ HH:mm"
                    );
                    return (
                      <em
                        key={showtime.maLichChieu}
                        onClick={() => {
                          setCodeTimeCinema(showtime.maLichChieu);
                        }}
                      >
                        {time}
                      </em>
                    );
                  })}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <ButtonMain
          onClick={() => {
            if (!codeTimeCinema) {
              setErrors(true);
              navigate("/");
            } else {
              navigate(`tickets/${codeTimeCinema}`);
            }
          }}
        >
          mua vé ngay
        </ButtonMain>
      </Box>
    </Paper>
  );
}
