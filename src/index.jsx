import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
// import "./theme.css"


const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
    <BrowserRouter basename='spin-plan'>
        <App />
    </BrowserRouter>);
