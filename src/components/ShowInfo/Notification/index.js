import React from "react";
import img from "~/assets/image";
const ShowNotification = () => {
  return (
    <div className="m-auto p-5">
      <img src={img.notification} alt="notification" />
      <span className="d-block mt-2">No notifications</span>
    </div>
  );
};

export default ShowNotification;
