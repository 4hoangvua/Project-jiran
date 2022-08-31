import styled from "styled-components";

export const ButtonDefault = styled.button`
  display: block;
  border: transparent;
  border-radius: 0.625rem;
  font-size: 1rem;
  opacity: 0.8;
  background: ${({ bg }) => bg || "transparent"};
  color: #fff;
  cursor: pointer;
  transition: 0.3s ease;
  &:hover {
    opacity: 1;
  }
`;
