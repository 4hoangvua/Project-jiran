import React from "react";
import { Avatar, Space, Tooltip, Typography } from "antd";

const { Title } = Typography;
const Header = ({ projectDetail }) => {
  return (
    <Space direction="horizontal" size="large" className="d-flex">
      <Title type="success" level={2}>
        {projectDetail.projectName}
      </Title>
      <Avatar.Group
        size="large"
        maxCount={3}
        maxStyle={{
          color: "#f56a00",
          backgroundColor: "#fde3cf",
        }}
      >
        {projectDetail.members?.map((member, index) => {
          return <Avatar key={index} src={member.avatar} />;
        })}
      </Avatar.Group>
    </Space>
  );
};

export default Header;
