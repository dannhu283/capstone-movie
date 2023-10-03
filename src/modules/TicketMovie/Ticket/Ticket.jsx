import React, { useState } from "react";
import { Divider, Paper, Snackbar, Alert, Typography } from "@mui/material";
import { ButtonMain } from "../../../Components/ButtonMain";
import { Text, TextColor, Row, TextSeat } from "./index";
import { useTicketContext } from "../../../context/TicketContext/TicketContext";

export default function Ticket({ ticketInfo }) {
  const [open, setOpen] = useState(false);

  const { selectedSeats, totalPrice } = useTicketContext();

  const handlePay = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <>
      <Paper elevation={3} sx={{ padding: "15px", backgroundColor: "#4b4b4b" }}>
        <img
          src={ticketInfo.hinhAnh}
          alt="film"
          style={{ width: "100%", marginBottom: "20px" }}
        />

        <Row>
          <Text>Tên Phim:</Text>
          <TextColor>{ticketInfo.tenPhim}</TextColor>
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
          <Text>
            Ghế Đang Chọn
            <TextColor style={{ display: "inline", marginLeft: "10px" }}>
              {selectedSeats.length ? selectedSeats.length : ""}
            </TextColor>
            :
          </Text>
          <TextColor>
            {selectedSeats.map((item, index) => {
              const separator = index === selectedSeats.length - 1 ? "" : ", ";
              return (
                <TextSeat key={item.stt}>
                  {item.tenGhe} {separator}
                </TextSeat>
              );
            })}
          </TextColor>
        </Row>

        <Divider sx={{ marginY: "16px" }} />
        <Row>
          <Text>Tổng Tiền:</Text>
          <Typography variant="h5" color={"#3ae374"} fontWeight={"bold"}>
            {totalPrice.toLocaleString()} VND
          </Typography>
        </Row>
      </Paper>
      <ButtonMain
        onClick={handlePay}
        style={{ width: "100%", fontSize: "16px" }}
      >
        Đặt vé
      </ButtonMain>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Đặt vé thành công
        </Alert>
      </Snackbar>
    </>
  );
}
