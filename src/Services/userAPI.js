import axiosClient from "./axiosClient";
const maNhom = "GP01";

const userAPI = {
  // user
  getListUser: (account = "") => {
    if (account.trim() != "") {
      return axiosClient.get(
        `QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${maNhom}&tuKhoa=${account}`
      );
    }
    return axiosClient.get(
      `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${maNhom}`
    );
  },
  getListAutoComp: (account = "") => {
    if (account.trim() != "") {
      return axiosClient.get(
        `QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${maNhom}&tuKhoa=${account}`
      );
    }
    return axiosClient.get(
      `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${maNhom}`
    );
  },
  deleteUser: (account) => {
    return axiosClient.delete(
      `QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${account}`
    );
  },
  getUserDetail: (account) => {
    return axiosClient.post(
      `QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${account}`
    );
  },
  getTypeUser: () => {
    return axiosClient.get(`QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`);
  },
  addUser: (userInfo) => {
    return axiosClient.post("QuanLyNguoiDung/ThemNguoiDung", userInfo);
  },
  updateInfoUser: (infoUser) => {
    return axiosClient.post(
      "QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      infoUser
    );
  },
};
export default userAPI;
