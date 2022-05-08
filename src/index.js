import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MoralisProvider } from "react-moralis";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MoralisProvider
      serverUrl="https://vkrb5rb0nhhe.usemoralis.com:2053/server"
      appId="2e2KVVfDYqtMVWJ3Mlc2AoLJI2Kfg9hxoHbTC7Th"
    >
      <App />
    </MoralisProvider>
  </React.StrictMode>
);
