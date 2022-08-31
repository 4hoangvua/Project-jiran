import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { projectDetailAPI } from "~/Services/projectDetailAPI";
import { openNotification } from "~/util/NotificationJiran";
const initialState = {
  projectDetail: {},
  cardProject: [],
  allPriority: [],
  taskType: [],
  allStatus: [],
  taskDetail: {},
};

export const getProjectDetail = createAsyncThunk(
  "projectDetail/getProjectDetail",
  async (projectId, thunkAPI) => {
    const data = await projectDetailAPI.getProjectDetail(projectId);
    thunkAPI.dispatch(addCardProject(data));
    return data;
  }
);
export const getAllPriority = createAsyncThunk(
  "projectDetail/getAllPriority",
  async () => {
    const data = await projectDetailAPI.getAllPriority();
    return data;
  }
);
export const getAllTaskType = createAsyncThunk(
  "projectDetail/getAllTaskType",
  async () => {
    return await projectDetailAPI.getAllTaskType();
  }
);
export const getAllStatus = createAsyncThunk(
  "projectDetail/getAllStatus",
  async () => {
    return await projectDetailAPI.getAllStatus();
  }
);
export const createTask = createAsyncThunk(
  "projectDetail/createTask",
  async (infoTask, thunkAPI) => {
    const data = await projectDetailAPI.createTask(infoTask);
    await thunkAPI.dispatch(getProjectDetail(infoTask.projectId));
    return data;
  }
);
export const getTaskDetail = createAsyncThunk(
  "projectDetail/getTaskDetail",
  async (taskId) => {
    const data = await projectDetailAPI.getTaskDetail(taskId);
    return data;
  }
);
export const updateStatus = createAsyncThunk(
  "projectDetail/updateStatus",
  async (infoStatus, thunkAPI) => {
    const data = await projectDetailAPI.updateStatus(infoStatus);
    await thunkAPI.dispatch(getTaskDetail(infoStatus.taskId)).unwrap();
    thunkAPI.dispatch(getProjectDetail(infoStatus.projectId));
    return data;
  }
);
export const updatePriority = createAsyncThunk(
  "projectDetail/updatePriority",
  async (infoPriority, thunkAPI) => {
    const data = await projectDetailAPI.updatePriority(infoPriority);
    await thunkAPI.dispatch(getTaskDetail(infoPriority.taskId)).unwrap();
    thunkAPI.dispatch(getProjectDetail(infoPriority.projectId));

    return data;
  }
);
export const updateDescription = createAsyncThunk(
  "projectDetail/updateDescription",
  async (infoDescription, thunkAPI) => {
    const data = await projectDetailAPI.updateDescription(infoDescription);
    await thunkAPI.dispatch(getTaskDetail(infoDescription.taskId)).unwrap();
    thunkAPI.dispatch(getProjectDetail(infoDescription.projectId));

    return data;
  }
);
export const updateEstimate = createAsyncThunk(
  "projectDetail/updateEstimate",
  async (infoEstimate, thunkAPI) => {
    const data = await projectDetailAPI.updateEstimate(infoEstimate);
    await thunkAPI.dispatch(getTaskDetail(infoEstimate.taskId)).unwrap();
    thunkAPI.dispatch(getProjectDetail(infoEstimate.projectId));

    return data;
  }
);
export const updateTimeTracking = createAsyncThunk(
  "projectDetail/updateTimeTracking",
  async (infoTimeTracking, thunkAPI) => {
    const data = await projectDetailAPI.updateTimeTracking(infoTimeTracking);
    await thunkAPI.dispatch(getTaskDetail(infoTimeTracking.taskId)).unwrap();
    thunkAPI.dispatch(getProjectDetail(infoTimeTracking.projectId));

    return data;
  }
);
export const updateTask = createAsyncThunk(
  "projectDetail/updateTask",
  async (infoTask, thunkAPI) => {
    console.log(infoTask);
    const data = await projectDetailAPI.updateTask(infoTask);
    await thunkAPI.dispatch(getTaskDetail(infoTask.taskId)).unwrap();
    thunkAPI.dispatch(getProjectDetail(infoTask.projectId));
    return data;
  }
);
export const assignUserTask = createAsyncThunk(
  "projectDetail/assignUserTask",
  async (infoTask, thunkAPI) => {
    const data = await projectDetailAPI.assignUserTask(infoTask);
    await thunkAPI.dispatch(getProjectDetail(infoTask.projectId)).unwrap();
    thunkAPI.dispatch(getTaskDetail(infoTask.taskId));
    return data;
  }
);
export const removeUserFromTask = createAsyncThunk(
  "projectDetail/removeUserFromTask",
  async (infoTask, thunkAPI) => {
    const data = await projectDetailAPI.removeUserFromTask(infoTask);
    await thunkAPI.dispatch(getTaskDetail(infoTask.taskId)).unwrap();
    thunkAPI.dispatch(getProjectDetail(infoTask.projectId));

    return data;
  }
);
export const insertComment = createAsyncThunk(
  "projectDetail/insertComment",
  async (infoComm, thunkAPI) => {
    const data = await projectDetailAPI.insertComment(infoComm);
    await thunkAPI.dispatch(getTaskDetail(infoComm.taskId)).unwrap();
    return data;
  }
);
export const updateComment = createAsyncThunk(
  "projectDetail/updateComment",
  async (infoComm, thunkAPI) => {
    const data = await projectDetailAPI.updateComment(infoComm);
    await thunkAPI.dispatch(getTaskDetail(infoComm.taskId)).unwrap();
    return data;
  }
);
export const deleteComment = createAsyncThunk(
  "projectDetail/deleteComment",
  async (infoComm, thunkAPI) => {
    const data = await projectDetailAPI.deleteComment(infoComm.idComment);
    await thunkAPI.dispatch(getTaskDetail(infoComm.taskId)).unwrap();
    return data;
  }
);
export const removeTask = createAsyncThunk(
  "projectDetail/removeTask",
  async (infoTask, thunkAPI) => {
    const data = await projectDetailAPI.removeTask(infoTask.taskId);
    await thunkAPI.dispatch(getProjectDetail(infoTask.projectId));
    return data;
  }
);
const projectDetailSlice = createSlice({
  name: "projectDetal",
  initialState: initialState,
  reducers: {
    addCardProject: (state, { payload }) => {
      const check = state.cardProject.findIndex(
        (project) => project.id === payload.id
      );
      if (check === -1) state.cardProject = [...state.cardProject, payload];
    },
    addUserMember: (state, { payload }) => {
      state.taskDetail.assigness = [...state.taskDetail.assigness, payload];
    },
    removeCardProject: (state, { payload }) => {
      state.cardProject = state.cardProject.filter(
        (card) => card.id !== payload
      );
      state.projectDetail = {};
    },
  },

  extraReducers: {
    //   Project Detail
    [getProjectDetail.fulfilled]: (state, { payload }) => {
      state.projectDetail = payload;
    },
    //  get all Priority
    [getAllPriority.fulfilled]: (state, { payload }) => {
      state.allPriority = payload;
    },
    // get all taskType
    [getAllTaskType.fulfilled]: (state, { payload }) => {
      state.taskType = payload;
    },
    // get all Status
    [getAllStatus.fulfilled]: (state, { payload }) => {
      state.allStatus = payload;
    },
    // Create task
    [createTask.fulfilled]: (state, { payload }) => {
      if (typeof payload === "object")
        openNotification("success", "Tạo thành công");
      else openNotification("error", payload);
    },
    [createTask.rejected]: (state, { payload }) => {
      openNotification("error", payload);
    },
    // get task detail
    [getTaskDetail.fulfilled]: (state, { payload }) => {
      state.taskDetail = payload;
    },
    // update status
    [updateStatus.rejected]: (state, { payload }) => {
      openNotification("error", payload);
    },
    // update Priority
    [updatePriority.fulfilled]: (state, { payload }) => {
      openNotification("success", payload);
    },
    [updatePriority.rejected]: (state, { payload }) => {
      openNotification("error", payload);
    },
    // update Description
    [updateDescription.fulfilled]: (state, { payload }) => {
      openNotification("success", payload);
    },
    [updateDescription.rejected]: (state, { payload }) => {
      openNotification("error", payload);
    },
    // update Estimate
    [updateEstimate.fulfilled]: (state, { payload }) => {
      openNotification("success", payload);
    },
    [updateEstimate.rejected]: (state, { payload }) => {
      openNotification("success", payload);
    },

    // update TimeTracking
    [updateTimeTracking.fulfilled]: (state, { payload }) => {
      openNotification("success", payload);
    },
    [updateTimeTracking.rejected]: (state, { payload }) => {
      openNotification("error", payload);
    },

    // update Task
    [updateTask.fulfilled]: (state, { payload }) => {
      openNotification("success", payload);
    },
    [updateTask.rejected]: (state, { payload }) => {
      openNotification("error", payload);
    },

    //  assign User Task
    [assignUserTask.fulfilled]: (state, { payload }) => {
      openNotification("success", payload);
    },
    [assignUserTask.rejected]: (state, { payload }) => {
      openNotification("error", payload);
    },
    //  Remove user from task
    [removeUserFromTask.fulfilled]: (state, { payload }) => {
      openNotification("success", payload);
    },
    [removeUserFromTask.rejected]: (state, { payload }) => {
      openNotification("error", payload);
    },
    // insertComment
    [insertComment.rejected]: (state, { payload }) => {
      openNotification("error", payload);
    },
    // updateComment
    [updateComment.rejected]: (state, { payload }) => {
      openNotification("error", payload);
    },
    // deleteComment
    [deleteComment.rejected]: (state, { payload }) => {
      openNotification("error", payload);
    },
    // remove task
    [removeTask.fulfilled]: (state, { payload }) => {
      openNotification("success", payload);
    },
    [removeTask.rejected]: (state, { payload }) => {
      openNotification("error", payload);
    },
  },
});
export const { addCardProject, addUserMember, removeCardProject } =
  projectDetailSlice.actions;
export default projectDetailSlice.reducer;
