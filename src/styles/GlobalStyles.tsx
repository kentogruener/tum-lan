import localFont from 'next/font/local';
import { createGlobalStyle } from 'styled-components';

const Pular = localFont({ src: 'Pulsar-Original.otf' });

const GlobalStyle = createGlobalStyle`
  html {
    font-family: ${Pular.style.fontFamily};
  }
  
  #__next {
    width: 100vw;
    height: 100vh;
  }

  *,
  *::after,
  *::before {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    background-color: black;
    color: white
  }
`;

export default GlobalStyle;
