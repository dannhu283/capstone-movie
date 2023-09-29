import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getInforTheater, getLogo } from "../../../APIs/cinemaAPI";
import Loading from "../../../Components/Loading";
import { Container, Tab, Tabs } from "@mui/material";

export default function Cinema({ theaterId }) {
  const { data, isLoading } = useQuery({
    queryKey: ["logo", theaterId],
    queryFn: () => getLogo(theaterId),
  });

  //Save the theaterId value from the getLogo query
  const theaterIdFromLogo =
    data && data.length > 0 ? data[0].maHeThongRap : null;

  const { data: infor, isLoading: isInforLoading } = useQuery({
    queryKey: ["inforTheater", theaterIdFromLogo],
    queryFn: () => getInforTheater(theaterIdFromLogo),
    enabled: !!theaterIdFromLogo,
  });

  if (isLoading || isInforLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Cinema Systems"
        sx={{ width: "20%" }}
      >
        {data.map((item) => (
          <Tab
            key={item.maHeThongRap}
            label={
              <img
                src={item.logo}
                alt="logo"
                width={50}
                height={50}
                style={{ cursor: "pointer" }}
              />
            }
          />
        ))}
      </Tabs>
    </Container>
  );
}
