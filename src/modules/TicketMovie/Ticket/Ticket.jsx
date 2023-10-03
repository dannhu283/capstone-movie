import React from "react";
import { Divider, Paper } from "@mui/material";
import { ButtonMain } from "../../../Components/ButtonMain";
import { Text, TextColor, Row, TextSeat } from "./index";
import { useTicketContext } from "../../../context/TicketContext/TicketContext";

export default function Ticket({ ticketInfo }) {
  const { selectedSeats, totalPrice } = useTicketContext();
  return (
    <>
      <Paper elevation={3} sx={{ padding: "20px" }}>
        <Row
          style={{
            justifyContent: "center",
            fontSize: "30px",
          }}
        >
          <TextSeat>{totalPrice.toLocaleString()} VND</TextSeat>
        </Row>
        <Divider sx={{ marginY: "16px" }} />
        <Row>
          <Text>Cụm Rạp:</Text>
          <TextColor>{ticketInfo.tenCumRap}</TextColor>
        </Row>
        <Divider sx={{ marginY: "16px" }} />
        <Row>
          <Text>Địa chỉ:</Text>
          <TextColor>{ticketInfo.diaChi}</TextColor>
        </Row>
        <Divider sx={{ marginY: "16px" }} />
        <Row>
          <Text>Rạp:</Text>
          <TextColor>{ticketInfo.tenRap}</TextColor>
        </Row>
        <Divider sx={{ marginY: "16px" }} />
        <Row>
          <Text>Ngày Giờ Chiếu:</Text>
          <TextColor>
            {ticketInfo.ngayChieu}~{ticketInfo.gioChieu}
          </TextColor>
        </Row>
        <Divider sx={{ marginY: "16px" }} />
        <Row>
          <Text>Tên Phim:</Text>
          <TextColor>{ticketInfo.tenPhim}</TextColor>
        </Row>
        <Divider sx={{ marginY: "16px" }} />
        <Row>
          <Text>
            Ghế Đang Chọn:
            {selectedSeats.map((item, index) => {
              const separator = index === selectedSeats.length - 1 ? "" : ", ";
              return (
                <TextSeat key={item.stt}>
                  {item.tenGhe} {separator}
                </TextSeat>
              );
            })}
          </Text>
        </Row>
      </Paper>
      <ButtonMain style={{ width: "100%", fontSize: "16px" }}>
        Đặt vé
      </ButtonMain>
    </>
  );
}
