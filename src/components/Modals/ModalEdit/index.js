import React from "react";
import {
  Backgournd,
  CClose,
  CModalEditProject,
  Title,
  LogoClose,
  Content,
  Footer,
  ButtonSubmit,
} from "./ModalEditElement";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "~/reducers/modal";
import { theme } from "~/GlobalStyles";
const ModalEdit = () => {
  const { active, ComponentContent, callBackSubmit, title } = useSelector(
    (state) => state.mod
  );
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeModal());
  };
  const handleEdit = (evt) => {
    evt.stopPropagation();
  };
  return (
    <>
      {active ? (
        <Backgournd onClick={handleClose}>
          <CModalEditProject onClick={handleEdit}>
            <Title>
              {title}
              <LogoClose onClick={handleClose} />
            </Title>
            <Content>{ComponentContent}</Content>
            <Footer>
              <ButtonSubmit
                type="submit"
                onClick={() => {
                  callBackSubmit();
                }}
                bg={theme.bg.third}
              >
                Submit
              </ButtonSubmit>
            </Footer>
          </CModalEditProject>
        </Backgournd>
      ) : null}
    </>
  );
};

export default ModalEdit;
