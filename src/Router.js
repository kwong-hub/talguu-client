import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/home/Home";
import Landing from "./pages/landing/Landing";
import Profile from "./pages/profile/Profile";
import Upload from "./pages/Upload";
import UploadAnt from "./pages/UploadAnt";

const Router = () => {
  return (
    <div>
      <Home/>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/landing" component={Landing} />
          <Route exact path="/upload" component={Upload} />
          <Route exact path="/upload2" component={UploadAnt} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Router;
