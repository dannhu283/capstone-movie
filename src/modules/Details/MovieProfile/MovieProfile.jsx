import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getMovieDetails } from "../../../APIs/movieAPI";
import Loading from "../../../components/Loading";
import {
  Container,
  Typography,
  Button,
  Chip,
  Grid,
  Paper,
  Modal,
} from "@mui/material";
import { Link } from "react-router-dom";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import ReactPlayer from "react-player";
import { Movieprofile } from "./index";
import StylesProfile from "./StylesProfile.module.css";
import dayjs from "dayjs";

export default function MovieProfile({ movieId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["movieDetails", movieId],
    queryFn: () => getMovieDetails(movieId),
  });

  if (isLoading) {
    return <Loading />;
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  //hide and show button play
  const handleMouseEnter = () => {
    setIsButtonVisible(true);
  };

  const handleMouseLeave = () => {
    setIsButtonVisible(false);
  };

  return (
    <Container maxWidth="lg" sx={{ padding: "20px" }}>
      <Movieprofile>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3}>
              <div
                className={StylesProfile.imageContainer}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleOpenModal}
              >
                <img src={data.hinhAnh} alt={data.tenPhim} width="100%" />
                {isButtonVisible && (
                  <div className={StylesProfile.overlay}>
                    <PlayCircleOutlineIcon
                      variant="contained"
                      color="warning"
                      className={StylesProfile.playButton}
                      onClick={handleOpenModal}
                    />
                  </div>
                )}
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <Typography variant="h5" color=" #ff9f1a">
              {data.tenPhim}
              {data?.hot && (
                <Chip
                  label="HOT"
                  color="secondary"
                  variant="outlined"
                  size="small"
                  sx={{ fontWeight: "bold", ml: 1 }}
                />
              )}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "red" }}>
              Rating: {data?.danhGia}/10
            </Typography>
            <Link>
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{ mt: 2, fontWeight: "bold" }}
              >
                ĐẶT VÉ NGAY
              </Button>
            </Link>

            <Typography variant="h6" sx={{ mt: 2, color: "white" }}>
              Khởi chiếu: {dayjs(data.ngayKhoiChieu).format("DD/MM/YYYY")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" color={"white"}>
              Giới thiệu:
            </Typography>
            <Typography variant="h6" sx={{ mt: 2, color: " #17c0eb" }}>
              {data.moTa}
            </Typography>
          </Grid>
        </Grid>
        <Modal
          open={isModalOpen}
          aria-labelledby="video-modal"
          aria-describedby="video-modal-description"
        >
          <div className={StylesProfile.modalContent}>
            <CloseIcon
              className={StylesProfile.icon}
              onClick={handleCloseModal}
            />
            <div className={StylesProfile.videoContainer}>
              <ReactPlayer url={data.trailer} controls={true} video />
            </div>
          </div>
        </Modal>
      </Movieprofile>
    </Container>
  );
}
