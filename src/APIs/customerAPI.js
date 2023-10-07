import fetcher from "./fetcher";

export async function getCustomer() {
  try {
    const response = await fetcher.get(
      "/QuanLyNguoiDung/LayDanhSachNguoiDung",
      {
        params: {
          MaNhom: "GP09",
        },
      }
    );
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}
