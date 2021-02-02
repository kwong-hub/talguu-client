import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reducer from "./redux/reducer";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import watchAll from "./redux/sagas/saga";

let sagaMiddleware = createSagaMiddleware();

let store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchAll);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
