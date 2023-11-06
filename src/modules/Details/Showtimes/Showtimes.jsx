import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { getMovieShowtimes } from "../../../APIs/cinemaAPI";
import {
  Container,
  Tabs,
  Tab,
  Box,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import { ShowTime, DivNote } from "./index";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import { ButtonCustom } from "../../../Components/ButtonMain";

export default function Showtimes({ movieId, handleIsLoading }) {
  const navigate = useNavigate();

  const [cinemas, setCinemas] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);

  const { data } = useQuery({
    queryKey: ["movieShowtimes", movieId],
    queryFn: () => getMovieShowtimes(movieId),
    enabled: !!movieId,
  });

  const cinemaSystems = useMemo(() => data?.heThongRapChieu || [], [data]);

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

  return (
    <Container>
      <ShowTime>
        {/* Nếu không có phim thì render ra DivNote */}
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
              sx={{ width: "20%", borderRight: "1px solid #8888885e" }}
            >
              {cinemaSystems.map((cinemaSystem, index) => (
                <Tab
                  key={cinemaSystem.maHeThongRap}
                  sx={{
                    alignItems: {
                      xs: "baseline",
                      sm: "center",
                    },
                    padding: {
                      xs: "12px 5px",
                      sm: "12px 16px",
                    },
                    borderBottom: "1px solid #8888885e",
                  }}
                  label={
                    <Avatar
                      src={cinemaSystem.logo}
                      alt="logo"
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
                  <Typography
                    variant="h5"
                    color={"#3ae374"}
                    sx={{
                      fontSize: {
                        xs: "16px",
                        sm: "24px",
                      },
                      marginLeft: "10px",
                    }}
                  >
                    {cinema.tenCumRap}
                  </Typography>
                  {cinema.lichChieuPhim.map((showtime) => {
                    const time = dayjs(showtime.ngayChieuGioChieu).format(
                      "DD-MM-YYYY ~ HH:mm"
                    );
                    return (
                      <ButtonCustom
                        onClick={() =>
                          navigate(`/tickets/${showtime.maLichChieu}`)
                        }
                        key={showtime.maLichChieu}
                      >
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
