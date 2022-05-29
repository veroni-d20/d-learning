import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MoralisProvider } from "react-moralis";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MoralisProvider
      serverUrl="https://soe7hzz5ltnf.usemoralis.com:2053/server"
      appId="d7oW7vcYFn02lOoE3zRfztW6TzpCgJVccSV1Vh58"
    >
      <App />
    </MoralisProvider>
  </React.StrictMode>
);
