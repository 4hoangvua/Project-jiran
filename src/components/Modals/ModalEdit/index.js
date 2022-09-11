import React, { useState } from "react";
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
  const [isLoading, setLoading] = useState(false);
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
                  setLoading(true);
                  callBackSubmit();
                  setTimeout(() => {
                    setLoading(false);
                  }, 1000);
                }}
                bg={theme.bg.third}
              >
                {isLoading ? "Submit..." : "submit"}
              </ButtonSubmit>
            </Footer>
          </CModalEditProject>
        </Backgournd>
      ) : null}
    </>
  );
};

export default ModalEdit;
