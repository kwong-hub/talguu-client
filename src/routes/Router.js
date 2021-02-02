import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Account from "../pages/account/Account";
import Home from "../pages/home/Home";
import Landing from "../pages/landing/Landing";
import Profile from "../pages/profile/Profile";
import SavedPlayList from "../pages/savedPlaylist/SavedPlayList";
import Settings from "../pages/settings/Settings";
import StreamVideo from "../pages/streamVideo/StreamVideo";
import UploadVideo from "../pages/uploadVideo/UploadVideo";
import WatchVideo from "../pages/watchVideo/WatchVideo";
import { Login } from "../pages/authentication/Login";
import Signup from "../pages/authentication/Signup";
import YourVideo from "../pages/yourVideos/YourVideo";
import PrivateRoute from "./privateRoute";

const Router = () => {
  return (
    <div>
      {/* <Home /> */}
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={WatchVideo}  />
          <PrivateRoute path="/saved_playlist" component={SavedPlayList} />
          <PrivateRoute path="/upload_video" component={UploadVideo} />
          <PrivateRoute path="/stream_video" component={YourVideo} />
          <Route path="/settings" component={Settings} />
          <Route path="/account" component={Account} />
          <Route exact path="/" component={Home} />
          <Route exact path="/landing" component={Landing} />

          <Route exact path="/profile" component={Profile} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Router;
