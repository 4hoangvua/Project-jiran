import { Avatar } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { onLogOut } from "~/reducers/login";
import {
  Backgournd,
  CModalAccount,
  Title,
  LogoClose,
  Account,
  Name,
  Email,
  Task,
  LogoOut,
  ButtonOut,
  NameAccount,
  CAccount,
  CPhone,
  Phone,
} from "./ModalAccountElement";
const ModalAccount = ({ showModal, setShowModal, userInfo, theme }) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      {showModal ? (
        <Backgournd onClick={handleClose}>
          <CModalAccount>
            <Title>
              <LogoClose onClick={handleClose} />
            </Title>
            <Account>
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
            </Account>
            <Task
              onClick={() => {
                dispatch(onLogOut());
              }}
            >
              <ButtonOut bg={theme.bg.third}>
                <LogoOut />
              </ButtonOut>
            </Task>
          </CModalAccount>
        </Backgournd>
      ) : null}
    </>
  );
};

export default ModalAccount;
