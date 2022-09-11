import { Avatar } from "antd";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ModalAccount from "~/components/Modals/ModalAccount";
import Account from "~/components/ShowInfo/Account";
import ShowNotification from "~/components/ShowInfo/Notification";
import { openModalAccount } from "~/reducers/modal";
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
  const dispatch = useDispatch();
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
              <LogoBell
                onClick={() => {
                  dispatch(
                    openModalAccount({
                      Component: <ShowNotification />,
                      title: "Notifications",
                    })
                  );
                }}
              />
              <Name
                onClick={() => {
                  dispatch(
                    openModalAccount({
                      Component: <Account userInfo={userInfo} theme={theme} />,
                      title: "Account",
                    })
                  );
                }}
              >
                <Avatar src={userInfo.avatar} />
              </Name>
              <ModalAccount />
            </>
          )}
        </NavName>
      </Nav>
    </Container>
  );
};

export default memo(Header);
