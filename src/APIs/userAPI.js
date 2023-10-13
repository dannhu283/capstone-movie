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
  const user = JSON.parse(localStorage.getItem("currentUser"));
  try {
    const response = await fetcher.post(
      "/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      payload,
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      }
    );
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const getInfoUser = async (username) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  try {
    const response = await fetcher.post(
      "/QuanLyNguoiDung/LayThongTinNguoiDung",
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      },
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
  const user = JSON.parse(localStorage.getItem("currentUser"));
  try {
    const response = await fetcher.post(
      "/QuanLyNguoiDung/ThemNguoiDung",
      payload,
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      }
    );
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const removeUser = async (username) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  try {
    const response = await fetcher.delete(
      "/QuanLyNguoiDung/XoaNguoiDung",
      {
        params: {
          TaiKhoan: username || undefined,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      }
    );
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};
