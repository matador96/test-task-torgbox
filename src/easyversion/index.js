import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore } from "redux";
import "react-clock/dist/Clock.css";
import "bootstrap/dist/css/bootstrap.min.css";

const offsetDate = (state = 0, action) => {
  // if (action.type === 'SETNEWDATE') {

  return [new Date(), new Date()];
};

const clockStore = createStore(offsetDate);

let updateDate = () => {
  clockStore.dispatch({ type: "SETNEWDATE" });
};

ReactDOM.render(
  <React.StrictMode>
    <App clockStore={clockStore} />
  </React.StrictMode>,
  document.getElementById("root")
);

updateDate();

setInterval(() => {
  updateDate();
}, 1000);
