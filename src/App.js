import "./App.css";
import "./styles/color.style.css";

import React, { useEffect } from "react";

import Router from "./routes/Router";

function App() {
  // let history = useHistory();
  // const authorized = useSelector((state) => state.error.authorized);

  // useEffect(() => {
  //   if (history) {
  //     history.push("/login");
  //   }
  // }, authorized);

  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
