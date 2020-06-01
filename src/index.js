import React from "react";
import { DndProvider } from "react-dnd";
import { TouchBackend } from 'react-dnd-touch-backend';
import HTML5Backend from "react-dnd-html5-backend";
import ReactDOM from "react-dom";
import App from "./App";
import { GridProvider } from "./GridContext";

ReactDOM.render(
  <DndProvider backend={navigator.userAgent.match(/iPhone|Android.+Mobile|iPad/) ? TouchBackend : HTML5Backend}>
    <GridProvider>
      <App />
    </GridProvider>
  </DndProvider>,
  document.getElementById("root")
);
