import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import Detail from "./pages/Detail";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/detail" component={Detail} />
      </Switch>
    </Router>
  );
};

export default Routes;
