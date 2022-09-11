import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import loginAPI from "~/Services/loginAPI";
import { openNotification } from "~/util/NotificationJiran";

let user = null;
if (localStorage.getItem("userLogin")) {
  user = JSON.parse(localStorage.getItem("userLogin"));
}

const initialState = {
  userInfo: user,
  userSearch: [],
  allUserByProject: [],
  userAll: [],
};

export const loginUser = createAsyncThunk(
  "userLogin/loginUser",
  async (info) => {
    const data = await loginAPI.signIn(info);
    return data;
  }
);
export const registerUser = createAsyncThunk(
  "userLogin/registerUser",
  async (info) => {
    return await loginAPI.signUp(info);
  }
);
export const getUser = createAsyncThunk(
  "userLogin/getUser",
  async (keyWord) => {
    const data = await loginAPI.getUser(keyWord);
    return data;
  }
);
export const getUserSearch = createAsyncThunk(
  "userLogin/getUserSearch",
  async (keyWord) => {
    const data = await loginAPI.getUserSearch(keyWord);
    return data;
  }
);
export const getUserByProjectId = createAsyncThunk(
  "userLogin/getUserByProjectId",
  async (idProject) => {
    const data = await loginAPI.getUserByProjectId(idProject);
    return data;
  }
);
export const editUser = createAsyncThunk(
  "userLogin/editUser",
  async (infoUser, thunkAPI) => {
    const data = await loginAPI.editUser(infoUser);
    await thunkAPI.dispatch(getUser());
    return data;
  }
);
export const deleteUser = createAsyncThunk(
  "userLogin/deleteUser",
  async (idUser, thunkAPI) => {
    const data = await loginAPI.deleteUser(idUser);
    await thunkAPI.dispatch(getUser());
    return data;
  }
);
const loginSlice = createSlice({
  name: "userLogin",
  initialState: initialState,
  reducers: {
    changeUserAll: (state, { payload }) => {
      state.userAll = payload;
    },
    onLogOut: (state, { payload }) => {
      state.userInfo = null;
      localStorage.removeItem("userLogin");
    },
  },
  extraReducers: {
    // Login
    [loginUser.fulfilled]: (state, { payload }) => {
      state.userInfo = payload;
      localStorage.setItem("userLogin", JSON.stringify(payload));
      openNotification("success", "Đăng nhập thành công.");
    },
    [loginUser.rejected]: (state, { error }) => {
      openNotification("error", error.message);
    },
    // Register
    [registerUser.fulfilled]: () => {
      openNotification("success", "Đăng ký thành công.");
    },
    [registerUser.rejected]: (state, { error }) => {
      openNotification("error", error.message);
    },
    // UserSearch

    [getUserSearch.fulfilled]: (state, { payload }) => {
      state.userSearch = payload;
    },
    // User all

    [getUser.fulfilled]: (state, { payload }) => {
      state.userAll = payload;
    },
    // get User By Projectid
    [getUserByProjectId.fulfilled]: (state, { payload }) => {
      state.allUserByProject = payload;
    },
    [getUserByProjectId.rejected]: (state, { error }) => {
      openNotification("error", `${error.message}.Please add member!`);
    },
    // edit user
    [editUser.fulfilled]: (state, { payload }) => {
      openNotification("success", payload);
    },
    [editUser.rejected]: (state, { error }) => {
      openNotification("error", error.message);
    },
    // delete user
    [deleteUser.fulfilled]: (state, { payload }) => {
      openNotification("success", payload);
    },
    [deleteUser.rejected]: (state, { error }) => {
      openNotification("error", error.message);
    },
  },
});
export const { changeUserAll, onLogOut } = loginSlice.actions;
export default loginSlice.reducer;
