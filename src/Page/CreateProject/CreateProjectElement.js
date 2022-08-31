import styled from "styled-components";
import { ButtonDefault } from "~/components/Button/ButtonElement";
import { Input } from "~/components/Sign/SignElement";
export const ContainerCreateProject = styled.div`
  padding: 1rem;
  max-width: 43.75rem;
  max-height: auto;
  margin: 1rem auto 3.75rem auto;
  text-align: center;
  color: ${({ theme }) => theme.c.primary};
  background: ${({ theme }) => theme.bg.primary};
  border-radius: 10px;
`;
export const Title = styled.div`
  font-weight: 700;
  font-size: 1.2rem;
`;
export const Form = styled.form`
  text-align: left;
  padding: 1rem;
  font-size: 14px;
  box-sizing: border-box;
  height: 100%;
`;
export const Label = styled.label`
  font-weight: 700;
  padding: 10px 0;
  display: block;
`;
export const InputName = styled(Input)`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.c.secondary};
  font-size: 14px;
`;
export const Select = styled.select`
  padding: 7px 1.875rem 7px 0.625rem;
  border: 1px solid #e8eaed;
  border-radius: 5px;
  background: white;
  box-shadow: 0 1px 3px -2px #9098a9;
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  transition: all 150ms ease;
  &:focus {
    outline: none;
    border-color: #0077ff;
    box-shadow: 0 0 0 2px rgba(#0077ff, 0.2);
  }
`;
export const Option = styled.option``;
export const CButton = styled.div`
  text-align: right;
  display: flex;
  justify-content: right;
  align-items: center;
`;
export const ButtonCreate = styled(ButtonDefault)`
  padding: 5px 2rem;
  margin-top: 1rem;
`;
