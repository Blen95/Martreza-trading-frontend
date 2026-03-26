import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";   // ✅ IMPORTANT
import "@mantine/notifications/styles.css"; // ✅ ADD THIS
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { Notifications } from "@mantine/notifications";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider
 
>
  <BrowserRouter>
    <Notifications position="top-right" />
    <App />
  </BrowserRouter>
</MantineProvider>
  </React.StrictMode>
);