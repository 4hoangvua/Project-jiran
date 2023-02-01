import {
  TeamOutlined,
  UserOutlined,
  LoginOutlined,
  FundTwoTone,
} from "@ant-design/icons";
import { Avatar, Button, Card, Layout, Menu, Popover, Space, Tag } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { deleteLogin } from "~/reducers/signin";
import "./template.scss";
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
  getItem("User", "user", <UserOutlined />),
  getItem("Films", "film", <TeamOutlined />),
];

const AdminTemplate = ({ children }) => {
  const accountUser = useSelector((state) => {
    let data = state.user.userLogin;
    return typeof data === "boolean" ? {} : data;
  });
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleTask = (task) => {
    switch (task) {
      case "user":
        navigate("/admin/user");
        break;
      case "film":
        navigate("/");

        break;
      default:
        break;
    }
  };
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
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <FundTwoTone className="fs-2 p-4" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["film"]}
            mode="inline"
            items={items}
            onClick={(e) => {
              handleTask(e.key);
            }}
          />
        </Sider>
        <Layout
          className="site-layout"
          style={{
            marginLeft: collapsed ? 80 : 200,
          }}
        >
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
              position: "fixed",
              width: "100%",
              top: 0,
              zIndex: 99,
            }}
          >
            <Tag
              className="position-absolute top-50 translate-middle"
              style={{ right: collapsed ? 80 : 210 }}
              role="button"
            >
              {Object.keys(accountUser).length > 0 ? (
                <Popover
                  placement="bottomRight"
                  style={{ background: "#202124" }}
                  // content={<a>Close</a>}
                  title={
                    <Card
                      title={
                        <div className="text-center">
                          <Avatar
                            size="large"
                            style={{
                              backgroundColor: "#7265e6",
                              verticalAlign: "middle",
                            }}
                          >
                            {accountUser?.hoTen.substring(0, 5)}
                          </Avatar>
                          <h3 className="h5">{accountUser.hoTen}</h3>
                          <h6 className="h6">{accountUser.email}</h6>
                        </div>
                      }
                      style={{ width: 260, textAlign: "center" }}
                    >
                      <Button onClick={() => dispatch(deleteLogin())}>
                        Sign out
                      </Button>
                    </Card>
                  }
                  trigger="click"
                >
                  <Avatar size="large">
                    {accountUser?.hoTen.substring(0, 5)}
                  </Avatar>
                </Popover>
              ) : (
                <div className="fs-5 d-flex justify-content-center align-items-center p-2">
                  <NavLink to={"/signin"}>Login</NavLink>
                  <LoginOutlined className="ms-2 text-danger" />
                </div>
              )}
            </Tag>
          </Header>
          <Content
            style={{
              marginTop: 64,
            }}
          >
            <div
              className=" h-100 site-layout-background container-admin "
              style={{
                padding: 24,
              }}
            >
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AdminTemplate;
