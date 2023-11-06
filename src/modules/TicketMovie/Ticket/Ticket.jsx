import React, { useState } from "react";
import { Box, Divider, Paper, Typography } from "@mui/material";
import { ButtonMain } from "../../../Components/ButtonMain";
import { Text, TextColor, Row, TextSeat } from "./index";
import { useTicketContext } from "../../../context/TicketContext/TicketContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookTicket } from "../../../APIs/bookTicketAPI";
import { ModalSuccess, ModalContent } from "../../../Components/Modal";
import { useNavigate } from "react-router-dom";

export default function Ticket({ ticketInfo }) {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { selectedSeats, totalPrice } = useTicketContext();

  const queryClient = useQueryClient();

  const listTicket = selectedSeats.map((item) => ({
    maGhe: item.maGhe,
    giaVe: item.giaVe,
  }));

  const { mutate: handleBookTickets } = useMutation({
    mutationFn: () =>
      bookTicket({
        maLichChieu: ticketInfo.maLichChieu,
        danhSachVe: listTicket,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ticketShowtimes"] });
    },
  });

  const handlepay = () => {
    if (selectedSeats.length === 0) return alert("Vui lòng chọn ghế");
    handleBookTickets();
    setShowSuccessModal(true);
  };

  const handleClose = () => {
    setShowSuccessModal(false);
    navigate("/");
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{ marginTop: "40px", padding: "15px", backgroundColor: "#4b4b4b" }}
      >
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
          <Box>
            Ghế Đang Chọn
            <TextColor style={{ display: "inline", marginLeft: "10px" }}>
              {selectedSeats.length ? selectedSeats.length : ""}
            </TextColor>
            :
          </Box>
          <Box>
            {selectedSeats.map((item, index) => {
              const separator = index === selectedSeats.length - 1 ? "" : ", ";
              return (
                <TextSeat key={item.stt}>
                  {item.tenGhe} {separator}
                </TextSeat>
              );
            })}
          </Box>
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
        onClick={handlepay}
        style={{ width: "100%", fontSize: "16px" }}
      >
        Đặt vé
      </ButtonMain>
      {showSuccessModal && (
        <ModalSuccess>
          <ModalContent>
            <img
              style={{ width: "120px", marginTop: "10px" }}
              src="/img/animation_lnfs5c14_small.gif"
              alt="confirm"
            />
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Đặt vé thành công
            </Typography>
            <Typography
              sx={{ fontSize: "20px", marginY: "10px", opacity: "0.5" }}
            >
              Vui lòng xem lịch sử đặt vé ở profile
            </Typography>

            <ButtonMain onClick={handleClose}>Đồng ý</ButtonMain>
          </ModalContent>
        </ModalSuccess>
      )}
    </>
  );
}
