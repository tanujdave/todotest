import React from "react";
import { render } from "react-dom";

const renderApp = (App: any) => {
  const root = document.getElementById("root");
  render(
    <>
      <App />
    </>,
    root
  );
};

export default renderApp;
