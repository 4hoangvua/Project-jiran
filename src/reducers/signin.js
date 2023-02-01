import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieAPI from "~/Services/movieAPI";
import { openNotificationAdminMove } from "~/utils";
let user = false;
if (localStorage.getItem("user")) {
  user = JSON.parse(localStorage.getItem("user"));
}
const inititalState = {
  userLogin: user,
};

export const userLoginActive = createAsyncThunk(
  "userLogin/userLoginActive",
  async (info) => {
    const data = await movieAPI.accountUser(info);
    return data;
  }
);
export const userRegister = createAsyncThunk(
  "userLogin/userRegister",
  async (info) => {
    await movieAPI.userRegister(info);
  }
);
const userSlice = createSlice({
  name: "userLogin",
  initialState: inititalState,
  reducers: {
    deleteLogin: (state, { payload }) => {
      state.userLogin = false;
      localStorage.removeItem("user");
    },
  },
  extraReducers: {
    [userLoginActive.fulfilled]: (state, { payload }) => {
      if (payload) {
        state.userLogin = payload;
        localStorage.setItem("user", JSON.stringify(payload));
        openNotificationAdminMove("success", "Đăng nhập thành công !");
      }
    },
    [userLoginActive.rejected]: (state, { error }) => {
      openNotificationAdminMove("error", error.message || "Lỗi đăng nhập !");
    },
    [userRegister.fulfilled]: () => {
      openNotificationAdminMove("success", "Đăng ký thành công !");
    },
    [userRegister.rejected]: (state, { error }) => {
      openNotificationAdminMove("error", error.message || "Đăng ký thất bại");
    },
  },
});
export const { deleteLogin } = userSlice.actions;
export default userSlice.reducer;
