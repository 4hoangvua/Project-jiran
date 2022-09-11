import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  .ant-col {
    cursor: pointer;
    border-radius: 10px;
    opacity: 0.8;
    transition: 0.3s ease;
    &:hover {
      opacity: 1;
    }
  }
`;
