import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { getMovieShowtimes } from "../../../apis/cinemaAPI";
import { Container, Tabs, Tab, Box, Typography, Button } from "@mui/material";
import { ShowTime, ButtonCustom, DivNote } from "./index";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import Loading from "../../../components/Loading";

export default function Showtimes({ movieId }) {
  const navigate = useNavigate();
  const [cinemas, setCinemas] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);

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

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    const selectedCinemaSystem = cinemaSystems[newValue];
    handleGetCinemaSystem(selectedCinemaSystem.maHeThongRap);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <ShowTime>
        {/* Neếu không có phim thì render ra DivNote */}
        {cinemas.length === 0 ? (
          <DivNote>
            <img
              src="/img/animation_lmpy84nt_small.gif"
              alt="empty"
              width={200}
            />
            <Typography variant="h5">Chưa công chiếu..</Typography>
            <Button
              variant="contained"
              startIcon={<MovieFilterIcon />}
              color="success"
              sx={{ margin: "10% 0" }}
              onClick={() => navigate("/")}
            >
              Chọn Phim Khác
            </Button>
          </DivNote>
        ) : (
          <>
            {/* Render MUI Tabs for cinema systems */}
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              orientation="vertical"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="Cinema Systems"
              sx={{ width: "20%" }}
            >
              {cinemaSystems.map((cinemaSystem, index) => (
                <Tab
                  key={cinemaSystem.maHeThongRap}
                  label={
                    <img
                      src={cinemaSystem.logo}
                      alt="logo"
                      width={50}
                      height={50}
                      style={{ cursor: "pointer" }}
                    />
                  }
                />
              ))}
            </Tabs>

            {/* Render selected cinema's showtimes */}
            <Box sx={{ width: "80%", margin: "15px 20px" }}>
              {cinemas.map((cinema) => (
                <div key={cinema.maCumRap}>
                  <Typography variant="h5" color={"#3ae374"}>
                    {cinema.tenCumRap}
                  </Typography>
                  {cinema.lichChieuPhim.map((showtime) => {
                    const time = dayjs(showtime.ngayChieuGioChieu).format(
                      "DD-MM-YYYY ~ HH:mm"
                    );
                    return (
                      <ButtonCustom key={showtime.maLichChieu}>
                        {time}
                      </ButtonCustom>
                    );
                  })}
                </div>
              ))}
            </Box>
          </>
        )}
      </ShowTime>
    </Container>
  );
}
