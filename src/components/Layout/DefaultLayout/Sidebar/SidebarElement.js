import styled from "styled-components";
import { HiOutlineViewBoards } from "react-icons/hi";
import { MdOutlineTask } from "react-icons/md";
import { AiFillCloseSquare, AiOutlineUserAdd } from "react-icons/ai";

import {
  AiOutlineSetting,
  AiOutlineMenu,
  AiOutlineMacCommand,
} from "react-icons/ai";
import { GrFormAdd, GrUserManager } from "react-icons/gr";
import { css } from "styled-components";
import { Link } from "react-router-dom";
export const ContainerSidebar = styled.div``;
export const SideLogo = styled.span`
  &::after {
    content: "4h Workspace";
  }
`;

export const CSidebar = styled.div`
  width: 100%;
  height: 100%;
`;
export const ListSidebar = styled.div`
  margin-top: 1rem;
`;
const Item = css`
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 14px;
  padding: 0.625rem;
  cursor: pointer;
  text-decoration: none;
  color: unset;
  background: ${({ active }) =>
    active === "true" ? "rgba(0, 0, 0, 0.3)" : "transparent"};
  transition: 0.3s ease;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
    color: unset;
  }
  &:focus {
    background: rgba(0, 0, 0, 0.3);
  }
`;
export const ItemBoard = styled(Link)`
  &::after {
    content: "Boards";
  }
  ${Item}
`;
export const ItemManagement = styled(Link)`
  &::after {
    content: "Management";
  }
  ${Item}
`;
export const ItemCreateProject = styled(Link)`
  &::after {
    content: "Create Project";
  }
  ${Item}
`;
export const ItemCreateTask = styled.div`
  &::after {
    content: "Create Task Project";
  }
  ${Item}
`;
export const ItemUserManagement = styled(Link)`
  &::after {
    content: "User Management";
  }
  ${Item}
`;
export const ItemCreateUser = styled.div`
  &::after {
    content: "Create user";
  }
  ${Item}
`;
export const ItemProject = styled(Link)`
  ${Item}
`;
export const NameProject = styled.span`
  padding: 0 10px;
`;
const Logo = css`
  font-size: 1rem;
  margin-right: 1rem;
`;
export const LogoBoard = styled(HiOutlineViewBoards)`
  ${Logo}
`;
export const LogoUserManagement = styled(GrUserManager)`
  ${Logo}
`;
export const LogoCreateUser = styled(AiOutlineUserAdd)`
  ${Logo}
`;
export const LogoSetting = styled(AiOutlineSetting)`
  ${Logo}
`;
export const LogoManagement = styled(AiOutlineMacCommand)`
  ${Logo}
`;
export const LogoCreateTaskProject = styled(MdOutlineTask)`
  ${Logo}
`;
export const YourBoard = styled.div`
  &::before {
    content: "Your boards";
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.625rem;
`;
export const Board = styled(GrFormAdd)`
  font-size: 1.5rem;
  background: transparent;
  cursor: pointer;
  transition: 0.3s ease;
  &:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`;
export const CLogo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.c.third};
  padding: 1rem;
`;
export const Toggle = styled(AiOutlineMenu)`
  font-size: 1rem;
  cursor: pointer;
`;
export const CCardProject = styled.div`
  overflow-y: auto;
`;
export const CToggle = styled.div`
  display: flex;
  justify-content: center;
  align-items: left;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  cursor: pointer;
  padding: 5px;
  transition: 0.3s ease;
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;
export const LogoCloseProject = styled(AiFillCloseSquare)`
  ${Logo}
  font-size: 25px;
  cursor: pointer;
  position: absolute;
  color: red;
  top: 50%;
  transform: translateY(-50%);
  right: 10%;
`;

export const CAddCard = styled.div`
  position: relative;
`;
