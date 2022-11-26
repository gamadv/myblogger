import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ModalContextProvider } from "./context/ModalContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ModalContextProvider>
      <App />
    </ModalContextProvider>
  </React.StrictMode>
);
