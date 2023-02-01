import styled from "styled-components";
import { HiOutlineUser } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { css } from "styled-components";
export const Container = styled.div`
  width: 100%;
  background-color: #202124;
  border-radius: 4px;
`;
export const ContainerLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
export const CLogin = styled.div`
  min-width: 18.25rem;
  height: auto;
`;
export const Form = styled.form`
  background-color: #fff;
  width: 100%;
  height: 100%;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const CClose = styled(Link)`
  display: block;
  text-decoration: none;
  transform: translateX(6.5rem);
  width: 3.125rem;
  height: 3.125rem;
  text-align: right;
  padding: 5px;
  cursor: pointer;
`;
export const Close = styled(AiOutlineClose)`
  font-size: 2rem;
`;
export const LoginName = styled.div`
  position: relative;
`;
export const LogoLogin = styled(HiOutlineUser)`
  font-size: 1rem;
  position: absolute;
  top: 7px;
  left: 7px;
  opacity: 0.7;
`;
export const LogoPassword = styled(RiLockPasswordLine)`
  font-size: 1rem;
  position: absolute;
  top: 7px;
  left: 7px;
  opacity: 0.7;
`;
const GInput = css`
  height: 2.2rem;
  font-size: medium;
  min-width: 14rem;
  margin-bottom: 1rem;
  border-radius: 0.625rem;
  border: 0px solid;
  background: #e9e8ec;
  caret-color: rgb(0, 200, 0);
  padding-left: 1.875rem;
  &:focus {
    outline: none;
  }
`;
export const Name = styled.input`
  ${GInput}
`;
export const Password = styled.input`
  ${GInput}
`;
export const LoginPassword = styled.div`
  position: relative;
`;
export const Button = styled.button`
  width: 13.125rem;
  display: block;
  border: transparent;
  border-radius: 0.625rem;
  height: 2rem;
  font-size: medium;
  background: rgb(124, 67, 250);
  opacity: 0.8;
  color: #fff;
  transition: 0.3s ease;
  margin-bottom: 1rem;
  &:hover {
    opacity: 1;
  }
`;
export const Titile = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
`;
export const Footer = styled.p`
  font-size: small;
`;
export const SingUp = styled(Link)`
  font-size: small;
  text-decoration: none;
  color: rgb(124, 67, 250);
  font-weight: bold;
`;

export const ErrorSpan = styled.div`
  text-align: center;
  font-size: small;
  color: red;
  height: 2rem;
  width: 13.125rem;
  margin-bottom: 0.625rem;
`;
