import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";   // ✅ IMPORTANT
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider
 
>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</MantineProvider>
  </React.StrictMode>
);