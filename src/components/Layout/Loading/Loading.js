import React from "react";
import { Spin } from "antd";

const Loading = () => {
  return (
    <div
      style={{ width: "100vw", height: "100vh" }}
      className=" d-flex justify-content-center align-items-center"
    >
      <Spin tip="Anshin..." />
    </div>
  );
};

export default Loading;
