import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { openNotificationAdminMove } from "~/utils/notificationAdminMove";

import userAPI from "~/Services/userAPI";
import { checkObject } from "~/utils";
const initialState = {
  user: [],
};
export const getListUser = createAsyncThunk(
  "moive/getListUser",
  async ({ tuKhoa, setLoading, setIsSearch }) => {
    try {
      if (setLoading) setLoading(true);
      if (setIsSearch) setIsSearch(true);
      const data = await userAPI.getListUser(tuKhoa);
      if (setLoading) setLoading(false);
      if (setIsSearch) setIsSearch(false);
      return data;
    } catch (error) {
      if (setLoading) setLoading(false);
      if (setIsSearch) setIsSearch(false);
      openNotificationAdminMove("error", error);
    }
  }
);
export const getListAutoComp = createAsyncThunk(
  "user/getListAutoComp",
  async ({ taiKhoan, setDataAutoComp }) => {
    try {
      const data = await userAPI.getListAutoComp(taiKhoan);
      setDataAutoComp(data);
    } catch (error) {
      setDataAutoComp([]);
    }
  }
);
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async ({ taiKhoan, setLoading }, thunkAPI) => {
    try {
      await userAPI.deleteUser(taiKhoan);
      thunkAPI.dispatch(getListUser({ taiKhoan: "", setLoading }));
      openNotificationAdminMove("success", "Xóa thành công !");
    } catch (error) {
      openNotificationAdminMove("error", error);
    }
  }
);
export const getUserDetail = createAsyncThunk(
  "user/getUserDetail",
  async ({ activeId, setLoadingForm }) => {
    setLoadingForm(true);
    const data = await userAPI.getUserDetail(activeId);
    setLoadingForm(false);
    return data;
  }
);
export const getTypeUser = createAsyncThunk(
  "user/getTypeUser",
  async (setTypeUser) => {
    try {
      const data = await userAPI.getTypeUser();
      setTypeUser(data);
    } catch (error) {
      setTypeUser([]);
      openNotificationAdminMove("error", error);
    }
  }
);
export const addUser = createAsyncThunk(
  "user/addUser",
  async ({ userInfo, setLoading }) => {
    try {
      if (setLoading) setLoading(true);
      const data = await userAPI.addUser(userInfo);
      if (setLoading) setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      openNotificationAdminMove("error", error ? error : "Thêm thất bại!");
    }
  }
);
export const updateInfoUser = createAsyncThunk(
  "user/updateInfoUser",
  async ({ userInfo, setReadOnly, setLoading }) => {
    try {
      if (setLoading) setLoading(true);
      const data = await userAPI.updateInfoUser(userInfo);
      if (setLoading) setLoading(false);
      if (setReadOnly) setReadOnly(true);
      return data;
    } catch (error) {
      setLoading(false);
      openNotificationAdminMove("error", error);
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getListUser.fulfilled]: (state, { payload }) => {
      state.user = payload;
    },
    [getUserDetail.fulfilled]: (state, { payload }) => {
      const index = state.user.findIndex(
        (item) => item.taiKhoan === payload.taiKhoan
      );
      if (index > -1) {
        state.user.splice(index, 1, payload);
      }
    },
    [addUser.fulfilled]: (state, { payload }) => {
      if (checkObject(payload)) {
        const newArrayUser = [...state.user];
        newArrayUser.unshift({ ...payload });
        state.user = newArrayUser;
        openNotificationAdminMove("success", "Thêm người dùng thành công !");
      }
    },
    [updateInfoUser.fulfilled]: (state, { payload }) => {
      const index = state.user.findIndex(
        (item) => item.taiKhoan === payload.taiKhoan
      );
      if (index > -1) {
        state.user.splice(index, 1, payload);
      }
      openNotificationAdminMove("success", "Cập nhật thành công !");
    },
  },
});
export default userSlice.reducer;
