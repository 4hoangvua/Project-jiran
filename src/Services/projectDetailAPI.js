import axiosClient from "./axiosClient";

export const projectDetailAPI = {
  getProjectDetail: (projectId) => {
    return axiosClient.get(`Project/getProjectDetail?id=${projectId}`);
  },
  getAllPriority: () => {
    return axiosClient.get("Priority/getAll");
  },
  getAllTaskType: () => {
    return axiosClient.get("TaskType/getAll");
  },
  getAllStatus: () => {
    return axiosClient.get("Status/getAll");
  },
  createTask: (data) => {
    return axiosClient.post("Project/createTask", data);
  },
  getTaskDetail: (taskId) => {
    return axiosClient.get(`Project/getTaskDetail?taskId=${taskId}`);
  },
  updateStatus: (infoStatus) => {
    return axiosClient.put("Project/updateStatus", infoStatus);
  },
  updatePriority: (infoPriority) => {
    return axiosClient.put("Project/updatePriority", infoPriority);
  },
  updateDescription: (infoDescription) => {
    return axiosClient.put("Project/updateDescription", infoDescription);
  },
  updateTimeTracking: (infoTimeTracking) => {
    return axiosClient.put("Project/updateTimeTracking", infoTimeTracking);
  },
  updateEstimate: (infoEstimate) => {
    return axiosClient.put("Project/updateEstimate", infoEstimate);
  },
  updateTask: (infoTask) => {
    return axiosClient.post("Project/updateTask", infoTask);
  },
  assignUserTask: (infoTask) => {
    return axiosClient.post("Project/assignUserTask", infoTask);
  },
  removeUserFromTask: (infoTask) => {
    return axiosClient.post("Project/removeUserFromTask", infoTask);
  },
  insertComment: (infoComm) => {
    return axiosClient.post("Comment/insertComment", infoComm);
  },
  updateComment: (infoComm) => {
    return axiosClient.put(
      `Comment/updateComment?id=${infoComm.id}&contentComment=${infoComm.contentComment}`
    );
  },
  deleteComment: (idCom) => {
    return axiosClient.delete(`Comment/deleteComment?idComment=${idCom}`);
  },
  removeTask: (taskId) => {
    return axiosClient.delete(`Project/removeTask?taskId=${taskId}`);
  },
};
