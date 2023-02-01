import { notification } from "antd";

export const openNotificationAdminMove = (type, message, description = "") => {
  notification[type]({
    message: message,
    description: description,
    style: {
      position: "relative",
    },
  });
};
