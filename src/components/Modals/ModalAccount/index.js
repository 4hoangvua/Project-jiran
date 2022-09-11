import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModalAccount } from "~/reducers/modal";
import {
  Backgournd,
  CModalAccount,
  Title,
  LogoClose,
  Content,
} from "./ModalAccountElement";
const ModalAccount = ({ theme }) => {
  const { active2, ComponentContent, title } = useSelector(
    (state) => state.mod
  );
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeModalAccount());
  };
  return (
    <>
      {active2 ? (
        <Backgournd onClick={handleClose}>
          <CModalAccount>
            <Title>
              {title}
              <LogoClose onClick={handleClose} />
            </Title>
            <Content>{ComponentContent}</Content>
          </CModalAccount>
        </Backgournd>
      ) : null}
    </>
  );
};

export default ModalAccount;
