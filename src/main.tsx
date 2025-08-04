import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "../App";
import { BrowserRouter } from "react-router-dom";
import { pdfjs } from "react-pdf";
// import workerSrc from "pdfjs-dist/legacy/build/pdf.worker.min.js?url";
// pdfjs.GlobalWorkerOptions.workerSrc = "workerSrc";
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
// pdfjs.GlobalWorkerOptions.workerSrc = workerSrc ;
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
