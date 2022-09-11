import styled from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  height: 100vh;
  width: 100vw;
  position: fixed;
`;
export const ContainerContent = styled.div`
  top: 3.75rem;
  display: flex;
  justify-content: left;
  align-items: left;
  position: absolute;
  height: 100%;
  width: 100%;
`;
export const CSidebar = styled.div`
  width: ${({ IsToggle }) => (IsToggle ? "2%" : "20%")};
  transition: 0.3s ease;
  height: 100%;
  background: ${({ theme }) => theme.bg.five};
  overflow: auto;
  padding-bottom: 3.75rem;
`;
export const Content = styled.div`
  display: flex;
  justify-content: center;
  transition: 0.3s ease;
  width: ${({ IsToggle }) => (IsToggle ? "98%" : "80%")};
  background-image: url(${({ img }) => img});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 100%;
  overflow: auto;
  padding: 1rem 0;
`;
