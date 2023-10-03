import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getTicketMovie } from "../../APIs/bookTicketAPI";
import Loading from "../../Components/Loading";
import { useParams } from "react-router-dom";
import { Box, Container, Grid } from "@mui/material";
import TicketPage from "./TicketPage/TicketPage";
import Ticket from "./Ticket/Ticket";
import TicketProvider from "../../context/TicketContext/TicketContext";

export default function TicketMovie() {
  const { showtimeId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["ticketShowtimes"],
    queryFn: () => getTicketMovie(showtimeId),
    enabled: !!showtimeId,
  });

  const ticketInfo = data?.thongTinPhim || [];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <TicketProvider>
      <Box
        sx={{
          backgroundImage: `url(${ticketInfo.hinhAnh})`,
          height: "100%",
          position: "relative",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          paddingBottom: "100px",

          "&::after": {
            backgroundColor: "#000000bd",
            display: "block",
            content: "''",
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
          },
        }}
      >
        <Container
          sx={{ paddingTop: "64px", zIndex: "100", position: "relative" }}
        >
          <Grid
            container
            spacing={10}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid
              item
              xs={12}
              md={8}
              sx={{ overflow: "hidden", maxWidth: "100%" }}
            >
              <TicketPage showtimeId={showtimeId} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Ticket ticketInfo={ticketInfo} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </TicketProvider>
  );
}
