import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { MainContextProvider } from "../src/contextAPI/MainContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MainContextProvider>
    <App />
  </MainContextProvider>
);
