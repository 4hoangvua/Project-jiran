import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import img from "~/assets/image";

import {
  Container,
  ContainerContent,
  CSidebar,
  Content,
} from "./DefaultLayoutElement";
import { ThemeProvider } from "styled-components";
import { theme } from "~/GlobalStyles";
import ModalEdit from "~/components/Modals/ModalEdit";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const { templates } = img;
const DefaulLayout = ({ children }) => {
  const { userInfo } = useSelector((state) => state.log);
  const { bgTemplate } = useSelector((state) => state.bgTemplate);
  const [IsToggle, setIsToggle] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    let timer = setTimeout(() => {
      setIsModalVisible(true);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [isModalVisible]);
  const handleOk = () => {
    navigate("/login");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header theme={theme} />
        <ContainerContent>
          <CSidebar IsToggle={IsToggle}>
            <Sidebar IsToggle={IsToggle} setIsToggle={setIsToggle} />
          </CSidebar>
          <Content IsToggle={IsToggle} img={templates[bgTemplate].bg}>
            {userInfo ? (
              children
            ) : (
              <Modal
                title="You are not logged in."
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <p>Do you want to login?</p>
              </Modal>
            )}
            <ModalEdit />
          </Content>
        </ContainerContent>
      </Container>
    </ThemeProvider>
  );
};

export default DefaulLayout;
