import styled from "styled-components";
import { ButtonDefault } from "~/components/Button/ButtonElement";
import { AiOutlineClose, AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";
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

  &::before {
    content: "Account";
  }
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
export const Account = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.c.third};
  flex-wrap: wrap;
`;
export const Name = styled.span`
  width: 20%;
  padding: 5px;
  width: 42px;
  display: block;
  height: 42px;
  background: ${({ theme }) => theme.c.primary};
  cursor: pointer;
  margin-right: 10px;
`;

export const Email = styled.span`
  opacity: 0.5;
  font-size: 0.8rem;
`;
export const Task = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  padding-left: 10px;
`;
export const ButtonOut = styled(ButtonDefault)`
  display: flex;
  justify-content: center;
  align-items: center;
  &::after {
    content: "Log out";
  }
  margin-bottom: 1rem;
`;
export const LogoOut = styled(AiOutlineLogout)`
  font-size: 20px;
  margin-right: 5px;
`;
export const NameAccount = styled.div``;
export const CAccount = styled.div`
  width: 80%;
`;
export const CPhone = styled.div`
  margin-top: 10px;
`;
export const Phone = styled.span`
  opacity: 0.5;
  font-size: 0.8rem;
`;
