import { createGlobalStyle } from "styled-components";
export const theme = {
  c: {
    primary: "#63637A",
    secondary: "#CED1D5",
    third: "#B3BAC4",
  },
  bg: {
    primary: "#e9e8ec",
    secondary: "#E8ECF0",
    third: "rgb(124, 67, 250)",
    four: "#00A3BF",
    five: "#D1D5DA",
    six: "#EBECF0",
  },
};

const GlobalStyled = createGlobalStyle`
/* width */
::-webkit-scrollbar {
  width: 0.625rem;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: ${theme.c.primary}; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
    html {
      
      scroll-behavior: smooth;
  overflow: auto;
    }
    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Encode Sans Expanded',sans-serif;
    }
`;
export default GlobalStyled;
