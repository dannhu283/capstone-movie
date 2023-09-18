import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getMovies } from "../../../apis/movieAPI";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "../../../components/Loading";
import { Container, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import ShowingCss from "./ShowingCss.module.css";

export default function Showing() {
  const navigate = useNavigate();
  const { data = [], isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });

  if (isLoading) {
    return <Loading />;
  }

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
    <Container>
      <Slider {...settings}>
        {data.map((movie) => (
          <Grid key={movie.maPhim} className={ShowingCss.item}>
            <Grid item sx={{ margin: "10px" }}>
              <Card>
                <CardMedia sx={{ height: 280 }} image={movie.hinhAnh} />
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
                  <Button size="small">Xem Trailer</Button>
                  <Button
                    className={ShowingCss.buttonBuy}
                    onClick={() => navigate(`/movies/${movie.maPhim}`)}
                  >
                    Mua Vé
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        ))}
      </Slider>
    </Container>
  );
}
