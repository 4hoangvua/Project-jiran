import { Avatar } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ModalAccount from "~/components/Modals/ModalAccount";
import {
  Container,
  Nav,
  NavLogo,
  Logo,
  NavList,
  List,
  Item,
  NavSearch,
  InputSearch,
  Search,
  NavName,
  LogoBell,
  Name,
  COut,
  LogOut,
} from "./HeaderElement";
const Header = ({ theme }) => {
  const { userInfo } = useSelector((state) => state.log);
  const [showModal, setShowModal] = useState(false);
  return (
    <Container>
      <Nav>
        <NavLogo>
          <Logo />
        </NavLogo>
        <NavList>
          <List>
            <Item to="/templates">Templates</Item>
            <Item to="/create">Create</Item>
            <Item to="/workspace">Workspace</Item>
          </List>
          <NavSearch>
            <InputSearch placeholder="Search" type="text" />
            <Search />
          </NavSearch>
        </NavList>
        <NavName>
          {userInfo === null ? (
            <COut>
              <LogOut to="/login">Sign In</LogOut>
            </COut>
          ) : (
            <>
              {" "}
              <LogoBell />
              <Name onClick={() => setShowModal(!showModal)}>
                <Avatar src={userInfo.avatar} />
              </Name>
              <ModalAccount
                showModal={showModal}
                setShowModal={setShowModal}
                userInfo={userInfo}
                theme={theme}
              />
            </>
          )}
        </NavName>
      </Nav>
    </Container>
  );
};

export default Header;
