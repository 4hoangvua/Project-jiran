import axiosClient from "./axiosClient";
const maNhom = "GP01";

const movieAPI = {
  accountUser: (info) => {
    return axiosClient.post("QuanLyNguoiDung/DangNhap", info);
  },
  userRegister: (info) => {
    return axiosClient.post("QuanLyNguoiDung/DangKy", {
      ...info,
    });
  },
  getListMovie: (tenPhim) => {
    if (tenPhim.trim() !== "") {
      return axiosClient.get(
        `QuanLyPhim/LayDanhSachPhim?maNhom=${maNhom}&tenPhim=${tenPhim}`
      );
    }
    return axiosClient.get(`QuanLyPhim/LayDanhSachPhim`);
  },
  getListAutoComp: (tenPhim) => {
    if (tenPhim.trim() !== "") {
      return axiosClient.get(
        `QuanLyPhim/LayDanhSachPhim?maNhom=${maNhom}&tenPhim=${tenPhim}`
      );
    }
    return axiosClient.get(`QuanLyPhim/LayDanhSachPhim`);
  },
  addMovie: (info) => {
    return axiosClient.post("QuanLyPhim/ThemPhimUploadHinh", info);
  },
  getMovieDetail: (maPhim) => {
    return axiosClient.get("QuanLyPhim/LayThongTinPhim", {
      params: {
        maPhim: maPhim,
      },
    });
  },
  uploadMovie: (info) => {
    return axiosClient.post("QuanLyPhim/CapNhatPhimUpload", info);
  },
  deleteMove: (maPhim) => {
    return axiosClient.delete(`QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
  },
};
export default movieAPI;
