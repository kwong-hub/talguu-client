import React from "react";
import logo from "./assets/images/logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import Router from "./Router";

function App() {
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
