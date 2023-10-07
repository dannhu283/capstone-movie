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

export async function addShowtimes(movieId, showtime) {
  try {
    const response = await fetcher.post("/QuanLyDatVe/TaoLichChieu", showtime, {
      params: {
        maPhim: movieId,
      },
    });
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}
