import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import { pdfjs } from "react-pdf";
import App from "./App";
// pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
