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

export async function getLogo(theaterId) {
  try {
    const response = await fetcher.get("QuanLyRap/LayThongTinHeThongRap", {
      params: {
        maHeThongRap: theaterId,
      },
    });
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function getInforTheater(theaterId) {
  try {
    const response = await fetcher.get(
      "QuanLyRap/LayThongTinCumRapTheoHeThong",
      {
        params: {
          maHeThongRap: theaterId,
        },
      }
    );
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function getTheaterShowtimes(theaterId) {
  try {
    const response = await fetcher.get(
      "QuanLyRap/LayThongTinLichChieuHeThongRap",
      {
        params: {
          maHeThongRap: theaterId,
          maNhom: "GP09",
        },
      }
    );
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function getTheaterSystem() {
  try {
    const response = await fetcher.get("QuanLyRap/LayThongTinHeThongRap");
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}
