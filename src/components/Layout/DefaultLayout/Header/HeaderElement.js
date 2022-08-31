import styled from "styled-components";
import { SiReactivex } from "react-icons/si";
import { AiOutlineSearch, AiOutlineBell } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Input } from "~/components/Sign/SignElement";
import { ButtonDefault } from "~/components/Button/ButtonElement";
export const Container = styled.div`
  min-height: 3.75rem;
  width: 100%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.bg.secondary};
`;
export const Nav = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: ${({ theme }) => theme.c.primary};
`;
export const NavLogo = styled.div`
  width: 10%;
  padding: 0.625rem;
  position: relative;
  cursor: pointer;
  &::after {
    content: "Anshin";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-left: 0.7rem;
    font-weight: 600;
  }
`;
export const NavName = styled.div`
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const NavList = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
`;
export const Logo = styled(SiReactivex)`
  font-size: 30px;
`;
export const List = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;
export const Item = styled(Link)`
  font-size: 1rem;
  text-decoration: none;
  border-radius: 5px;
  padding: 0.625rem;
  color: unset;
  background: transparent;
  transition: 0.3s ease;
  &:hover {
    color: unset;
    background: rgba(0, 0, 0, 0.3);
  }
`;
export const NavSearch = styled.div`
  position: relative;
`;
export const Search = styled(AiOutlineSearch)`
  font-size: 1rem;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-50%, -50%);
  margin-left: 1rem;
`;

export const InputSearch = styled(Input)`
  height: 32px;
  width: 100%;
  padding: 0px 12px 0px 30px;
  padding: 5px 0 5px 1.87rem;
  font-size: 14px;
  border: 2px solid rgba(0, 0, 0, 0.08);
  line-height: 20px;
  background-color: rgba(0, 0, 0, 0.04);
  color: rgb(23, 43, 77);
  transition: 0.3s ease;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  &:focus {
    border: 2px solid #4c9aff;
    outline: 0;
  }
`;

export const LogoBell = styled(AiOutlineBell)`
  font-size: 1.2rem;
  cursor: pointer;
  margin-right: 0.625rem;
  background: transparent;
  transition: 0.3s ease;
  border-radius: 2px;
  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;
export const Name = styled.span`
  padding: 5px;
  background: ${({ theme }) => theme.c.primary};
  cursor: pointer;
`;

export const COut = styled(ButtonDefault)``;
export const LogOut = styled(Link)``;
