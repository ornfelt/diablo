import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import reportWebVitals from './reportWebVitals';

const styles = {
  global: (props) => ({
    "body": {
      fontFamily: "body",
      color: props.colorMode === "dark" ? "gray.800" : "whiteAlpha.900",
      bg:  props.colorMode === "dark" ? "black" : "black",
      lineHeight: "base"
    },
    "*::placeholder": {
      color: props.colorMode === "dark" ? "gray.400" : "whiteAlpha.400",
    },
    "*, *::before, &::after": {
      borderColor: props.colorMode === "dark" ? "gray.200" : "whiteAlpha.300",
      wordWrap: "break-word",
    }
  })
}

const theme = extendTheme({ styles })

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={ theme }>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
