import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/";
import User from "./pages/User/";
import Movie from "./pages/Movie/";

export default class Routes extends React.Component {
  render() {
    return (
      <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/user" component={User} />
                <Route exact path="/movie" component={Movie} />
            </Switch>
      </Router>
    );
  }
}