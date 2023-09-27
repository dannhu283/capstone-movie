import React from "react";
import { Divider, Paper } from "@mui/material";
import { ButtonMain } from "../../../Components/ButtonMain";
import { Text, TextColor, Row } from "./index";

export default function Ticket({ ticketInfo }) {
  return (
    <>
      <Paper elevation={3} sx={{ padding: "20px" }}>
        <Row style={{ justifyContent: "center" }}>
          <TextColor>Pice</TextColor>
        </Row>
        <Divider sx={{ marginY: "16px" }} />
        <Row>
          <Text>Cụm Rạp:</Text>
          <TextColor>{ticketInfo.tenCumRap}</TextColor>
        </Row>
        <Divider sx={{ marginY: "16px" }} />
        <Row>
          <Text>Địa chỉ:</Text>
          <TextColor>{ticketInfo.diachi}</TextColor>
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
          <Text>Ghế Đang Chọn:</Text>
        </Row>
      </Paper>
      <ButtonMain style={{ width: "100%", fontSize: "16px" }}>
        Đặt vé
      </ButtonMain>
    </>
  );
}
