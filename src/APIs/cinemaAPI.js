import fetcher from "./fetcher";

export async function getMovieShowtimes(movieId) {
  try {
    const response = await fetcher.get("/QuanLyRap/LayThongTinLichChieuPhim", {
      params: {
        MaPhim: movieId,
      },
    });
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function getLogo() {
  try {
    const response = await fetcher.get("QuanLyRap/LayThongTinHeThongRap");
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}
