import { ThemeProvider } from "styled-components";
import { theme } from "~/GlobalStyles";
import { Container, ContainerSign, NavLogo, Logo } from "./SignLayoutElement";
const SignLayout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <NavLogo to="/">
          <Logo />
        </NavLogo>
        <ContainerSign>{children}</ContainerSign>
      </Container>
    </ThemeProvider>
  );
};

export default SignLayout;
