import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// sample parameters
// 9.768591,51.014693,9.783633,51.021956 == 300+ dataset
// 9.667969,51.235052,9.755859,51.289406 == 4000+ dataset
// 9.667752,51.179612,9.755986,51.234676 == 9000+ dataset
// 9.667797,51.179451,9.762211,51.234515 == 10,000+ dataset
