import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import storage from "./utils/Storage";
import { configureClient } from "./api/client";

import "semantic-ui-css/semantic.min.css";
import "./index.scss";

const accessToken = storage.get("auth");
configureClient({ accessToken });

ReactDOM.render(
  // <React.StrictMode>
  <App isInitiallyLogged={!!accessToken} />,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
