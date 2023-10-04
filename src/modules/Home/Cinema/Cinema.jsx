import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getLogo,
  getInforTheater,
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
  const [inforTheaters, setInforTheater] = useState([]);

  const [listMovies, setListMovies] = useState([]);

  const [selectedTenCumRap, setSelectedTenCumRap] = useState(0);

  const [selectedTab, setSelectedTab] = useState(0);

  const navigate = useNavigate();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["logo", theaterId],
    queryFn: () => getLogo(theaterId),
  });

  const theaterSystems = data || [];

  const handleChangeTab = async (theaterSystemsId) => {
    try {
      const inforTheaters = await getInforTheater(theaterSystemsId);
      setInforTheater(inforTheaters);
      setSelectedTab(theaterSystemsId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetListMovie = async (inforTheaterId, tenCumRap) => {
    try {
      const listMovies = await getTheaterShowtimes(inforTheaterId);
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
    if (inforTheaters.length > 0) {
      handleGetListMovie(
        inforTheaters[0].maHeThongRap,
        inforTheaters[0].tenCumRap
      );
    }
  }, [inforTheaters]);

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
                    <img src={item.logo} alt="logo" style={{ width: "80%" }} />
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
              {inforTheaters.map((inforTheater) => (
                <Grid item key={inforTheater.maCumRap} xs={12}>
                  <Paper
                    onClick={() =>
                      handleGetListMovie(
                        inforTheater.maHeThongRap,
                        inforTheater.tenCumRap
                      )
                    }
                    style={{
                      cursor: "pointer",
                      transition: "all 0.5s",
                      padding: "16px",
                      margin: "10px  10px 0",
                      background:
                        selectedTenCumRap === inforTheater.tenCumRap
                          ? "#dfe4ea"
                          : "transparent",
                    }}
                  >
                    <Typography sx={{ color: "#3ae374", fontWeight: "bold" }}>
                      {inforTheater.tenCumRap}
                    </Typography>
                    <Typography variant="body2">
                      {inforTheater.diaChi}
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
                      >
                        <Grid
                          item
                          xs={4}
                          key={phim.maPhim}
                          sx={{ padding: "15px" }}
                        >
                          <img
                            src={phim.hinhAnh}
                            alt="hinhAnh"
                            style={{ width: "100%" }}
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <Box sx={{ marginLeft: "10px" }}>
                            <Typography
                              sx={{
                                color: "#3ae374",
                                fontSize: "25px",
                                fontWeight: "bold",
                              }}
                            >
                              {phim.tenPhim}
                              {phim.hot && (
                                <Chip
                                  label="HOT"
                                  color="secondary"
                                  variant="outlined"
                                  size="small"
                                  sx={{ fontWeight: "bold", ml: 2 }}
                                />
                              )}
                            </Typography>

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
