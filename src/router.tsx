import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import ImagePage from "./ImagePage";
// import SettingsPage from "./SettingsPage";

const Router: React.FC<{}> = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/image" component={ImagePage} />
      {/* <Route exact path="/settings" component={SettingsPage} /> */}
    </Switch>
  </BrowserRouter>
);

export default Router;
