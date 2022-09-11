import styled from "styled-components";
import { HiOutlineUser } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { ButtonDefault } from "~/components/Button/ButtonElement";
import { Link } from "react-router-dom";
import { CInput, Input, Logo } from "~/components/Sign/SignElement";
export const CLogin = styled.div`
  max-width: 30rem;
  margin: auto auto;
  box-shadow: rgb(0 0 0 / 10%) 0 0 10px;
  border-radius: 0.625rem;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.c.primary};
`;

export const LoginName = styled(CInput)``;
export const LoginPassword = styled(CInput)``;
export const LoginEmail = styled(CInput)``;
export const LoginPhoneNumber = styled(CInput)``;

export const Name = styled(Input)`
  padding: 1rem 0 1rem 1.875rem;
`;
export const Password = styled(Input)`
  padding: 1rem 0 1rem 1.875rem;
`;
export const Email = styled(Input)`
  padding: 1rem 0 1rem 1.875rem;
`;
export const PhoneNumber = styled(Input)`
  padding: 1rem 0 1rem 1.875rem;
`;

export const LogoName = styled(HiOutlineUser)`
  ${Logo}
  top:1.2rem;
`;
export const LogoPassword = styled(RiLockPasswordLine)`
  ${Logo}
  top:1.2rem;
`;
export const LogoEmail = styled(AiOutlineMail)`
  ${Logo}
  top:1.2rem;
`;
export const LogoPhoneNumber = styled(AiOutlinePhone)`
  ${Logo}
  top:1.2rem;
`;
export const ButtonLogin = styled(ButtonDefault)`
  height: 2rem;
  width: 50%;
  margin-top: 1rem;
  background: fixed ${({ theme }) => theme.bg.third};

  ${({ disabled }) => (disabled ? `pointer-events: none;` : "")}
`;

export const SingIn = styled(Link)`
  font-size: 0.9rem;
  text-decoration: none;
  color: rgba(124, 67, 250, 0.8);
  transition: 0.3s ease;
  font-weight: bold;
  &:hover {
    color: rgba(124, 67, 250, 1);
  }
`;
