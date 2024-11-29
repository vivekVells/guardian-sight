import React from "react";
import ReactDOM from "react-dom/client";
// import "../index.css"; //commented to prevent tailwind styles leaking into the webpage
// but if you want to use tailwind in content app, import the index.css file
import "./content.css";
import ContentApp from "./ContentApp";

const root = document.createElement("div");
root.id = "crx-root";
document.body.appendChild(root);

// @ts-ignore
if (!window.__CONTENT_SCRIPT_INJECTED__) {
  // @ts-ignore
  window.__CONTENT_SCRIPT_INJECTED__ = true;
  console.log("Content script initialized");
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ContentApp />
  </React.StrictMode>
);
