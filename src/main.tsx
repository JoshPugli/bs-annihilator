// @TODO: fix linting so I can remove the React import
// eslint-disable-next-line react/react-in-jsx-scope
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
