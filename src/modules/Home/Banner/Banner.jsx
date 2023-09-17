import React from "react";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import { getBanners } from "../../../apis/movieAPI";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import Styles from "./Styles.module.css";
import Loading from "../../../components/Loading";

export default function Banner() {
  const { data: banners = [], isLoading } = useQuery({
    queryKey: ["banners"],
    queryFn: getBanners,
  });

  const sliderSettings = {
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    preArrow: <ArrowBackIosNewIcon />,
    nextArow: <ArrowForwardIosIcon />,
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Slider {...sliderSettings}>
        {banners.map((banner) => (
          <div key={banner.maBanner}>
            <img
              width={300}
              src={banner.hinhAnh}
              alt="banner"
              className={Styles.size}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
