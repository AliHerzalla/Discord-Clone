import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
// import { cn } from "../@/lib/utils.js";
// import { BrowserRouter } from "react-router-dom";

// // Add a class to the body element
// document.body.classList.add(cn("bg-white "));
// document.body.classList.add(cn("dark:bg-[#313338]"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    <App />
    {/* </BrowserRouter> */}
  </React.StrictMode>
);
