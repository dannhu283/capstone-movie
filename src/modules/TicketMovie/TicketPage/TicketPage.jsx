import React from "react";
import { useQuery } from "@tanstack/react-query";
import { MapInteractionCSS } from "react-map-interaction";
import { getTicketMovie } from "../../../APIs/bookTicketAPI";
import Loading from "../../../Components/Loading";
import { Grid, Box, Typography, Paper } from "@mui/material";
import { GridCustom, ButtonSeat } from "./index";
import { useTicketContext } from "../../../context/TicketContext/TicketContext";

export default function TicketPage({ showtimeId }) {
  const { selectedSeats, handleSelect } = useTicketContext();

  const { data, isLoading } = useQuery({
    queryKey: ["ticketShowtimes"],
    queryFn: () => getTicketMovie(showtimeId),
    enabled: !!showtimeId,
  });

  const listSeat = data?.danhSachGhe || [];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Grid>
      <Grid item xs={12} marginBottom={10}>
        <Box
          sx={{
            backgroundColor: "white",
            width: "100%",
            height: "10px",
            borderRadius: "3px",
          }}
        ></Box>
        <Typography sx={{ textAlign: "center", color: "white" }}>
          Màn hình
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ border: "2px dashed white" }}>
        <MapInteractionCSS>
          <GridCustom>
            {/* render depends on condition */}
            {listSeat.map((seat) => {
              const isSelected = selectedSeats.find(
                (chair) => chair.maGhe === seat.maGhe
              );
              let isDisable = seat.daDat;
              let color = "";
              if (seat.daDat) {
                color = "#767676";
              } else if (isSelected) {
                color = "#3ae374";
              } else if (seat.loaiGhe === "Thuong") {
                color = "#7d5fff";
              } else {
                color = "#ff3838";
              }
              return (
                <ButtonSeat
                  onClick={() => {
                    // setIsSelected(!isSelected);
                    handleSelect({ ...seat, isSelected: !isSelected });
                  }}
                  onTouchEnd={() => {
                    handleSelect({ ...seat, isSelected: !isSelected });
                  }}
                  disabled={isDisable || isLoading}
                  style={{ backgroundColor: color }}
                  key={seat.tenGhe}
                >
                  {seat.daDat ? "X" : seat.tenGhe}
                </ButtonSeat>
              );
            })}
          </GridCustom>
        </MapInteractionCSS>
      </Grid>
      <Grid item xs={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            margin: "30px",
          }}
        >
          <Paper
            elevation={4}
            sx={{ padding: "15px", backgroundColor: "#767676" }}
          >
            Ghế đã đặt
          </Paper>
          <Paper
            elevation={4}
            sx={{ padding: "15px", backgroundColor: "#7d5fff" }}
          >
            Ghế thuờng
          </Paper>
          <Paper
            elevation={4}
            sx={{ padding: "15px", backgroundColor: "#ff3838" }}
          >
            Ghế VIP
          </Paper>
          <Paper
            elevation={4}
            sx={{ padding: "15px", backgroundColor: "#3ae374" }}
          >
            Đang chọn
          </Paper>
        </div>
        <Typography
          sx={{
            fontSize: "20px",
            color: "#ffaf4087",
            fontStyle: "italic",
          }}
        >
          Note: Có Thể Zoom khu vực ghế ngồi đề dễ dàng lựa chọn ghế phù hợp
        </Typography>
      </Grid>
    </Grid>
  );
}
