import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { applyMiddleware, createStore, compose } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import {
  watchIncrement,
  watchLogin,
  watchLoginFailure,
} from "./redux/sagas/saga";
import rootReducer from "./redux/_reducers";

let sagaMiddleware = createSagaMiddleware();

/*eslint-disable */
const composeSetup =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
/*eslint-enable */

let store = createStore(
  rootReducer,
  composeSetup(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watchIncrement);
sagaMiddleware.run(watchLogin);

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
