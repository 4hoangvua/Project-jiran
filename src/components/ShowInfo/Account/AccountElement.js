import styled from "styled-components";
import { ButtonDefault } from "~/components/Button/ButtonElement";
import { AiOutlineLogout } from "react-icons/ai";
export const CAccount = styled.div`
  width: 80%;
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
export const NameAccount = styled.div``;
export const CPhone = styled.div`
  margin-top: 10px;
`;
export const Phone = styled.span`
  opacity: 0.5;
  font-size: 0.8rem;
`;
export const Task = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: 1rem;
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
export const Container = styled.div`
  padding: 10px;
`;
export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid ${({ theme }) => theme.c.third};
  padding-bottom: 16px;
`;
