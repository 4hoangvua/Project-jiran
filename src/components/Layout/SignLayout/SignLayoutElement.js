import styled from "styled-components";
import { SiReactivex } from "react-icons/si";
import img from "~/assets/image";
import { Link } from "react-router-dom";
export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;
export const ContainerSign = styled.div`
  background-image: url(${img.login});
  background-size: contain;
  background-attachment: fixed;
  background-position: center bottom;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  position: absolute;
  padding: 3rem 0;
`;
export const NavLogo = styled(Link)`
  position: absolute;
  z-index: 99;
  cursor: pointer;
  color: ${({ theme }) => theme.c.primary};
  &::after {
    content: "Anshin";
    margin-left: 10px;
  }
  margin: 1rem;
  font-size: 30px;
  opacity: 0.8;
  &:hover {
    color: ${({ theme }) => theme.c.primary};
    opacity: 1;
  }
`;
export const Logo = styled(SiReactivex)`
  font-size: 40px;
`;
