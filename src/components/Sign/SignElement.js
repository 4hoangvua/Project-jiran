import styled from "styled-components";
import { css } from "styled-components";

export const Form = styled.form`
  padding: 1.5625rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Title = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.c.primary};
`;
export const CInput = styled.div`
  height: 2.75rem;
  font-size: 1rem;
  position: relative;
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  width: 100%;
  color: ${({ theme }) => theme.c.primary};

  border-radius: 0.625rem;
  border: 0px solid;
  background: ${({ theme }) => theme.bg.primary};
  caret-color: rgb(0, 200, 0);
  font-size: 1rem;
  &:focus {
    outline: none;
  }
`;
export const Logo = css`
  font-size: 1rem;
  position: absolute;
  top: 1rem;
  left: 7px;
  opacity: 0.7;
`;
export const ErrorSpan = styled.div`
  font-size: x-small;
  color: red;
  width: 13.125rem;
  text-align: left;
  margin: 10px 0;
  transition: 0.3s ease;
`;
export const Footer = styled.p`
  font-size: 1rem;
`;
