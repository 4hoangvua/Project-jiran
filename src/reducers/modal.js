import React from "react";
import { createSlice } from "@reduxjs/toolkit";
const inititalState = {
  active: false,
  ComponentContent: <p>default</p>,
  callBackSubmit: (props) => {
    alert("4hoangvua");
  },
  title: "",
  active2: false,
};

const modal = createSlice({
  name: "modal",
  initialState: inititalState,
  reducers: {
    openModal: (state, { payload }) => {
      state.active = true;
      state.ComponentContent = payload.Component;
      state.title = payload.title;
    },
    openModalAccount: (state, { payload }) => {
      state.active2 = true;
      state.ComponentContent = payload.Component;
      state.title = payload.title;
    },
    closeModalAccount: (state) => {
      state.active2 = false;
    },
    closeModal: (state) => {
      state.active = false;
    },
    submitModal: (state, { payload }) => {
      state.callBackSubmit = payload.submitFunction;
    },
  },
});
export const {
  openModal,
  closeModal,
  submitModal,
  openModalAccount,
  closeModalAccount,
} = modal.actions;
export default modal.reducer;
