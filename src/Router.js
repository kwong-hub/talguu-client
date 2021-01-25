import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/home/Home";
import Landing from "./pages/landing/Landing";

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
        <Route path="/">
            <Home />
            <Landing />
          </Route>
          <Route path="/landing">
            <Landing />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Router;
