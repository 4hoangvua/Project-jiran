import styled from "styled-components";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { ButtonDefault } from "~/components/Button/ButtonElement";
import { Link } from "react-router-dom";
import { CInput, Input, Logo } from "~/components/Sign/SignElement";
export const CLogin = styled.div`
  max-width: 25rem;
  margin: auto auto;
  box-shadow: rgb(0 0 0 / 10%) 0 0 10px;
  border-radius: 0.625rem;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.c.primary};
`;

export const LoginEmail = styled(CInput)``;
export const LoginPassword = styled(CInput)``;

export const Email = styled(Input)`
  padding: 1rem 0 1rem 1.875rem;
`;
export const Password = styled(Input)`
  padding: 1rem 0 1rem 1.875rem;
`;

export const LogoEmail = styled(AiOutlineMail)`
  ${Logo}
  top: 1.2rem
`;
export const LogoPassword = styled(RiLockPasswordLine)`
  ${Logo}
  top: 1.2rem
`;
export const ButtonLogin = styled(ButtonDefault)`
  height: 2rem;
  width: 50%;
  margin-top: 2.5rem;
  ${({ disabled }) => (disabled ? `pointer-events: none;` : "")}
`;

export const SingUp = styled(Link)`
  font-size: 0.9rem;
  text-decoration: none;
  color: rgb(124, 67, 250);
  font-weight: bold;
`;
