import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getTicketShowtimes } from "../../../APIs/bookTicketAPI";
import Loading from "../../../Components/Loading";

export default function TicketPage({ ticketId }) {
  const { data, isLoading } = useQuery({
    queryKey: ["ticketShowtimes", ticketId],
    queryFn: () => getTicketShowtimes(ticketId),
  });
  console.log(data);

  if (isLoading) {
    return <Loading />;
  }

  return <div>hello</div>;
}
