import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "cropperjs/dist/cropper.css";

// Global Design System
import "./styles/variables.css";
import "./styles/theme.css";
import "./styles/components.css";
import "./styles/animations.css";
import "./styles/mobile.css";
import "./styles/fonts.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);