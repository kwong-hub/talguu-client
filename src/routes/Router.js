import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Account from "../pages/account/Account";
import { Login } from "../pages/authentication/Login";
import Signup from "../pages/authentication/Signup";
import SignupPrd from "../pages/authentication/SignupPrd";
import SignupViewer from "../pages/authentication/SignupViewer";
import Home from "../pages/home/Home";
import Landing from "../pages/landing/Landing";
import LiveVideos from "../pages/live/LiveVideos";
import NotFound from "../pages/NotFound";
import Deposit from "../pages/payment/Deposit";
import Profile from "../pages/profile/Profile";
import PurchasedPlaylist from "../pages/purchasedPlaylist/PurchasedPlaylist";
import SavedPlayList from "../pages/savedPlaylist/SavedPlayList";
import Settings from "../pages/settings/Settings";
import Stream from "../pages/streamVideo/Stream";
import StreamVideo from "../pages/streamVideo/StreamVideo";
import UploadAnt from "../pages/UploadAnt";
import EditUploadVideos from "../pages/uploadVideo/EditUploadVideos";
import UploadVideo from "../pages/uploadVideo/UploadVideo";
import Videos from "../pages/videos/Videos";
import WatchVideo from "../pages/watchVideo/WatchVideo";
import EditProdVideo from "../pages/yourVideos/EditProdVideo";
import YourVideo from "../pages/yourVideos/YourVideo";
import PrivateRoute from "./privateRoute";
import history from "./history";
import SearchVideo from "../pages/search/SearchVideo";
// import StreamVideo from "../pages/streamVideo/StreamVideo";
const Router = () => {
  return (
    <div>
      {/* <Home /> */}
      <BrowserRouter history={history}>
        <Switch>
          <Route exact path="/" component={Videos} />
          <Route exact path="/search" component={SearchVideo} />
          <Route path="/watch/:vidId" component={WatchVideo} />
          <PrivateRoute path="/live_video" component={LiveVideos} />
          <PrivateRoute path="/purchased_playlist" component={PurchasedPlaylist} />
          <PrivateRoute path="/saved_later" component={SavedPlayList} />
          <PrivateRoute path="/upload_video" component={UploadVideo} />
          <PrivateRoute path="/upload_2" component={UploadAnt} />
          <PrivateRoute path="/stream_video" component={StreamVideo} />
          <PrivateRoute path="/your_video" component={YourVideo} />
          <PrivateRoute path="/edit/:vidId" component={EditProdVideo} />
          <PrivateRoute path="/settings" component={Settings} />
          <PrivateRoute path="/account" component={Profile} />
          <Route exact path="/" component={Home} />
          <Route exact path="/landing" component={Landing} />
          <Route path="/signupprd" component={SignupPrd} />
          <Route path="/signup_viewer" component={SignupViewer} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/finish-upload" component={EditUploadVideos} />
          <Route exact path="/live_stream" component={Stream} />
          <Route exact path="/forgot_password" component={ForgotPassword} />
          <PrivateRoute exact path="/deposit" component={Deposit} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Router;
