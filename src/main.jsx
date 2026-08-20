import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { BagProvider } from "./lib/bag";
import { LiveProvider } from "./lib/live";
import "./styles/base.css";
import "./styles/components.css";
import "./styles/pages.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <LiveProvider>
        <BagProvider>
          <App />
        </BagProvider>
      </LiveProvider>
    </HashRouter>
  </React.StrictMode>
);
