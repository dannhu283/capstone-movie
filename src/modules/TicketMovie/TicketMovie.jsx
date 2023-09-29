import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getTicketMovie } from "../../APIs/bookTicketAPI";
import Loading from "../../Components/Loading";
import { useParams } from "react-router-dom";
import { Box, Container, Grid } from "@mui/material";
import TicketPage from "./TicketPage/TicketPage";
import Ticket from "./Ticket/Ticket";
import { Overlay } from "./index";

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
    <div
      style={{
        backgroundImage: `url(${ticketInfo.hinhAnh})`,
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      <Overlay>
        <Box>
          <Container sx={{ paddingTop: "50px" }}>
            <Grid container spacing={12}>
              <Grid item xs={7}>
                <TicketPage showtimeId={showtimeId} />
              </Grid>
              <Grid item xs={5}>
                <Ticket ticketInfo={ticketInfo} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Overlay>
    </div>
  );
}
