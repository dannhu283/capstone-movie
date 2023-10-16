import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getLogo,
  getInfoTheater,
  getTheaterShowtimes,
} from "../../../APIs/cinemaAPI";
import Loading from "../../../Components/Loading";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Divider,
  Chip,
} from "@mui/material";
import { ButtonCustom } from "../../../Components/ButtonMain";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export default function Cinema({ theaterId }) {
  const [infoTheaters, setInfoTheater] = useState([]);

  const [listMovies, setListMovies] = useState([]);

  const [selectedTenCumRap, setSelectedTenCumRap] = useState(0);

  const [selectedTab, setSelectedTab] = useState(0);

  const navigate = useNavigate();

  const { data = [], isLoading } = useQuery({
    queryKey: ["logo", theaterId],
    queryFn: () => getLogo(theaterId),
  });

  const theaterSystems = data || [];

  const handleChangeTab = async (theaterSystemsId) => {
    try {
      const infoTheaters = await getInfoTheater(theaterSystemsId);
      setInfoTheater(infoTheaters);
      setSelectedTab(theaterSystemsId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetListMovie = async (infoTheaterId, tenCumRap) => {
    try {
      const listMovies = await getTheaterShowtimes(infoTheaterId);
      setListMovies(listMovies);
      setSelectedTenCumRap(tenCumRap);
    } catch (error) {
      console.log(error);
    }
  };

  //Set default value when no value has been selected
  useEffect(() => {
    if (theaterSystems.length > 0) {
      handleChangeTab(theaterSystems[0].maHeThongRap);
    }
  }, [theaterSystems]);

  useEffect(() => {
    if (infoTheaters.length > 0) {
      handleGetListMovie(
        infoTheaters[0].maHeThongRap,
        infoTheaters[0].tenCumRap
      );
    }
  }, [infoTheaters]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container
      style={{
        margin: "100px auto",
        borderRadius: "5px",
        height: "80vh",
        overflow: "hidden",
        boxShadow: " rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
      }}
    >
      <Grid container>
        <Grid item xs={1}>
          <Box sx={{ marginTop: "10px" }}>
            <Grid container>
              {theaterSystems.map((item) => (
                <Grid item key={item.maHeThongRap} xs={12}>
                  <Paper
                    onClick={() => handleChangeTab(item.maHeThongRap)}
                    style={{
                      marginBottom: "5px",
                      cursor: "pointer",
                      transition: "all 0.5s",
                      padding: "10px",
                      backgroundColor:
                        selectedTab === item.maHeThongRap
                          ? "#dfe4ea"
                          : "transparent",
                    }}
                  >
                    <img src={item.logo} alt="logo" style={{ width: "60%" }} />
                  </Paper>
                  <Divider />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={4} style={{ height: "80vh", overflowY: "scroll" }}>
          <Box>
            <Grid container>
              {infoTheaters.map((infoTheater) => (
                <Grid item key={infoTheater.maCumRap} xs={12}>
                  <Paper
                    onClick={() =>
                      handleGetListMovie(
                        infoTheater.maHeThongRap,
                        infoTheater.tenCumRap
                      )
                    }
                    style={{
                      cursor: "pointer",
                      transition: "all 0.5s",
                      padding: "16px",
                      margin: "10px  10px 0",
                      background:
                        selectedTenCumRap === infoTheater.tenCumRap
                          ? "#dfe4ea"
                          : "transparent",
                    }}
                  >
                    <Typography sx={{ color: "#3ae374", fontWeight: "bold" }}>
                      {infoTheater.tenCumRap}
                    </Typography>
                    <Typography variant="body2">
                      {infoTheater.diaChi}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={7} style={{ height: "80vh", overflowY: "scroll" }}>
          <Box>
            {listMovies.map((rap) =>
              rap.lstCumRap.map((cumRap) =>
                cumRap.danhSachPhim.map(
                  (phim) =>
                    // Normalize strings before comparing
                    selectedTenCumRap &&
                    selectedTenCumRap.toLowerCase() ===
                      cumRap.tenCumRap.toLowerCase() && (
                      <Grid
                        container
                        sx={{
                          borderBottom: "1px dashed #cd84f1",
                        }}
                        key={phim.maPhim}
                      >
                        <Grid item xs={4} sx={{ padding: "15px" }}>
                          <img
                            src={phim.hinhAnh}
                            alt="hinhAnh"
                            style={{ width: "100%" }}
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <Box sx={{ marginLeft: "10px" }}>
                            <Box display={"flex"} alignItems={"center"}>
                              <Typography
                                sx={{
                                  color: "#3ae374",
                                  fontSize: "25px",
                                  fontWeight: "bold",
                                }}
                              >
                                {phim.tenPhim}
                              </Typography>
                              {phim.hot && (
                                <Chip
                                  label="HOT"
                                  color="secondary"
                                  variant="outlined"
                                  size="small"
                                  sx={{ fontWeight: "bold", ml: 2 }}
                                />
                              )}
                            </Box>
                            {phim.lstLichChieuTheoPhim.map((lichChieu) => (
                              <ButtonCustom
                                onClick={() =>
                                  navigate(`/tickets/${lichChieu.maLichChieu}`)
                                }
                                key={lichChieu.maLichChieu}
                                variant="body2"
                              >
                                {dayjs(lichChieu.ngayChieuGioChieu).format(
                                  "DD-MM-YYYY ~ HH:mm"
                                )}
                              </ButtonCustom>
                            ))}
                          </Box>
                        </Grid>
                      </Grid>
                    )
                )
              )
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
