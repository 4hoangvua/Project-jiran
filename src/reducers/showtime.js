import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { openNotificationAdminMove } from "~/utils/notificationAdminMove";
import showtimeAPI from "~/Services/showtimeAPI";
const initialState = {
  showTime: [],
};
export const getListTheater = createAsyncThunk(
  "showtime/getListTheater",
  async ({ setLoadingForm, setSystemShowTime }) => {
    if (setLoadingForm) setLoadingForm(true);
    const data = await showtimeAPI.getListTheater();
    if (setLoadingForm) setLoadingForm(false);
    setSystemShowTime(data);
  }
);
export const getListTheaterInfo = createAsyncThunk(
  "showtime/getListTheaterInfo",
  async ({ theater, setListTheaterInfo }) => {
    const data = await showtimeAPI.getListTheaterInfo(theater);
    setListTheaterInfo(data);
  }
);
export const createShowTimeTheater = createAsyncThunk(
  "showtime/createShowTimeTheater",
  async ({ info, setLoading }) => {
    try {
      if (setLoading) setLoading(true);
      await showtimeAPI.createShowTimeTheater(info);
      if (setLoading) setLoading(false);
      openNotificationAdminMove("success", "Tạo lịch chiếu thành công !");
    } catch (error) {
      if (setLoading) setLoading(false);
      openNotificationAdminMove("error", error);
    }
  }
);
const showTimeSlice = createSlice({
  name: "showtime",
  initialState: initialState,
  reducers: {},
  extraReducers: {},
});
export default showTimeSlice.reducer;
