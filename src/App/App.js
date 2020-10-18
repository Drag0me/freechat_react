import React from "react";
import { useSelector } from "react-redux";
import { isEmpty, isLoaded } from "react-redux-firebase";
import { Route } from "react-router-dom";
import Home from "../Components/Home/Home";
import Login from "../Components/Login";

function App() {
  const auth = useSelector((state) => state.firebase.auth);
  return (
    <div>
      <Route path="/" exact>
        {isLoaded(auth) && isEmpty(auth) ? <Login /> : <Home />}
      </Route>
      <Route path="/chat/:roomId">
        <Home />
      </Route>
    </div>
  );
}

export default App;

// colors
// #191927 - dark
// #222230 - medium
// #1eaab7 - blue
// #cf8f94 - Face
