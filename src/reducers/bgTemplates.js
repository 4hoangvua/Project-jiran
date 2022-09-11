import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bgTemplate: 0,
};
const bgTemplate = createSlice({
  name: "bgTemplate",
  initialState: initialState,
  reducers: {
    onChangeBackground: (state, { payload }) => {
      state.bgTemplate = payload;
    },
  },
  extraReducers: {},
});
export const { onChangeBackground } = bgTemplate.actions;
export default bgTemplate.reducer;
