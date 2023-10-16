import fetcher from "./fetcher";

export async function getTicketMovie(showtimeId) {
  try {
    const response = await fetcher.get("/QuanLyDatVe/LayDanhSachPhongVe", {
      params: {
        MaLichChieu: showtimeId,
      },
    });
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function addShowtimes(showtime) {
  try {
    const response = await fetcher.post("/QuanLyDatVe/TaoLichChieu", showtime);
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function bookTicket(ticket) {
  try {
    const response = await fetcher.post("/QuanLyDatVe/DatVe", ticket);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}
