import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import {
  Container,
  ContainerContent,
  CSidebar,
  Content,
} from "./DefaultLayoutElement";
import { ThemeProvider } from "styled-components";
import { theme } from "~/GlobalStyles";
import ModalEdit from "~/components/Modals/ModalEdit";
const DefaulLayout = ({ children }) => {
  const [IsToggle, setIsToggle] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header theme={theme} />
        <ContainerContent>
          <CSidebar IsToggle={IsToggle}>
            <Sidebar IsToggle={IsToggle} setIsToggle={setIsToggle} />
          </CSidebar>
          <Content IsToggle={IsToggle}>
            {children}
            <ModalEdit />
          </Content>
        </ContainerContent>
      </Container>
    </ThemeProvider>
  );
};

export default DefaulLayout;
