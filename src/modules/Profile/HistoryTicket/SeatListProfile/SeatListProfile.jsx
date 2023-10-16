import WeekendIcon from "@mui/icons-material/Weekend";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";

export default function SeatListProfile({ seatList }) {
  const bookedSeatsList = seatList.map((item, index) => (
    <ListItem key={index}>
      <ListItemIcon>
        <WeekendIcon color="primary" />
      </ListItemIcon>
      <ListItemText primary={`Ghế ${item.tenGhe}`} />
    </ListItem>
  ));

  return (
    <div>
      <h2>{seatList[0].maHeThongRap}</h2>
      <h3>{seatList[0].tenHeThongRap}</h3>
      <List>{bookedSeatsList}</List>
    </div>
  );
}
