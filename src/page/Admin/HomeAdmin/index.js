import {
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  LoginOutlined,
  FundTwoTone,
} from "@ant-design/icons";
import { Layout, Menu, Tag } from "antd";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("User", "sub1", <UserOutlined />),
  getItem("Films", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("ShowTimes", "9", <FileOutlined />),
];

const HomeAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <FundTwoTone className="fs-2 p-4" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
              position: "relative",
            }}
          >
            <Tag className="position-absolute top-50 end-0 translate-middle">
              {/* <NavLink to={"/signin"}>Login</NavLink> */}
              <LoginOutlined className="fs-5" />
            </Tag>
          </Header>
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default HomeAdmin;
