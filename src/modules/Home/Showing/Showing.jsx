import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getMovies } from "../../../APIs/movieAPI";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "../../../Components/Loading";
import { Container, Grid, Modal } from "@mui/material";
import Card from "@mui/material/Card";
import ReactPlayer from "react-player";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CloseIcon from "@mui/icons-material/Close";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import Typography from "@mui/material/Typography";

import ShowingCss from "./ShowingCss.module.css";
import SearchFilm from "../SearchFilm/SearchFilm";
import { ButtonMain } from "../../../Components/ButtonMain";

export default function Showing() {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStates, setModalStates] = useState({});

  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const navigate = useNavigate();
  const { data = [], isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });

  if (isLoading) {
    return <Loading />;
  }
  const handleOpenModal = (movieId) => {
    setModalStates({ ...modalStates, [movieId]: true });
  };

  const handleCloseModal = (movieId) => {
    setModalStates({ ...modalStates, [movieId]: false });
  };

  //hide and show button play
  const handleMouseEnter = () => {
    setIsButtonVisible(true);
  };

  const handleMouseLeave = () => {
    setIsButtonVisible(false);
  };

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    rows: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
          rows: 6,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 6,
        },
      },
    ],
  };
  return (
    <Container
      style={{ position: "relative", padding: "0", marginTop: "60px" }}
    >
      <SearchFilm movies={data} />
      <Slider {...settings}>
        {data.map((movie) => (
          <Grid className={ShowingCss.item}>
            <Grid item sx={{ margin: "10px" }}>
              <Card key={movie.maPhim}>
                <div
                  className={ShowingCss.imageContainer}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleOpenModal(movie.maPhim)}
                >
                  <CardMedia sx={{ height: 280 }} image={movie.hinhAnh} />
                  {isButtonVisible && (
                    <div className={ShowingCss.overlay}>
                      <PlayCircleOutlineIcon
                        variant="contained"
                        color="warning"
                        className={ShowingCss.playButton}
                        onClick={handleOpenModal}
                      />
                    </div>
                  )}
                </div>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    className={ShowingCss.title}
                  >
                    {movie.tenPhim}
                  </Typography>
                  <div className={ShowingCss.desc}>
                    <Typography variant="body2" color="text.secondary">
                      {movie.moTa}
                    </Typography>
                  </div>
                </CardContent>
                <CardActions>
                  <ButtonMain
                    className={ShowingCss.buttonBuy}
                    onClick={() => navigate(`/movies/${movie.maPhim}`)}
                  >
                    Mua Vé
                  </ButtonMain>
                </CardActions>
              </Card>
            </Grid>
            <Modal
              open={modalStates[movie.maPhim] || false}
              aria-labelledby="video-modal"
              aria-describedby="video-modal-description"
            >
              <div className={ShowingCss.modalContent}>
                <CloseIcon
                  className={ShowingCss.icon}
                  onClick={() => handleCloseModal(movie.maPhim)}
                />
                <div className={ShowingCss.videoContainer}>
                  <ReactPlayer url={movie.trailer} controls={true} video />
                </div>
              </div>
            </Modal>
          </Grid>
        ))}
      </Slider>
    </Container>
  );
}
