import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <GoogleOAuthProvider clientId="479800683315-gbg7c97r3t44krumrg080oco24ihba55.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);