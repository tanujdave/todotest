import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "./store";
import { GlobalStyle } from "./theme/global";
import { theme } from "./theme/theme";
import { ThemeProvider } from "styled-components";
import Routes from "../routes";

const stores = createStore();

const App = () => (
  <Provider store={stores}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Routes />
      </Router>
    </ThemeProvider>
  </Provider>
);

export default App;
