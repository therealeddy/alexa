import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
  }

  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    -webkit-font-smoothing: antialiased;
    font-size: 16px;
    width: 100%;
    min-height: 100%;
  }

  #root {
    display: block;
    width: 100%;
    min-height: 100%;
  }

  button {
    cursor: pointer;
    outline: none;
  }
`
