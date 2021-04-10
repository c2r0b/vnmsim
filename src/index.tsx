import React from "react";
import ReactDOM from "react-dom";

import App from "./app/app";
import store from "./store/dispatcher";

ReactDOM.render(
  <App store={ store } />,
  document.getElementById("app")
);
