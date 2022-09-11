import { Avatar } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { onLogOut } from "~/reducers/login";
import {
  Name,
  Email,
  NameAccount,
  CAccount,
  CPhone,
  Phone,
  Task,
  ButtonOut,
  LogoOut,
  Container,
  Content,
} from "./AccountElement";
const Account = ({ userInfo, theme }) => {
  const dispatch = useDispatch();
  return (
    <>
      <Container>
        <Content>
          <Name>
            <Avatar src={userInfo.avatar} />
          </Name>
          <CAccount>
            <NameAccount>{userInfo.name}</NameAccount>
            <Email>{userInfo.email}</Email>
          </CAccount>
          <CPhone>
            Phone number: <Phone> {userInfo.phoneNumber}</Phone>
          </CPhone>
        </Content>
        <Task
          onClick={() => {
            dispatch(onLogOut());
          }}
        >
          <ButtonOut bg={theme.bg.third}>
            <LogoOut />
          </ButtonOut>
        </Task>
      </Container>
    </>
  );
};

export default Account;
