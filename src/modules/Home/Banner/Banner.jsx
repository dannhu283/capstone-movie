import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getBanners } from "../../../APIs/movieAPI";
import Loading from "../../../Components/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { Navigation, Autoplay } from "swiper/modules";
import { Box, Modal } from "@mui/material";
import "./BannerCss.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ReactPlayer from "react-player";

export default function Banner() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data: banners = [], isLoading } = useQuery({
    queryKey: ["banners"],
    queryFn: getBanners,
  });
  if (isLoading) {
    return <Loading />;
  }

  return (
    <Swiper
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      centeredSlides={true}
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Navigation, Autoplay]}
      className="mySwiper"
    >
      {banners.map((banner) => {
        return (
          <SwiperSlide key={banner.maBanner}>
            <img
              width="100%"
              src={banner.hinhAnh}
              alt={banner.maPhim}
              style={{ height: "800px" }}
            />
            <Box
              onClick={() => {
                handleOpen();
              }}
              sx={{
                backgroundColor: "#000000a7",
                color: "#fff",
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "800px",
                zIndex: "1201",
                opacity: 0,
                borderRadius: "10px",
                cursor: "pointer",
                transition: "all 1s",

                "&:hover": {
                  opacity: 1,
                },
              }}
            >
              <PlayCircleOutlineIcon
                sx={{
                  fontSize: "80px",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  transition: "all 0.5s",
                  "&:hover": {
                    color: "#ffffff81",
                  },
                }}
              />
            </Box>
          </SwiperSlide>
        );
      })}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            height: 400,
            backgroundColor: "transparent",
            border: "1px solid transparent",
          }}
        >
          <ReactPlayer
            url="https://www.youtube.com/watch?v=PvKiWRTSAzg"
            controls={true}
            width={"100%"}
            height={"100%"}
          />
        </Box>
      </Modal>
    </Swiper>
  );
}
