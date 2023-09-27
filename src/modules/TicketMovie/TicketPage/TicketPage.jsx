import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getTicketShowtimes } from "../../../APIs/bookTicketAPI";
import Loading from "../../../Components/Loading";
import { Grid } from "@mui/material";

export default function TicketPage({ showtimeId }) {
  const { data, isLoading } = useQuery({
    queryKey: ["ticketShowtimes"],
    queryFn: () => getTicketShowtimes(showtimeId),
    enabled: !!showtimeId,
  });

  const listSeat = data?.danhSachGhe || [];
  console.log(listSeat);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Grid>
      {listSeat.map((seat) => {
        return (
          <Grid item sx={1} key={seat.maGhe}>
            {seat.tenGhe}
          </Grid>
        );
      })}
    </Grid>
  );
}
