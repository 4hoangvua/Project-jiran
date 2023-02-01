import axiosClient from "./axiosClient";
const maNhom = "GP01";

const showTimeAPI = {
  getListTheater: () => {
    return axiosClient.get("QuanLyRap/LayThongTinHeThongRap");
  },
  getListTheaterInfo: (theater) => {
    return axiosClient.get("QuanLyRap/LayThongTinCumRapTheoHeThong", {
      params: {
        maHeThongRap: theater,
      },
    });
  },
  createShowTimeTheater: (data) => {
    return axiosClient.post("QuanLyDatVe/TaoLichChieu", data);
  },
};
export default showTimeAPI;
