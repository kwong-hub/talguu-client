import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Account from "../pages/account/Account";
import Home from "../pages/home/Home";
import Landing from "../pages/landing/Landing";
import Profile from "../pages/profile/Profile";
import SavedPlayList from "../pages/savedPlaylist/SavedPlayList";
import Settings from "../pages/settings/Settings";
// import StreamVideo from "../pages/streamVideo/StreamVideo";
import UploadVideo from "../pages/uploadVideo/UploadVideo";
import Videos from "../pages/videos/Videos";
import { Login } from "../pages/authentication/Login";
import Signup from "../pages/authentication/Signup";
import YourVideo from "../pages/yourVideos/YourVideo";
import PrivateRoute from "./privateRoute";
import SignupPrd from "../pages/authentication/SignupPrd";
import SignupViewer from "../pages/authentication/SignupViewer";
import NotFound from "../pages/NotFound";
import EditUploadVideos from "../pages/uploadVideo/EditUploadVideos";
import StreamVideo from "../pages/streamVideo/StreamVideo";
import Stream from "../pages/streamVideo/Stream";
import PurchasedPlaylist from "../pages/purchasedPlaylist/PurchasedPlaylist";
import WatchVideo from "../pages/watchVideo/WatchVideo";
import LiveVideos from "../pages/live/LiveVideos";
import Deposit from "../pages/payment/Deposit";

const Router = () => {
  return (
    <div>
      {/* <Home /> */}
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Videos} />
          <Route path="/watch/:vidId" component={WatchVideo} />
          <PrivateRoute path="/live_video" component={LiveVideos} />
          <PrivateRoute path="/purchased_playlist" component={PurchasedPlaylist} />
          <PrivateRoute path="/upload_video" component={UploadVideo} />
          <PrivateRoute path="/stream_video" component={StreamVideo} />
          <PrivateRoute path="/your_video" component={YourVideo} />
          <Route path="/settings" component={Settings} />
          <Route path="/account" component={Account} />
          <Route exact path="/" component={Home} />
          <Route exact path="/landing" component={Landing} />
          <Route path="/signupprd" component={SignupPrd} />
          <Route path="/signup_viewer" component={SignupViewer} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/finish-upload" component={EditUploadVideos} />
          <Route exact path="/live_stream" component={Stream} />
          <Route exact path="/deposit" component={Deposit} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Router;
