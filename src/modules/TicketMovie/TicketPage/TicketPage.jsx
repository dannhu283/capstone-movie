import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getTicketMovie } from "../../../APIs/bookTicketAPI";
import Loading from "../../../Components/Loading";
import { Grid, Box, Typography, Paper } from "@mui/material";
import { GridCustom, ButtonSeat } from "./index";

export default function TicketPage({ showtimeId }) {
  const { data, isLoading } = useQuery({
    queryKey: ["ticketShowtimes"],
    queryFn: () => getTicketMovie(showtimeId),
    enabled: !!showtimeId,
  });

  const listSeat = data?.danhSachGhe || [];

  if (isLoading) {
    return <Loading />;
  }

  console.log(listSeat);
  return (
    <Grid>
      <Grid item xs={12} marginBottom={5}>
        <Box
          sx={{
            backgroundColor: "#ff3838",
            width: "100%",
            height: "10px",
            borderRadius: "3px",
          }}
        ></Box>
        <Typography sx={{ textAlign: "center", color: "white" }}>
          Màn hình
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <GridCustom>
          {/* render depends on condition */}
          {listSeat.map((seat) => {
            let isDisable = seat.daDat;
            let color = "";
            if (seat.daDat) {
              color = "#767676";
            } else if (seat.loaiGhe === "Thuong") {
              color = "#dfe4ea";
            } else {
              color = "#ff9f1a";
            }
            return (
              <ButtonSeat
                disabled={isDisable}
                style={{ backgroundColor: color }}
                key={seat.tenGhe}
              >
                {seat.daDat ? "X" : seat.tenGhe}
              </ButtonSeat>
            );
          })}
        </GridCustom>
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
            sx={{ padding: "15px", backgroundColor: "#dfe4ea" }}
          >
            Ghế thuờng
          </Paper>
          <Paper
            elevation={4}
            sx={{ padding: "15px", backgroundColor: "#ff9f1a" }}
          >
            Ghế VIP
          </Paper>
        </div>
      </Grid>
    </Grid>
  );
}
