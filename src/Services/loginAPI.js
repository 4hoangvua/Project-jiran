import axiosClient from "./axiosClient";

const loginAPI = {
  signIn: (userInfo) => {
    return axiosClient.post("Users/signin", userInfo);
  },
  signUp: (userInfo) => {
    return axiosClient.post("Users/signup", userInfo);
  },
  getUser: (keyWord) => {
    if (keyWord) return axiosClient.get(`Users/getUser?keyword=${keyWord}`);
    return axiosClient.get("Users/getUser");
  },
  getUserSearch: (keyWord) => {
    return axiosClient.get(`Users/getUser?keyword=${keyWord}`);
  },
  getUserByProjectId: (idProject) => {
    return axiosClient.get(`Users/getUserByProjectId?idProject=${idProject}`);
  },
  editUser: (infoUser) => {
    return axiosClient.put("Users/editUser", infoUser);
  },
  deleteUser: (idUser) => {
    return axiosClient.delete(`Users/deleteUser?id=${idUser}`);
  },
};
export default loginAPI;
