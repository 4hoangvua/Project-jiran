import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { ButtonDefault } from "~/components/Button/ButtonElement";
export const CModalEditProject = styled.div`
  z-index: 998;
  width: 30rem;
  height: auto;
  top: 4.75rem;
  background: ${({ theme }) => theme.c.primary};
  color: #fff;
  border-radius: 5px;
  position: absolute;
`;
export const Backgournd = styled.div`
  display: flex;
  justify-content: center;
  align-items: left;
  z-index: 999;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.2);
  overflow: auto;
`;

export const Content = styled.div`
  height: auto;
`;
export const Title = styled.span`
  text-align: center;
  padding: 0.625rem 0;
  font-size: 1rem;
  padding-bottom: 5px;
  border-bottom: 1px solid ${({ theme }) => theme.c.secondary};
  width: 100%;
  display: block;
`;
export const LogoClose = styled(AiOutlineClose)`
  font-size: 1rem;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
export const Footer = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  margin-right: 10px;
  padding: 5px;
`;
export const ButtonSubmit = styled(ButtonDefault)`
  padding: 5px;
  font-size: 14px;
  margin-bottom: 1rem;
`;
