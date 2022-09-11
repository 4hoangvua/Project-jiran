import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
export const CModalAccount = styled.div`
  position: absolute;
  width: 19rem;
  height: auto;
  right: 0;
  top: 0;
  background: #fff;
  border-radius: 5px;
  margin: 4rem 10px 0 0;
`;
export const Backgournd = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;
export const CClose = styled.div`
  width: 100%;
  height: 100%;
`;
export const Title = styled.span`
  text-align: center;
  font-size: 1rem;
  margin: 0.625rem;
  padding-bottom: 0.625rem;

  border-bottom: 1px solid ${({ theme }) => theme.c.third};
  display: block;
`;
export const LogoClose = styled(AiOutlineClose)`
  font-size: 1rem;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
export const Content = styled.div`
  display: flex;
`;
