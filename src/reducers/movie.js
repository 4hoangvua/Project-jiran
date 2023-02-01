import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieAPI from "~/Services/movieAPI";
import { checkObject } from "~/utils";
import { openNotificationAdminMove } from "~/utils/notificationAdminMove";
const initialState = {
  movie: [],
  detailMove: {},
};

export const getListMovie = createAsyncThunk(
  "moive/getListMovie",
  async ({ tenPhim, setLoading, setIsSearch }) => {
    try {
      if (setLoading) setLoading(true);
      if (setIsSearch) setIsSearch(true);
      const data = await movieAPI.getListMovie(tenPhim);
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
export const deleteMove = createAsyncThunk(
  "moive/deleteMove",
  async ({ maPhim, setLoading }, thunkAPI) => {
    const data = await movieAPI.deleteMove(maPhim);
    thunkAPI.dispatch(getListMovie({ tenPhim: "", setLoading }));
    return data;
  }
);
export const getListAutoComp = createAsyncThunk(
  "moive/getListAutoComp",
  async ({ tenPhim, setDataAutoComp }) => {
    try {
      const data = await movieAPI.getListAutoComp(tenPhim);
      setDataAutoComp(data);
    } catch (error) {
      setDataAutoComp([]);
    }
  }
);
export const addMove = createAsyncThunk(
  "movie/addMovie",
  async ({ formData, setLoading }) => {
    try {
      setLoading(true);
      const data = await movieAPI.addMovie(formData);
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      openNotificationAdminMove("error", error ? error : "Thêm thất bại!");
    }
  }
);
export const getMovieDetail = createAsyncThunk(
  "movie/getMovieDetail",
  async ({ activeId, setLoadingForm }) => {
    try {
      setLoadingForm(true);
      const data = await movieAPI.getMovieDetail(activeId);
      setLoadingForm(false);
      return data;
    } catch (error) {
      openNotificationAdminMove("error", error);
    }
  }
);
export const uploadMovie = createAsyncThunk(
  "movie/uploadMovie",
  async ({ formData, setReadOnly, setLoading }) => {
    try {
      setLoading(true);
      const data = await movieAPI.uploadMovie(formData);
      setReadOnly(true);
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      openNotificationAdminMove("error", error);
    }
  }
);
const movieSlice = createSlice({
  name: "movie",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getListMovie.fulfilled]: (state, { payload }) => {
      state.movie = payload;
    },
    [addMove.fulfilled]: (state, { payload }) => {
      if (checkObject(payload)) {
        const newArrayMovie = state.movie;
        newArrayMovie.unshift({ ...payload });
        state.movie = newArrayMovie;
        openNotificationAdminMove("success", "Tạo phim thành công !");
      }
    },
    [getMovieDetail.fulfilled]: (state, { payload }) => {
      const index = state.movie.findIndex(
        (item) => item.maPhim === payload.maPhim
      );
      if (index > -1) {
        state.movie.splice(index, 1, payload);
      }
    },
    [uploadMovie.fulfilled]: (state, { payload }) => {
      if (payload) {
        const index = state.movie.findIndex(
          (item) => item.maPhim === payload.maPhim
        );
        if (index > -1) {
          state.movie.splice(index, 1, payload);
        }
        openNotificationAdminMove("success", "Cập nhật phim thành công.");
      }
    },
    [deleteMove.fulfilled]: (state, { payload }) => {
      openNotificationAdminMove("success", payload);
    },
    [deleteMove.rejected]: (state, { error }) => {
      openNotificationAdminMove("error", error.message);
    },
  },
});
export default movieSlice.reducer;
