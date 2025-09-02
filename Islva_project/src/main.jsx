import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import ISLVA_App from "./ISLVA_App";
import "./css/all.min.css"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <ISLVA_App />
    </HashRouter>
  </StrictMode>
);