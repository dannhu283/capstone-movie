import fetcher from "./fetcher";

export const signin = async (payload) => {
  try {
    const response = await fetcher.post("/QuanLyNguoiDung/DangNhap", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const signup = async (payload) => {
  try {
    const response = await fetcher.post("/QuanLyNguoiDung/DangKy", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const editUser = async (payload) => {
  try {
    const response = await fetcher.post(
      "/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      payload
    );
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const editPutUser = async (payload) => {
  try {
    const response = await fetcher.put(
      "/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      payload
    );
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const getInfoUser = async (username) => {
  try {
    const response = await fetcher.post(
      "/QuanLyNguoiDung/LayThongTinNguoiDung",
      {
        params: {
          taiKhoan: username,
        },
      }
    );
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const addUser = async (payload) => {
  try {
    const response = await fetcher.post(
      "/QuanLyNguoiDung/ThemNguoiDung",
      payload
    );
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const removeUser = async (username) => {
  try {
    const response = await fetcher.delete("/QuanLyNguoiDung/XoaNguoiDung", {
      params: {
        TaiKhoan: username || undefined,
      },
    });
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const getInfo = async () => {
  try {
    const response = await fetcher.post("/QuanLyNguoiDung/ThongTinTaiKhoan");
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};
