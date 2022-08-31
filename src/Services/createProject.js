import axiosClient from "./axiosClient";

export const createProjectAPI = {
  getAllProjectCategory: () => {
    return axiosClient.get("ProjectCategory");
  },
  createProjectAuthorize: (data) => {
    return axiosClient.post("Project/createProjectAuthorize", data);
  },
  getAllProject: (keyword) => {
    if (keyword)
      return axiosClient.get(`Project/getAllProject?keyword=${keyword}`);
    else return axiosClient.get("Project/getAllProject");
  },
  getProjectSearch: (keyword) => {
    return axiosClient.get(`Project/getAllProject?keyword=${keyword}`);
  },
  updateProject: (data) => {
    return axiosClient.put(`Project/updateProject?projectId=${data.id}`, data);
  },
  deleteProject: (projectId) => {
    return axiosClient.delete(`Project/deleteProject?projectId=${projectId}`);
  },
  addUserProject: (data) => {
    return axiosClient.post("Project/assignUserProject", data);
  },
  removeUserFromProject: (data) => {
    return axiosClient.post("Project/removeUserFromProject", data);
  },
};
