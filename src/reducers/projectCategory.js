import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createProjectAPI } from "~/Services/createProject";
import { openNotification } from "~/util/NotificationJiran";

const initialState = {
  allProjectCategory: [],
  allProject: [],
  allProjectSearch: [],
};
export const getAllProjectCategory = createAsyncThunk(
  "category/getAllProjectCategory",
  async () => {
    const data = await createProjectAPI.getAllProjectCategory();
    return data;
  }
);
export const createProjectAuthorize = createAsyncThunk(
  "category/createProjectAuthorize",
  async (project) => {
    return await createProjectAPI.createProjectAuthorize(project);
  }
);
export const getAllProject = createAsyncThunk(
  "category/getAllProject",
  async (keyWord) => {
    const data = await createProjectAPI.getAllProject(keyWord);
    return data;
  }
);
export const getProjectSearch = createAsyncThunk(
  "category/getProjectSearch",
  async (keyword) => {
    const data = await createProjectAPI.getProjectSearch(keyword);
    return data;
  }
);

export const editProject = createAsyncThunk(
  "category/editProject",
  async (data) => {
    return await createProjectAPI.updateProject(data);
  }
);
export const deleteProject = createAsyncThunk(
  "category/deleteProject",
  async (projectId) => {
    return await createProjectAPI.deleteProject(projectId);
  }
);
export const addUserProject = createAsyncThunk(
  "category/addUserProject",
  async (data) => {
    return await createProjectAPI.addUserProject(data);
  }
);
export const removeUserFromProject = createAsyncThunk(
  "category/removeUserFromProject",
  async (data) => {
    return await createProjectAPI.removeUserFromProject(data);
  }
);

const projectCategory = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    // Category
    [getAllProjectCategory.fulfilled]: (state, { payload }) => {
      state.allProjectCategory = payload;
    },
    // Create project
    [createProjectAuthorize.fulfilled]: (state, { payload }) => {
      openNotification("success", "Create success.");
    },
    [createProjectAuthorize.rejected]: (state, { error }) => {
      openNotification("error", `${error.message}.Name project exits!`);
    },
    // get all project
    [getAllProject.fulfilled]: (state, { payload }) => {
      state.allProject = payload;
    },
    //  edit project

    [editProject.fulfilled]: (state, { payload }) => {
      openNotification("success", "Update success.");
    },
    // add project
    [addUserProject.fulfilled]: (state, { payload }) => {
      openNotification("success", payload);
    },
    [addUserProject.rejected]: (state, { error }) => {
      openNotification("error", error.message);
    },
    // remove User From Project

    [removeUserFromProject.fulfilled]: (state, { payload }) => {
      openNotification("error", payload);
    },
    [removeUserFromProject.rejected]: (state, { error }) => {
      openNotification("error", error.message);
    },
    // get project search
    [getProjectSearch.fulfilled]: (state, { payload }) => {
      state.allProjectSearch = payload;
    },
  },
});

export default projectCategory.reducer;
